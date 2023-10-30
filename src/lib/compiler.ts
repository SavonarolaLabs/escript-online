import { compile } from "@fleet-sdk/compiler";

export function compileContract(contract: string, network: any, version: string, includeSize: boolean): string {
    // default v1 options
    let options = {};
    if(version == 'v0'){
        options = { version: 0, includeSize: includeSize};
    }
    const tree = compile(contract, options);
    return tree.toAddress(network).toString(network)
}

export function compileToTree(contract: string, network: any, version: string): Uint8Array {
    // default v1 options
    let options = {};
    if(version == 'v0'){
        options = { version: 0, includeSize: true};
    }
    const tree = compile(contract, options);

    return tree._bytes;
}