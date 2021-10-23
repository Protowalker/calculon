import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { selectEditMode } from "../../Store/EditMode";
import { InputData, removeInput, selectInput } from "../../Store/Inputs";
import { TextInput } from "./TextInput";
import { ToggleInput } from "./ToggleInput";
import { useAppSelector } from "../../Store/Hooks";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {NumberInput} from "./NumberInput";

export type BaseInputData = { name: string; displayName: string };

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
            <Icons.Settings />
          </IconButton>
          <IconButton onClick={() => setDeleteConfOpen(true)}>
            <Icons.Delete />
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

function InputFromData({ input }: { input: InputData }): React.ReactElement {
  switch (input.kind) {
    case "text":
      return <TextInput input={input} />;
    case "toggle":
      return <ToggleInput input={input} />;
    case "number":
      return <NumberInput input={input} />;
  }
}
