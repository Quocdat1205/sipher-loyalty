import React, { CSSProperties } from "react";
import { Box, Text } from "@chakra-ui/react";

interface progressBar {
  progress: number;
  height: string;
}

const ProgressBar = ({ progress }: progressBar) => {
  const Parentdiv: CSSProperties = {
    height: "100%",
    width: "100%",
    backgroundColor: "#45465E",
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const Childdiv: CSSProperties = {
    width: `${progress}%`,
    backgroundColor: "#489FF4",
    borderRadius: 40,
    height: "100%",
    position: "absolute",
    left: "0",
  };

  const TextProgress: CSSProperties = {
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <Box style={Parentdiv}>
      <Text>{`${progress}%`}</Text>
      <Box style={Childdiv}></Box>
    </Box>
  );
};

export default ProgressBar;
