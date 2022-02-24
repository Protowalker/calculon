import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = async (args) => {
  return redirect("/calculon/new");
};

export default function Calculon() {
  // TODO
  return <></>;
}
