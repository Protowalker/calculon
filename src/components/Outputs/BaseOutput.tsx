import { Box, IconButton, Paper } from "@mui/material";
import { OutputData, removeOutput } from "Store/Outputs";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectEditMode } from "../../Store/EditMode";
import { useAppSelector } from "../../Store/Hooks";

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
    <Paper
      sx={{
        p: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "right",
      }}
    >
      {editMode ? (
        <Box sx={{ justifyItems: "end", alignItems: "center" }}>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton
            color={deleteConfOpen ? "error" : "default"}
            onClick={() => {
              if (deleteConfOpen) {
                dispatch(removeOutput(output.name));
                setDeleteConfOpen(false);
              } else {
                setDeleteConfOpen(true);
              }
            }}
            onBlur={() => setDeleteConfOpen(false)}
          >
            {deleteConfOpen ? <DeleteOutlineIcon /> : <DeleteIcon />}
          </IconButton>
        </Box>
      ) : null}
      <Box>{children}</Box>
    </Paper>
  );
}
