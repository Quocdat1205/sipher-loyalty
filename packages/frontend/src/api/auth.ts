import { fetcher } from ".";
import { publicAddress, signWallet } from "@type";

// api get nounce
export const getNonce = async ({
  publicAddress,
}: publicAddress): Promise<{ nonce: number; publicAddress: string }> => {
  const { data } = await fetcher.get(
    `/user/get-nonce?publicAddress=${publicAddress}`,
    { withCredentials: true }
  );

  return data;
};

export const signMetaMask = async (sign: signWallet) => {
  const { publicAddress, signature } = sign;

  const { data } = await fetcher.post(
    "/user/sign",
    {
      publicAddress,
      signature,
    },
    { withCredentials: true }
  );

  return data;
};

export const CheckExpireToken = async () => {
  const { data } = await fetcher.get("/user/check-expired", {
    withCredentials: true,
  });

  return data;
};
