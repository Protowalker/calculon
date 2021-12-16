import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, chakra, HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TypographyInput } from "util/CustomComponents";
import { useValidatedValue, Validator } from "util/Hooks";
import { selectEditMode } from "../../Store/EditMode";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import {
  changeInput,
  InputData,
  removeInput,
  selectInputNames,
} from "../../Store/Inputs";

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
    <HStack
      boxShadow="md"
      sx={{
        p: "0.5rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>{props.children}</Box>
      <HStack
        sx={{ justifyItems: "end", alignItems: "center" }}
        display={editMode ? undefined : "none"}
      >
        <IconButton
          variant="outline"
          aria-label="Settings"
          icon={<SettingsIcon />}
        />
        <IconButton
          variant="outline"
          aria-label="Delete"
          onClick={() => {
            if (deleteConfOpen) {
              dispatch(removeInput(props.input.uuid));
              setDeleteConfOpen(false);
            } else {
              setDeleteConfOpen(true);
            }
          }}
          onBlur={() => setDeleteConfOpen(false)}
          icon={<DeleteIcon color={deleteConfOpen ? "red" : "default"} />}
        />
      </HStack>
    </HStack>
  );
}

export function InputNames({ input }: { input: InputData }) {
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();

  return (
    <span style={{ pointerEvents: editMode ? "auto" : "none" }}>
      <TypographyInput
        fontSize="lg"
        fontWeight="bold"
        value={input.displayName}
        onChange={(v) =>
          dispatch(
            changeInput(input.uuid, { displayName: v.currentTarget.value })
          )
        }
        isReadOnly={!editMode}
      />{" "}
      {editMode && <InputVarName input={input} />}
    </span>
  );
}

/// Rules:
//  - Be at least one character
//  - Start with a letter or underscore
//  - Be followed by a series of letters, underscores, or digits
const varNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
function InputVarName({ input }: { input: InputData }) {
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();
  const varNames = useAppSelector(selectInputNames);

  const validator = useCallback<Validator<string>>(
    (val) => {
      const validName = varNameRegex.test(val);
      const alreadyExists = varNames.includes(val);
      if (!validName)
        return [
          false,
          `invalid name "${val}". Must contain only letters, numbers, and underscores, and can not start with a digit.`,
        ];
      if (alreadyExists)
        return [false, `variable with name "${val}" already exists.`];

      return [true];
    },
    [varNames]
  );
  const onValid = useCallback(
    (text: string) => dispatch(changeInput(input.uuid, { name: text })),
    [dispatch, input.uuid]
  );
  const [rawText, updateText, validText, error] = useValidatedValue(
    validator,
    input.name,
    onValid
  );

  const textValid = rawText === validText;

  return (
    <Tooltip isDisabled={textValid} label={error}>
      <chakra.span fontStyle="italic">
        {"("}

        <TypographyInput
          value={rawText}
          onChange={(v) => updateText(v.currentTarget.value)}
          isReadOnly={!editMode}
          isInvalid={!textValid}
          textDecor={textValid ? undefined : "underline wavy"}
          textDecorationColor="red.300"
          fontStyle="italic"
        />

        {")"}
      </chakra.span>
    </Tooltip>
  );
}
