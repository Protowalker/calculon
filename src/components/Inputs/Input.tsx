import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

import { selectEditMode } from "../../Store/EditMode";
import { InputData, removeInput, selectInput } from "../../Store/Inputs";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";
import NumberInput from "./NumberInput";
import { useAppSelector } from "../../Store/Hooks";
import { useDispatch } from "react-redux";
import { useState } from "react";

export type BaseInputData = {
  name: string;
  displayName: string;
  order: number;
};

export function BaseInput(props: {
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
          <IconButton onClick={() => setDeleteConfOpen(true)}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={deleteConfOpen}
            onClose={() => setDeleteConfOpen(false)}
          >
            <DialogTitle>Delete {props.input.name} </DialogTitle>
            <DialogContent> Are you sure? </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(removeInput(props.input.name))}>
                Delete
              </Button>
              <Button onClick={() => setDeleteConfOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : null}
    </Paper>
  );
}

export function InputFromName({ name }: { name: string }) {
  const input = useAppSelector((state) => selectInput(state, name));

  return input ? <InputFromData input={input} /> : <p>INVALID</p>;
}

export function InputFromData({
  input,
}: {
  input: InputData;
}): React.ReactElement {
  switch (input.kind) {
    case "text":
      return <TextInput input={input} />;
    case "toggle":
      return <ToggleInput input={input} />;
    case "number":
      return <NumberInput input={input} />;
  }
}
