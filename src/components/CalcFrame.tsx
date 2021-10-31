import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { MotionBox, MotionVStack } from "util/CustomComponents";
import { selectEditMode } from "../Store/EditMode";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import { addInput, InputData } from "../Store/Inputs";
import { addOutput, OutputData } from "../Store/Outputs";
import { typedObjectKeys } from "../util/TypeUtils";
import { CalcInput } from "./CalcInput";
import { CalcOutput } from "./CalcOutput";
import { InputComponentMap, InputDataMap } from "./Inputs/InputMap";
import { OutputComponentMap, OutputDataMap } from "./Outputs/OutputMap";

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

const boxVariants = {
  hidden: {
    width: "0rem",
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  },
  visible: {
    width: "6rem",
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  },
};

const stackVariants = {
  hidden: (start: string) => ({
    transform: `translateX(${start})`,
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  }),
  visible: {
    transform: "translateX(0rem)",
    transition: {
      type: "tween",
      ease: "easeOut",
    },
  },
};
function LeftEditBar() {
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();
  const requestAddInput = useCallback(
    (input: InputData["kind"]) => {
      dispatch(addInput(InputDataMap[input]));
    },
    [dispatch]
  );

  return (
    <MotionBox
      height="100%"
      initial="hidden"
      animate={editMode ? "visible" : "hidden"}
      variants={boxVariants}
    >
      <MotionVStack
        height="100%"
        justify="stretch"
        alignItems="stretch"
        width="6rem"
        boxShadow="lg"
        custom="-6rem"
        variants={stackVariants}
      >
        {typedObjectKeys(InputComponentMap).map((input) => (
          <Button
            variant="solid"
            key={input}
            onClick={() => requestAddInput(input)}
            wordBreak="break-word"
            whiteSpace="normal"
          >
            <Text fontSize="sm">Add {input}</Text>
          </Button>
        ))}
      </MotionVStack>
    </MotionBox>
  );
}

function RightEditBar() {
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();
  const requestAddOutput = useCallback(
    (output: OutputData["kind"]) => {
      dispatch(addOutput(OutputDataMap[output]));
    },
    [dispatch]
  );
  return (
    <MotionBox
      height="100%"
      initial="hidden"
      animate={editMode ? "visible" : "hidden"}
      variants={boxVariants}
    >
      <MotionVStack
        boxShadow="lg"
        alignItems="stretch"
        justify="stretch"
        width="6rem"
        height="100%"
        custom="0rem"
        variants={stackVariants}
      >
        {typedObjectKeys(OutputComponentMap).map((output) => (
          <Button
            variant="solid"
            mx={0.4}
            my={0.2}
            key={output}
            onClick={() => requestAddOutput(output)}
          >
            <Text fontSize="sm">Add {output}</Text>
          </Button>
        ))}
      </MotionVStack>
    </MotionBox>
  );
}
