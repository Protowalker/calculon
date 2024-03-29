import {
  Button,
  ButtonProps,
  Grid,
  GridItem,
  Heading,
  Text,
  useClipboard,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import _ from "lodash";
import { Form, useFetcher, useParams } from "remix";
import { useSessionInfo } from "~/sessions";
import { changeName, selectCalcName } from "~/Store/CalculatorInfo";
import { selectEditMode, toggleEditMode } from "~/Store/EditMode";
import { useAppDispatch, useAppSelector } from "~/Store/Hooks";
import { selectAllInputs } from "~/Store/Inputs";
import { selectOutputs } from "~/Store/Outputs";
import { TypographyInput } from "~/util/CustomComponents";
import HamburgerMenu from "./HamburgerMenu";

const MotionButton = motion<ButtonProps>(Button);

export default function AppBar() {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);

  const inputs = useAppSelector((state) => _.values(selectAllInputs(state)));
  const outputs = useAppSelector((state) => _.values(selectOutputs(state)));

  const slug = useParams().calcId!;
  const username = useParams().username!;
  const calcName = useAppSelector(selectCalcName);
  const theme = useTheme();

  const sessionInfo = useSessionInfo();

  const ownsThis = sessionInfo.username && sessionInfo.username === username;

  const clipboardToast = useToast();

  const calcFetcher = useFetcher();

  return (
    <Grid
      height="100%"
      boxShadow="md"
      templateColumns="repeat(20, 1fr)"
      alignItems="center"
      justifyContent="center"
      padding="0.5em"
    >
      <GridItem>
        <HamburgerMenu>asd</HamburgerMenu>
      </GridItem>
      <GridItem>
        <TypographyInput
          overflow="hidden"
          fontSize="3xl"
          fontWeight="bold"
          value={calcName}
          isReadOnly={!editMode}
          onChange={(t) => dispatch(changeName(t.currentTarget.value))}
        />
      </GridItem>

      {ownsThis ? (
        <>
          <GridItem colStart={-4} alignSelf="center">
            <MotionButton
              bgColor="green.800"
              color="white"
              width="100%"
              onClick={() =>
                calcFetcher.submit(
                  {
                    slug: slug,
                    inputs: JSON.stringify(inputs),
                    outputs: JSON.stringify(outputs),
                    displayName: calcName,
                    authorUsername: username,
                  },
                  {
                    method: "post",
                    action: "/calculon/save",
                    encType: "multipart/form-data",
                  }
                )
              }
            >
              Save
            </MotionButton>
          </GridItem>
          <GridItem colStart={-2} colSpan={1} alignSelf="center" mr={1}>
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
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
}
