import { Heading, Stack } from "@chakra-ui/react";
import { useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { changeInput } from "~/Store/Inputs";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import { moveOutput, OutputData, selectOutputs } from "../Store/Outputs";
import { OutputFromData } from "./Outputs/Output";

export function CalcOutput() {
  const outputs = useAppSelector((state) =>
    Object.values(selectOutputs(state))
  );

  return (
    <Stack spacing={1} maxWidth="50rem">
      <Heading
        size="md"
        textAlign="center"
        color="gray.500"
        textTransform="uppercase"
      >
        Outputs
      </Heading>
      <CalcOutputWithDnDContext outputs={outputs} />
    </Stack>
  );
}

function CalcOutputWithDnDContext({ outputs }: { outputs: OutputData[] }) {
  const dispatch = useAppDispatch();

  const dragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      moveOutput({
        previousIndex: result.source.index,
        newIndex: result.destination.index,
      })
    );
  }, []);

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="outputs">
        {(provided) => (
          <Stack
            spacing={1}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {outputs
              .sort((a, b) => a.order - b.order)
              .map((output) => (
                <OutputFromData output={output} key={output.uuid} />
              ))}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
