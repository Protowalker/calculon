import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TypographyInput } from "util/CustomComponents";
import { selectEditMode } from "../../Store/EditMode";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { changeInput, InputData, removeInput } from "../../Store/Inputs";

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
      {editMode ? (
        <Box sx={{ justifyItems: "end", alignItems: "center" }}>
          <IconButton
            variant="ghost"
            aria-label="Settings"
            icon={<SettingsIcon />}
          />
          <IconButton
            variant="ghost"
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
        </Box>
      ) : null}
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
        value={input.displayName}
        onChange={(v) =>
          dispatch(
            changeInput(input.uuid, { displayName: v.currentTarget.value })
          )
        }
        isReadOnly={!editMode}
      />{" "}
      {editMode && (
        <span>
          {"("}

          <TypographyInput
            fontSize="subtitle1"
            value={input.name}
            onChange={(v) =>
              dispatch(changeInput(input.uuid, { name: v.currentTarget.value }))
            }
            isReadOnly={!editMode}
          />

          {")"}
        </span>
      )}
    </span>
  );
}
