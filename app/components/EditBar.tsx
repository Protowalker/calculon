import { Button, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { selectEditMode } from "~/Store/EditMode";
import { useAppDispatch, useAppSelector } from "~/Store/Hooks";
import { addInput, InputData } from "~/Store/Inputs";
import { addOutput, OutputData } from "~/Store/Outputs";
import { MotionBox, MotionVStack } from "~/util/CustomComponents";
import { typedObjectKeys } from "~/util/TypeUtils";
import { InputComponentMap, InputDataMap } from "./Inputs/InputMap";
import { OutputComponentMap, OutputDataMap } from "./Outputs/OutputMap";

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

function EditBar(props: { children: React.ReactNode; widthOffset: number }) {
  const editMode = useAppSelector(selectEditMode);

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
        custom={`${props.widthOffset}rem`}
        variants={stackVariants}
      >
        {props.children}
      </MotionVStack>
    </MotionBox>
  );
}

export function LeftEditBar() {
  const dispatch = useAppDispatch();
  const requestAddInput = useCallback(
    (input: InputData["kind"]) => {
      dispatch(addInput(InputDataMap[input]));
    },
    [dispatch]
  );
  return (
    <EditBar widthOffset={-6}>
      {typedObjectKeys(InputComponentMap).map((input) => (
        <Button
          variant="solid"
          mx={0.4}
          my={0.2}
          key={input}
          onClick={() => requestAddInput(input)}
        >
          <Text fontSize="sm">Add {input}</Text>
        </Button>
      ))}
    </EditBar>
  );
}

export function RightEditBar() {
  const dispatch = useAppDispatch();
  const requestAddOutput = useCallback(
    (output: OutputData["kind"]) => {
      dispatch(addOutput(OutputDataMap[output]));
    },
    [dispatch]
  );
  return (
    <EditBar widthOffset={0}>
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
    </EditBar>
  );
}
