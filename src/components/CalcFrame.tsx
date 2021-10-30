import {
  Box,
  Button,
  Center,
  Flex,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { selectEditMode, toggleEditMode } from "../Store/EditMode";
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
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
        height: "100vh",
      }}
    >
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
    </Box>
  );
}

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
    <VStack
      alignItems="stretch"
      width="max-content"
      maxWidth="6rem"
      boxShadow="lg"
      minWidth="4rem"
      height={editMode ? "100%" : "4rem"}
    >
      <Center>
        <Switch
          sx={{ mt: "1.5rem", maxWidth: "min-content" }}
          isChecked={editMode}
          onChange={() => dispatch(toggleEditMode())}
        />
      </Center>
      {editMode &&
        typedObjectKeys(InputComponentMap).map((input) => (
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
    </VStack>
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
    <VStack
      boxShadow="lg"
      display={editMode ? "flex" : "none"}
      alignItems="stretch"
      width="min-content"
      height="100%"
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
    </VStack>
  );
}
