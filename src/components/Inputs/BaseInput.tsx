import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TypographyInput } from "util/MuiComponents";
import { selectEditMode } from "../../Store/EditMode";
import { useAppSelector } from "../../Store/Hooks";
import { InputData, removeInput } from "../../Store/Inputs";

export type BaseInputData = {
  name: string;
  displayName: string;
  order: number;
};

export default function BaseInput(props: {
  children: React.ReactNode;
  input: InputData;
}) {
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
      }}
    >
      <Box>{props.children}</Box>
      {editMode ? (
        <Box sx={{ justifyItems: "end", alignItems: "center" }}>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton
            color={deleteConfOpen ? "error" : "default"}
            onClick={() => {
              if (deleteConfOpen) {
                dispatch(removeInput(props.input.name));
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
    </Paper>
  );
}

export function InputNames({ input }: { input: InputData }) {
  const editMode = useAppSelector(selectEditMode);

  return (
    <span style={{ pointerEvents: editMode ? "auto" : "none" }}>
      <TypographyInput
        variant="h6"
        value={input.displayName}
        readOnly={!editMode}
      />{" "}
      {editMode && (
        <span>
          {"("}

          <TypographyInput
            variant="subtitle1"
            value={input.name}
            readOnly={!editMode}
          />

          {")"}
        </span>
      )}
    </span>
  );
}
