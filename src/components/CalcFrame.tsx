import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid/Grid";
import Switch from "@mui/material/Switch";
import { selectEditMode, toggleEditMode } from "../Store/EditMode";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import { CalcInput } from "./CalcInput";
import { CalcOutput } from "./CalcOutput";

export function CalcFrame() {
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Grid container m="10px" justifyContent="space-between">
          <CalcInput />
          <CalcOutput />
        </Grid>
      </Box>

      <FormControlLabel
        control={
          <Switch value={editMode} onClick={() => dispatch(toggleEditMode())} />
        }
        label="Edit Mode"
      />
    </>
  );
}
