import { OutputData, removeOutput } from "~/Store/Outputs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectEditMode } from "../../Store/EditMode";
import { useAppSelector } from "../../Store/Hooks";
import { Box, CSSObject, HStack, IconButton } from "@chakra-ui/react";
import { DeleteIcon, DragHandleIcon, SettingsIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";

export default function BaseOutput({
  output,
  children,
  sx,
}: {
  output: OutputData;
  children: React.ReactNode;
  sx?: CSSObject;
}): React.ReactElement {
  const editMode = useAppSelector(selectEditMode);

  const dispatch = useDispatch();

  const [deleteConfOpen, setDeleteConfOpen] = useState(false);
  return (
    <Draggable draggableId={output.uuid} index={output.order}>
      {(provided) => (
        <HStack
          boxShadow="md"
          sx={{
            p: "0.5rem",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "right",
          }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box
            {...provided.dragHandleProps}
            display={editMode ? "auto" : "none"}
          >
            <DragHandleIcon />
          </Box>
          <HStack display={editMode ? "initial" : "none"}>
            <IconButton
              aria-label="Delete"
              color={deleteConfOpen ? "red" : "default"}
              variant="outline"
              onClick={() => {
                if (deleteConfOpen) {
                  dispatch(removeOutput(output.uuid));
                  setDeleteConfOpen(false);
                } else {
                  setDeleteConfOpen(true);
                }
              }}
              onBlur={() => setDeleteConfOpen(false)}
              icon={<DeleteIcon />}
            />
            <IconButton
              aria-label="Settings"
              variant="outline"
              icon={<SettingsIcon />}
            />
          </HStack>
          <Box sx={{ ml: "auto", width: "100%", ...sx }}>
            {children}
          </Box>
        </HStack>
      )}
    </Draggable>
  );
}
