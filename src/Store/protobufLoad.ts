import protobuf from "protobufjs";
import { typedHasKey } from "util/TypeUtils";
import { InputData } from "./Inputs";
import { OutputData } from "./Outputs";

export const protocol = protobuf.load("/protocol/main.proto");

type Kinds<T extends InputData | OutputData> = T extends {
  kind: infer K;
  value: infer V;
}
  ? K extends string
    ? Record<K, V>
    : never
  : never;

export function inputToMessage<T extends InputData>(
  input: T
): Omit<T, "kind" | "value"> & Kinds<T> {
  const message = {
    ...input,
    ...({ [input.kind]: input.value } as Kinds<T>),
  };

  return message;
}

export function outputToMessage<T extends OutputData>(
  output: T
): Omit<T, "kind" | "value"> & Kinds<T> {
  const message = {
    ...output,
    ...({ [output.kind]: output.value } as Kinds<T>),
  };

  return message;
}

export async function encodeStore(inputs: InputData[], outputs: OutputData[]) {
  const calculator = (await protocol).lookupType("Calculator");
  const input = (await protocol).lookupType("Input");
  const output = (await protocol).lookupType("Output");
  const vals = {
    inputs: inputs.map(inputToMessage).map(v => input.fromObject(v)),
    outputs: outputs.map(outputToMessage).map(v => output.fromObject(v))
  };
  
  const decoder = new TextDecoder('utf8');
  return btoa(decoder.decode(calculator.encode(vals).finish()));
}

