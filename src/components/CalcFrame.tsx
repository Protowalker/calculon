import { Box, Flex } from "@chakra-ui/react";
import { CalcInput } from "./CalcInput";
import { CalcOutput } from "./CalcOutput";
import { LeftEditBar, RightEditBar } from "./EditBar";

export function CalcFrame() {
  return (
    <Flex align="stretch" justify="stretch" h="100%" overflow="hidden">
      <LeftEditBar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Flex
          width="100%"
          m="10px"
          justifyContent="space-between"
          alignItems="start"
        >
          <CalcInput />
          <CalcOutput />
        </Flex>
      </Box>
      <RightEditBar />
    </Flex>
  );
}
