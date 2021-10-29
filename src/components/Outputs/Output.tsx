import * as math from "mathjs";
import { OutputData } from "Store/Outputs";
import { OutputComponentMap } from "./OutputMap";

const expressionRegex = /\{\{(.+?)\}\}/g;

export function parseExpressionString(expr: string) {
  const text = expr.split(expressionRegex);
  let compiledExpr: Array<string | math.EvalFunction>;
  try {
    compiledExpr = text.map((v, i) =>
      i % 2 === 0 ? v : math.parse(v).compile()
    );
  } catch (e) {
    return {
      evaluate: (scope: Record<string, unknown>) => (e as Error).message,
    };
  }
  return {
    evaluate: (scope: Record<string, unknown>) => {
      try {
        return compiledExpr
          .map((v, i) => (typeof v === "object" ? v.evaluate(scope) : v))
          .join(" ");
      } catch (e) {
        return (e as Error).message;
      }
    },
  };
}

export function OutputFromData({ output }: { output: OutputData }) {
  return OutputComponentMap[output.kind]({ output: output as never });
}
