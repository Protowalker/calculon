import { Button, Paper, Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Grid from "@mui/material/Grid/Grid";
import Switch from "@mui/material/Switch";
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

const Center = (props: BoxProps) => (
  <Box {...props} sx={{ ...props.sx, mx: "auto" }} />
);

const Square = (props: BoxProps) => (
  <Center {...props} sx={{ ...props.sx, aspectRatio: "1" }} />
);

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
        <Grid
          container
          m="10px"
          justifyContent="space-between"
          alignItems="start"
        >
          <CalcInput />
          <CalcOutput />
        </Grid>
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
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "min-content",
        height: editMode ? "100%" : "4rem",
      }}
    >
      <Center>
        <Switch
          sx={{ mt: "0.75rem" }}
          value={editMode}
          onClick={() => dispatch(toggleEditMode())}
        />
      </Center>
      {editMode &&
        typedObjectKeys(InputComponentMap).map((input) => (
          <Button
            sx={{ px: 1, mx: 0.4, my: 0.2, aspectRatio: "1.25" }}
            variant="contained"
            key={input}
            onClick={() => requestAddInput(input)}
          >
            Add {input}
          </Button>
        ))}
    </Paper>
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
    <Paper
      sx={{
        display: editMode ? "flex" : "none",
        flexDirection: "column",
        alignItems: "stretch",
        width: "min-content",
        height: "100%",
      }}
    >
      {typedObjectKeys(OutputComponentMap).map((output) => (
        <Button
          sx={{ px: 1, mx: 0.4, my: 0.2, aspectRatio: "1.25" }}
          variant="contained"
          key={output}
          onClick={() => requestAddOutput(output)}
        >
          Add {output}
        </Button>
      ))}
    </Paper>
  );
}
