import React, { useEffect, useMemo, useState } from "react";
import { injected } from "@provider";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { getNonce, signMetaMask, CheckExpireToken } from "@api";
import { MetaMaskContext } from "@hooks";

let web3: Web3 | undefined = undefined;
type Props = {
  children: React.ReactNode;
};

export const MetaMaskProvider = ({ children }: Props) => {
  const { account, library, activate, deactivate, error } = useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const connect = async () => {
    // Check if MetaMask is installed
    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask extension first!");
      return;
    }

    // auto enable metamask
    if (!web3) {
      try {
        await (window as any).ethereum.enable();
        web3 = new Web3((window as any).ethereum);
      } catch (err) {
        window.alert("You need to allow MetaMask!");
        return;
      }
    }

    if (!error) {
      // connect api to BE
      const coinbase = await web3.eth.getCoinbase();
      if (!coinbase) {
        window.alert("Please activate MetaMask first.");
        return;
      }

      const address = coinbase.toLowerCase();

      try {
        // sign up or sigin user
        const { nonce, publicAddress } = await getNonce({
          publicAddress: address,
        });

        // get sinature
        const signature = await web3!.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`,
          publicAddress,
          "" // MetaMask will ignore the password argument here
        );

        const accessToken = await signMetaMask({ publicAddress, signature });
        localStorage.setItem("accessToken", accessToken);
        setIsActive(true);
      } catch (error) {
        alert("You need to allow Metamask to continute!");
        setIsActive(false);
      }

      // console.log(error?.message);
    } else {
      alert("Nerwork support Etherium Mainnet, please switch to network!");
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (error) {
      console.log(`Error on disconnect: ${error}`);
    }
  };

  // init loading
  useEffect(() => {
    // check expire token and cookie session
    const CheckeExpire = async () => {
      if (!error) {
        try {
          const check = await CheckExpireToken();

          // enable wallet
          await activate(injected);

          if (!check) {
            connect();
          } else {
            setIsActive(true);
          }
        } catch (error) {
          alert("Something went wrong, please try again!");
        }
      } else {
        alert("Nerwork support Etherium Mainnet, please switch to network!");
        setIsActive(false);
      }
    };

    CheckeExpire();
  }, [error]);

  const value = useMemo(
    () => ({
      isActive,
      account,
      loading,
      connect,
      disconnect,
      library,
    }),
    [isActive, loading]
  );

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
};
