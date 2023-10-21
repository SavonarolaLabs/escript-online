import { compile } from "@fleet-sdk/compiler";

export function compileContract(contract: string, network: any): string {
    const tree = compile(contract);
    console.log(tree)
    return tree.toAddress(network).toString()
}