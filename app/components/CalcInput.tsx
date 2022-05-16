import { Heading, Stack } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { selectOutputs } from "../Store/Outputs";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import {
  changeInput,
  InputData,
  moveInput,
  selectAllInputs,
} from "../Store/Inputs";
import { InputFromData } from "./Inputs/Input";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

export function CalcInput() {
  const inputs = useAppSelector((state) =>
    Object.values(selectAllInputs(state))
      .slice()
      .sort((a, b) => a.order - b.order)
  );

  return (
    <Stack spacing={1}>
      <Heading
        size="md"
        textAlign="center"
        color="gray.500"
        textTransform="uppercase"
      >
        Inputs
      </Heading>
      <CalcInputWithDnDContext inputs={inputs} />
    </Stack>
  );
}

function CalcInputWithDnDContext({ inputs }: { inputs: InputData[] }) {
  const dispatch = useAppDispatch();

  const dragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      moveInput({
        previousIndex: result.source.index,
        newIndex: result.destination.index,
      })
    );
  }, []);

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="inputs">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={1}
          >
            {inputs
              .sort((a, b) => a.order - b.order)
              .map((input) => (
                <InputFromData input={input} key={input.uuid} />
              ))}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
