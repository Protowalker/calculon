import { OutputData, removeOutput } from "Store/Outputs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectEditMode } from "../../Store/EditMode";
import { useAppSelector } from "../../Store/Hooks";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons";

export default function BaseOutput({
  output,
  children,
}: {
  output: OutputData;
  children: React.ReactNode;
}): React.ReactElement {
  const editMode = useAppSelector(selectEditMode);

  const dispatch = useDispatch();

  const [deleteConfOpen, setDeleteConfOpen] = useState(false);
  return (
    <HStack
      boxShadow="md"
      sx={{
        p: "0.5rem",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "right",
      }}
    >
      {editMode ? (
        <Box sx={{ justifyContent: "end", alignItems: "center" }}>
          <IconButton aria-label="Settings" icon={<SettingsIcon />} />
          <IconButton
            aria-label="Delete"
            color={deleteConfOpen ? "error" : "default"}
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
        </Box>
      ) : null}
      <Box sx={{ ml: "auto" }}>{children}</Box>
    </HStack>
  );
}
