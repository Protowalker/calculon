import { OutputData } from "Store/Outputs";
import TextOutput, { TextOutputData } from "./TextOutput";

export const OutputComponentMap: {
  [K in OutputData as K["kind"]]: (props: { output: K }) => React.ReactElement;
} = {
  text: TextOutput,
};

export const OutputDataMap: {
  [K in OutputData as K["kind"]]: K;
} = {
  text: TextOutputData,
};
