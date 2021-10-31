import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, chakra, HStack, IconButton } from "@chakra-ui/react";
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
      {editMode && (
        <chakra.span fontStyle="italic">
          {"("}

          <TypographyInput
            value={input.name}
            onChange={(v) =>
              dispatch(changeInput(input.uuid, { name: v.currentTarget.value }))
            }
            isReadOnly={!editMode}
            fontStyle="italic"
          />

          {")"}
        </chakra.span>
      )}
    </span>
  );
}
