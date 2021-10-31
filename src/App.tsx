import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import AppBar from "AppBar";
import React from "react";
import "./App.css";
import { CalcFrame } from "./components/CalcFrame";

function App() {
  return (
    <ChakraProvider>
      <Grid autoRows="1fr" height="100vh">
        <GridItem rowSpan={2}>
          <AppBar />
        </GridItem>
        <GridItem rowSpan={28}>
          <CalcFrame />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
