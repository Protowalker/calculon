import { useAppSelector } from "../../Store/Hooks";
import { InputData, selectInput } from "../../Store/Inputs";
import { InputComponentMap } from "./InputMap";

export function InputFromName({ name }: { name: string }) {
  const input = useAppSelector((state) => selectInput(state, name));

  return input ? <InputFromData input={input} /> : <p>INVALID</p>;
}

export function InputFromData({
  input,
}: {
  input: InputData;
}): React.ReactElement {
  // super disgusting, but the index narrows the type of the function.
  return InputComponentMap[input.kind]({ input: input as never });
}
