
import { LoaderFunction, redirect, useLoaderData } from "remix";
import { CalcFrame } from "~/components/CalcFrame";


export const loader: LoaderFunction = async (args) => {
    return redirect("/calculon/new");
};

export default function Calculon() {
    return <></>;
    return <CalcFrame />;
}