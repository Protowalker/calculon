import {
  Button,
  ButtonProps,
  Grid,
  GridItem,
  useClipboard,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import _ from "lodash";
import { selectEditMode, toggleEditMode } from "Store/EditMode";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { selectInputs } from "Store/Inputs";
import { selectOutputs } from "Store/Outputs";
import { encodeStore } from "Store/protobufLoad";
import { waitFor } from "util/StuffThatShouldBeBuiltIn";

const MotionButton = motion<ButtonProps>(Button);

export default function AppBar() {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);

  const inputs = useAppSelector((state) => _.values(selectInputs(state)));
  const outputs = useAppSelector((state) => _.values(selectOutputs(state)));

  const theme = useTheme();

  const clipboardToast = useToast();

  return (
    <Grid
      height="100%"
      boxShadow="md"
      templateColumns="repeat(20, 1fr)"
      align="center"
      justify="center"
    >
      <GridItem colStart={18} alignSelf="center">
        <MotionButton
          bgColor="green.700"
          color="white"
          width="100%"
          onClick={() =>
            encodeStore(inputs, outputs).then(async (val) => {
              const wasOpenAlready = clipboardToast.isActive(
                "shareClipboardToast"
              );
              clipboardToast.close("shareClipboardToast");
              await navigator.clipboard.writeText(`${window.location.href}${val}`);
              if (wasOpenAlready) await waitFor(200);
              clipboardToast({
                duration: 3000,
                id: "shareClipboardToast",
                description: "Link copied to clipboard",
              });
            })
          }
        >
          SHARE
        </MotionButton>
      </GridItem>
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
