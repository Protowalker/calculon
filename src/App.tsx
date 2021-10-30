import React from "react";
import "./App.css";
import { CalcFrame } from "./components/CalcFrame";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <CalcFrame />
    </ChakraProvider>
  );
}

export default App;
