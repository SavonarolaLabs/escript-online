<script lang="ts">
    import Avatars from "$lib/Avatars.svelte";
    import { codeDummy } from "$lib/codeDummy";
    import type monaco from "monaco-editor";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import { onMount } from "svelte";
    import * as Y from "yjs";
    import { WebrtcProvider } from "y-webrtc";
    import { MonacoBinding } from "y-monaco";
    import { compileContract, compileToTree } from "$lib/compiler";
    import * as pako from "pako";

    import * as srust from "ergo-lib-wasm-browser";
    import { Network } from "@fleet-sdk/core";

    // html widget
    import hljs from 'highlight.js/lib/core';
    import scala from 'highlight.js/lib/languages/scala';
    hljs.registerLanguage('scala', scala);
    // html widget

    import {
    Address,
    BlockHeaders,
    BoxId,
    BoxValue,
    Contract,
    DataInputs,
    DerivationPath,
    ErgoBoxCandidate,
    ErgoBoxCandidateBuilder,
    ErgoBoxCandidates,
    ErgoBoxes,
    ErgoStateContext,
    ExtSecretKey,
    I64,
    Mnemonic,
    NetworkAddress,
    NetworkPrefix,
    PreHeader,
    SecretKey,
    SecretKeys,
    TxBuilder,
    UnsignedInput, 
    UnsignedInputs, 
    UnsignedTransaction,
    Wallet,
    ErgoTree
} from "ergo-lib-wasm-browser";
    import Switch from "$lib/Switch.svelte";
    import { selected_tab } from "$lib/store";

    let editorContainer: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco: typeof monaco;

    let selectedNetwork = Network.Mainnet;
    let selectedVersion = 'v1';
    let selectedIncludeSize = false;
    let contractAddress = "";
    let compileErrorMessage = "";

    let lobbyLink = "";

    let flexMode = false;

    function onCompileClick() {
        const contract = editor.getValue();
        try {
            contractAddress = compileContract(contract, selectedNetwork, selectedVersion, selectedIncludeSize);
            compileErrorMessage = "";
        } catch (e) {
            contractAddress = "";
            compileErrorMessage = e.message;
        }
    }

    onMount(async () => {
        window.srust = srust;
        window.Address = Address;
        window.ErgoTree = ErgoTree;

        const urlParams = new URLSearchParams(window.location.search);
        const lobbyId = urlParams.get("l");

        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                return new editorWorker();
            },
        };

        Monaco = await import("monaco-editor");
        editor = Monaco.editor.create(editorContainer, {
            value: `{
  proveDlog(CONTEXT.preHeader.minerPk)
}`,
            language: "scala",
            minimap: { enabled: false },
            theme: "vs-dark",
            fontSize: 16,
            automaticLayout: true,
            //lineNumbers: 'off',
        });

        editor.getModel().onDidChangeContent((event) => {
            if($selected_tab != 'code'){
                return;
            }
            const val = editor.getValue();
            const deflated = pako.deflate(val);

            let binaryString = "";
            deflated.forEach((byte) => {
                binaryString += String.fromCharCode(byte);
            });

            window.history.replaceState(null, "", "?s=" +encodeURIComponent(btoa(binaryString)));
        });

        if (lobbyId) {
            createLobyWithId(lobbyId);
        }

        if (!lobbyId) {
            const str = urlParams.get("s");

            if(str){
                const decoded = atob(decodeURIComponent(str));
                const uint8Array = new Uint8Array(decoded.length);
                for (let i = 0; i < decoded.length; i++) {
                    uint8Array[i] = decoded.charCodeAt(i);
                }
                
                const inflated = pako.inflate(uint8Array);

                let binaryString = "";
                inflated.forEach((byte) => {
                    binaryString += String.fromCharCode(byte);
                });

                editor.setValue(binaryString);
            }
        }
    });

    let copyContractConfirmation = false;

    function clickContractCopy() {
        if (!copyContractConfirmation) {
            copyContractConfirmation = true;
            setTimeout(() => {
                copyContractConfirmation = false;
            }, 3000);
        }
        navigator.clipboard.writeText(contractAddress);
    }

    let copyLobbyConfirmation = false;

    function clickLobbyCopy() {
        if (!copyLobbyConfirmation) {
            copyLobbyConfirmation = true;
            setTimeout(() => {
                copyLobbyConfirmation = false;
            }, 3000);
        }
        navigator.clipboard.writeText(lobbyLink);
    }

    function createLobyWithId(lobbyId: string, keepCode = false) {
        const codeVal = editor.getValue();

        lobbyLink = window.location.origin + "?l=" + lobbyId;
        const ydoc = new Y.Doc();
        const provider = new WebrtcProvider(lobbyId, ydoc);
        const ycontent = ydoc.getText("monaco");

        new MonacoBinding(
            ycontent,
            editor.getModel(),
            new Set([editor]),
            provider.awareness
        );

        if (keepCode) {
            editor.setValue(codeVal);
        }
        clickLobbyCopy();
    }

    const genRanHex = (size) =>
        [...Array(size)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("");
    function createLobby() {
        const lobbyId = genRanHex(16);
        createLobyWithId(lobbyId, true);
    }

    function copyErgoScriptAsHtml(){
        const codeString = hljs.highlight('scala', editor.getValue()).value.replaceAll("{","&#123;").replaceAll("}","&#125;");
        navigator.clipboard.writeText(`
<style>
.hljs {
  color: #ddd;
}

.hljs-tag,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-strong,
.hljs-name {
  color: #f92672;
}

.hljs-code {
  color: #66d9ef;
}

.hljs-attribute,
.hljs-symbol,
.hljs-regexp,
.hljs-link {
  color: #bf79db;
}

.hljs-string,
.hljs-bullet,
.hljs-subst,
.hljs-title,
.hljs-section,
.hljs-emphasis,
.hljs-type,
.hljs-built_in,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #a6e22e;
}

.hljs-title.class_,
.hljs-class .hljs-title {
  color: white;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #75715e;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-doctag,
.hljs-title,
.hljs-section,
.hljs-type,
.hljs-selector-id {
  font-weight: bold;
}

.ios-buttons {
    display: flex;
    gap: 5px;
    padding: 0.7em;
    padding-left: 1em;
}

.ios-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
}

.ios-button.close {
    background-color: #ff3b30;
}

.ios-button.minimize {
    background-color: #ffcc00;
}

.ios-button.maximize {
    background-color: #4cd964;
}

.fake-window-header {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    position: sticky;
    top: 0;
    background-color: #1e1e1e;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: gray;
    font-family: monospace;
}

.editor-flex {
    background: #1e1e1e;
    position: relative;
    height: 300px;
    width: 600px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: scroll;
    resize: both;
    -webkit-box-shadow: 0px 0px 81px 5px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 0px 81px 5px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 0px 81px 5px rgba(0, 0, 0, 0.7);
}
.source-code{
    margin-left:16px;
}
</style>


<div class="editor-flex">
    <div class="fake-window-header">
                <div class="ios-buttons">
                    <div class="ios-button close" />
                    <div class="ios-button minimize" />
                    <div class="ios-button maximize" />
                </div>
                <div style="padding-right:8px;">ergoscript</div>
            </div>
            <div class="source-code">
                <pre><code class="hljs">${codeString}</code></pre>
            </div>   
    </div>
    `);
    }

    function createBookmark() {
        if (window.sidebar && window.sidebar.addPanel) {
            // Firefox
            window.sidebar.addPanel(document.title, window.location.href, "");
        } else if (window.external && "AddFavorite" in window.external) {
            // IE
            window.external.AddFavorite(window.location.href, document.title);
        } else if (window.opera && window.print) {
            // Opera
            var elem = document.createElement("a");
            elem.setAttribute("href", window.location.href);
            elem.setAttribute("title", "ErgoScript");
            elem.setAttribute("rel", "sidebar");
            elem.click();
        } else {
            alert(
                "Your browser doesn't support adding bookmarks automatically. Please use Ctrl+D (Cmd+D on macOS) to add a bookmark manually."
            );
        }
    }

    function toggleFlex() {
        if (flexMode) {
            flexMode = false;
            editor.updateOptions({ lineNumbers: "on" });
        } else {
            flexMode = true;
            editor.updateOptions({ lineNumbers: "off" });
        }
    }

    let codeBackup = ""

    selected_tab.subscribe(tab =>{
        if(tab == 'code'){
            if(codeBackup != ''){
                editor.setValue(codeBackup);
                editor.updateOptions({ readOnly: false })
            }
        }
        if(tab == 'tree'){
            editor.updateOptions({ readOnly: true })
            codeBackup = editor.getValue();
            let showString = '';
            try {
                const treeBytes = compileToTree(codeBackup, selectedNetwork, selectedVersion);
                showString = ErgoTree.from_bytes(treeBytes).pretty_print();
            } catch (e) {
                showString = e.message;
            }
            editor.setValue(showString);
        }
    })
</script>
<div class="h-vh">
    <div class="navbar flex justify-between items-center">
        <div class="flex items-center">
            <img src="logo.png" alt="" class="ml-4" style="width:30px;">
            <div class=" text-2xl font-bold p-4 pl-2">ErgoScript</div>
                <Switch></Switch>
        </div>
        <a class="ml-8 relative inline-block" href="/blockly">
            <span class="font-bold">Blockly</span>
            <span class="absolute top-0 right-0 -mt-2 -mr-11 px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full">beta</span>
          </a>
          

        <div class="flex gap-4 items-center pr-2">
            {#if lobbyLink}
                <div class="flex">
                    <input
                        class="w-full input-monospace"
                        type="text"
                        readonly={true}
                        value={lobbyLink?.split("=")[1]}
                    />
                    <button on:click={clickLobbyCopy}>
                        <div
                            class="h-full copy-btn flex items-center justify-center px-4"
                        >
                            <clipboard-copy value={lobbyLink}>
                                {#if !copyLobbyConfirmation}
                                    <svg
                                        aria-hidden="true"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        width="16"
                                        data-view-component="true"
                                        class="octicon"
                                    >
                                        <path
                                            d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"
                                        /><path
                                            d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"
                                        />
                                    </svg>
                                {:else}
                                    <svg
                                        aria-hidden="true"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        width="16"
                                        data-view-component="true"
                                        class=""
                                    >
                                        <path
                                            fill="lightgreen"
                                            d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
                                        />
                                    </svg>
                                {/if}
                            </clipboard-copy>
                        </div>
                    </button>
                </div>
            {:else}
                <button
                    on:click={createLobby}
                    class="flex items-center gap-2 gray-border p-1 px-3 rounded-md hidden"
                    >create lobby
                    <svg
                        width="24"
                        height="24"
                        fill="#bdbdbd"
                        version="1.0"
                        viewBox="0 0 24 24"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        ><g
                            ><g
                                ><path
                                    d="M16.5,14c-1.5,0-2.7,0.4-3.6,0.9c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z"
                                /></g
                            ><g><circle cx="16.5" cy="8.5" r="3.5" /></g></g
                        ><g
                            ><path
                                d="M4,8.5C4,6.6,5.6,5,7.5,5S11,6.6,11,8.5c0,1.9-1.6,3.5-3.5,3.5S4,10.4,4,8.5z M7.5,14C2.6,14,1,18,1,18v2h13v-2   C14,18,12.4,14,7.5,14z"
                            /></g
                        ></svg
                    >
                </button>
            {/if}

            <!-- <Avatars /> -->
            <button
                on:click={copyErgoScriptAsHtml}
                class="flex items-center px-2 py-1 gray-border"
                style="border-style:dashed;"
            >
                copy as html
                <svg 
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM13.4881 6.44591C13.8882 6.55311 14.1256 6.96437 14.0184 7.36447L11.4302 17.0237C11.323 17.4238 10.9117 17.6613 10.5116 17.5541C10.1115 17.4468 9.8741 17.0356 9.98131 16.6355L12.5695 6.97624C12.6767 6.57614 13.088 6.3387 13.4881 6.44591ZM14.9697 8.46967C15.2626 8.17678 15.7374 8.17678 16.0303 8.46967L16.2387 8.67801C16.874 9.3133 17.4038 9.84308 17.7678 10.3202C18.1521 10.8238 18.4216 11.3559 18.4216 12C18.4216 12.6441 18.1521 13.1762 17.7678 13.6798C17.4038 14.1569 16.874 14.6867 16.2387 15.322L16.0303 15.5303C15.7374 15.8232 15.2626 15.8232 14.9697 15.5303C14.6768 15.2374 14.6768 14.7626 14.9697 14.4697L15.1412 14.2981C15.8229 13.6164 16.2797 13.1574 16.5753 12.7699C16.8577 12.3998 16.9216 12.1843 16.9216 12C16.9216 11.8157 16.8577 11.6002 16.5753 11.2301C16.2797 10.8426 15.8229 10.3836 15.1412 9.70191L14.9697 9.53033C14.6768 9.23744 14.6768 8.76257 14.9697 8.46967ZM7.96986 8.46967C8.26275 8.17678 8.73762 8.17678 9.03052 8.46967C9.32341 8.76257 9.32341 9.23744 9.03052 9.53033L8.85894 9.70191C8.17729 10.3836 7.72052 10.8426 7.42488 11.2301C7.14245 11.6002 7.07861 11.8157 7.07861 12C7.07861 12.1843 7.14245 12.3998 7.42488 12.7699C7.72052 13.1574 8.17729 13.6164 8.85894 14.2981L9.03052 14.4697C9.32341 14.7626 9.32341 15.2374 9.03052 15.5303C8.73762 15.8232 8.26275 15.8232 7.96986 15.5303L7.76151 15.322C7.12617 14.6867 6.59638 14.1569 6.23235 13.6798C5.84811 13.1762 5.57861 12.6441 5.57861 12C5.57861 11.3559 5.84811 10.8238 6.23235 10.3202C6.59638 9.84308 7.12617 9.31331 7.76151 8.67801L7.96986 8.46967Z" 
                    fill="#bdbdbd"
                    />
                    </svg>
            </button>

            <button
                on:click={toggleFlex}
                class="flex items-center px-2 py-1 gray-border"
                style="border-style:dashed;"
            >
                flex
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-2"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z"
                        fill="#bdbdbd"
                    />
                </svg>
            </button>

            <button
                on:click={createBookmark}
                class="flex items-center rounded-full px-3 py-1 gray-border"
            >
                save code as bookmark
                <svg
                    class="ml-2 octicon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 1792 1792"
                    ><path
                        d="M1420 128q23 0 44 9 33 13 52.5 41t19.5 62v1289q0 34-19.5 62t-52.5 41q-19 8-44 8-48 0-83-32l-441-424-441 424q-36 33-83 33-23 0-44-9-33-13-52.5-41t-19.5-62V240q0-34 19.5-62t52.5-41q21-9 44-9h1048z"
                    /></svg
                >
            </button>
        </div>
    </div>
    <div
        class="h-vh w-full flex flex-col justify-center items-center"
        class:flex-bg={flexMode}
    >
        <div
            class:editor-flex={flexMode}
            class:fake-window-header={flexMode}
            class:shadow-2xl={flexMode}
            class:w-full={!flexMode}
        >
            {#if flexMode}
                <div>
                    <div class="ios-buttons">
                        <div class="ios-button close" />
                        <div class="ios-button minimize" />
                        <div class="ios-button maximize" />
                    </div>
                </div>
            {/if}
            <div
                bind:this={editorContainer}
                class="w-full"
                class:h-full={flexMode}
                class:h-vh={!flexMode}
            />
        </div>
    </div>
    <div
        class="footer w-full flex flex-col justify-end rounded-md"
        style={compileErrorMessage ? "height: 40vh;" : ""}
    >
        {#if compileErrorMessage}
            <div class="grow p-3 pt-2 text-red-400 overflow-y-scroll">
                {compileErrorMessage}
            </div>
        {/if}

        {#if !flexMode}
            <div class="w-full flex items-center p-2 gap-4">
                <a
                    class="ml-2"
                    href="https://github.com/SavonarolaLabs/escript-online"
                >
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 98 96"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            fill="#bdbdbd"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        /></svg
                    >
                </a>
                <div class="grow">
                    <!-- <input class="code-bar" bind:value={contractAddress}/> -->
                    <div class="flex">
                        <input
                            class="w-full input-monospace"
                            type="text"
                            readonly={true}
                            value={contractAddress}
                        />
                        <button on:click={clickContractCopy}>
                            <div
                                class="h-full copy-btn flex items-center justify-center px-4"
                            >
                                <clipboard-copy value={contractAddress}>
                                    {#if !copyContractConfirmation}
                                        <svg
                                            aria-hidden="true"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            version="1.1"
                                            width="16"
                                            data-view-component="true"
                                            class="octicon"
                                        >
                                            <path
                                                d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"
                                            /><path
                                                d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"
                                            />
                                        </svg>
                                    {:else}
                                        <svg
                                            aria-hidden="true"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            version="1.1"
                                            width="16"
                                            data-view-component="true"
                                            class=""
                                        >
                                            <path
                                                fill="lightgreen"
                                                d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
                                            />
                                        </svg>
                                    {/if}
                                </clipboard-copy>
                            </div>
                        </button>
                    </div>
                </div>
                <select
                    bind:value={selectedVersion}
                    name="network"
                    id="network"
                    class=" bg-black flex items-center gap-2 m-2 px-3 py-2 custom-select"
                    style="  -webkit-appearance: none !important;
-moz-appearance: none !important;"
                >
                    <option value={'v1'}>v1</option>
                    <option value={'v0'}>v0</option>
                </select>
                {#if selectedVersion == 'v0'}
                <select
                    bind:value={selectedIncludeSize}
                    name="includeSize"
                    id="includeSize"
                    class=" bg-black flex items-center gap-2 m-2 px-3 py-2 custom-select"
                    style="  -webkit-appearance: none !important;
-moz-appearance: none !important;"
                >
                    <option value={false}>includeSize: false &nbsp;&nbsp;</option>
                    <option value={true}>includeSize: true &nbsp;&nbsp;</option>
                </select>
                {/if}
                <select
                    bind:value={selectedNetwork}
                    name="network"
                    id="network"
                    class=" bg-black flex items-center gap-2 m-2 px-3 py-2 custom-select"
                    style="  -webkit-appearance: none !important;
-moz-appearance: none !important;"
                >
                    <option value={Network.Mainnet}>Mainnet</option>
                    <option value={Network.Testnet}>Testnet</option>
                </select>
                <button
                    on:click={onCompileClick}
                    class="btn flex items-center gap-2 m-2 px-3 py-2"
                >
                    compile
                    <img src="command_line.png" class="w-4" alt="" />
                </button>
            </div>
        {/if}
    </div>
</div>


<style>
	svg.octicon > path {
		fill: #bdbdbd;
	}

	.copy-btn {
		border: 1px solid rgb(185, 185, 185);
		border-left: none;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}
	input {
		background: rgba(0, 0, 0, 0.436);
		border: 1px solid rgb(185, 185, 185);
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
		padding-left: 8px;
		padding-top: 5px;
		padding-bottom: 5px;
		color: #bdbdbd;
	}
	.input-monospace {
		font-family:
			ui-monospace,
			SFMono-Regular,
			SF Mono,
			Menlo,
			Consolas,
			Liberation Mono,
			monospace;
	}
	select:focus,
	input:focus {
		outline: none;
	}
	select {
		background: url("data:image/svg+xml;utf8, <svg width='16' height='16' viewBox='0 0 330 330' xmlns='http://www.w3.org/2000/svg'><g><path fill='%23bdbdbd' d='m325.61 229.39-150-150c-2.812-2.813-6.628-4.393-10.606-4.393-3.979 0-7.794 1.581-10.607 4.394l-150 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.39 139.4 139.39c2.929 2.929 6.768 4.393 10.607 4.393s7.678-1.464 10.607-4.394c5.857-5.858 5.857-15.355-1e-3 -21.213z'/></g></svg>")
			no-repeat;
		background-position: 85% 50%;
		padding-right: 44px;
		padding-left: 18px;
		background-color: #1e1e1e;
		align-items: center;
		appearance: button;
		border-radius: 8px;
		border-style: none;
		box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
		border: 1px solid rgb(185, 185, 185);
		box-sizing: border-box;
		color: #bdbdbd;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		font-family: "RM Neue", sans-serif;
		font-size: 100%;
		line-height: 1.15;
		margin: 0;
		text-align: center;
		text-transform: none;
		transition:
			color 0.13s ease-in-out,
			background 0.13s ease-in-out,
			opacity 0.13s ease-in-out,
			box-shadow 0.13s ease-in-out;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}


	.h-vh {
		height: 100vh;
	}
	.navbar {
		background-color: #1e1e1e;
		border-bottom: 1px solid #fff3;
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #1e1e1e;
		border-top: 1px solid #fff3;
	}
</style>