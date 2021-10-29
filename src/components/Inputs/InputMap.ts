import { InputData } from "../../Store/Inputs";
import NumberInput, { NumberInputData } from "./NumberInput";
import TextInput, { TextInputData } from "./TextInput";
import ToggleInput, { ToggleInputData } from "./ToggleInput";

export const InputComponentMap: {
  [K in InputData as K["kind"]]: (props: { input: K }) => React.ReactElement;
} = {
  number: NumberInput,
  text: TextInput,
  toggle: ToggleInput,
};

export const InputDataMap: {
  [K in InputData as K["kind"]]: K;
} = {
  number: NumberInputData,
  text: TextInputData,
  toggle: ToggleInputData,
};
