import {
  Button,
  ButtonProps,
  Grid,
  GridItem,
  useTheme,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { selectEditMode, toggleEditMode } from "Store/EditMode";
import { useAppDispatch, useAppSelector } from "Store/Hooks";

const MotionButton = motion<ButtonProps>(Button);

export default function AppBar() {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);
  const theme = useTheme();

  return (
    <Grid
      height="100%"
      boxShadow="md"
      templateColumns="repeat(20, 1fr)"
      align="center"
      justify="center"
    >
      <GridItem colStart={20} colSpan={1} alignSelf="center" mr={1}>
        <MotionButton
          width="100%"
          animate={{
            backgroundColor: editMode
              ? theme.colors.red[500]
              : theme.colors.blue[500],
            color: "white",
            transition: {
              duration: 0.05,
              delay: 0,
              type: "tween",
              ease: "linear",
            },
          }}
          onClick={() => dispatch(toggleEditMode())}
        >
          {editMode ? "CONFIRM" : "EDIT"}
        </MotionButton>
      </GridItem>
    </Grid>
  );
}
