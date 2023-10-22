<script lang="ts">
    import Avatars from "$lib/Avatars.svelte";
    import { codeDummy } from "$lib/codeDummy";
    import type monaco from "monaco-editor";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import { onMount } from "svelte";
    import * as Y from "yjs";
    import { WebrtcProvider } from "y-webrtc";
    import { MonacoBinding } from "y-monaco";
    import { compileContract } from "$lib/compiler";

    import { Network } from "@fleet-sdk/core";

    import queryString from "query-string";

    let editorContainer: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let Monaco: typeof monaco;

    let collabId = "duck";

    let selectedNetwork = Network.Mainnet;
    let contractAddress = "";
    let compileErrorMessage = "";

    let flexMode = false;

    function onCompileClick() {
        const contract = editor.getValue();
        try {
            contractAddress = compileContract(contract, selectedNetwork);
            compileErrorMessage = "";
        } catch (e) {
            contractAddress = "";
            compileErrorMessage = e.message;
        }
    }

    onMount(async () => {
        //const ydoc = new Y.Doc();
        //const provider = new WebrtcProvider(collabId, ydoc);
        //const ycontent = ydoc.getText("monaco");

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
            editor.getValue();
            const encoded = btoa(editor.getValue());
            window.history.replaceState(null, "", "?s=" + encoded);
        });

        //new MonacoBinding(
        //    ycontent,
        //    editor.getModel(),
        //    new Set([editor]),
        //    provider.awareness
        //);

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("s");
        if (code) {
            editor.setValue(atob(code));
        }
    });

    let copyConfirmation = false;

    function clickCopy() {
        if (!copyConfirmation) {
            copyConfirmation = true;
            setTimeout(() => {
                copyConfirmation = false;
            }, 3000);
        }
        navigator.clipboard.writeText(contractAddress);
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

    function toggleFlex(){
        if(flexMode){
            flexMode = false;
            editor.updateOptions({ lineNumbers: 'on' });
        }else{
            flexMode = true;
            editor.updateOptions({ lineNumbers: 'off' });
        }
    }
</script>

<div class="h-vh">
    <div class="navbar flex justify-between items-center">
        <div class=" text-2xl font-bold p-4">ErgoScript</div>
        <div class="flex gap-4 items-center pr-2">
            <!-- <Avatars /> -->
            <button 
                on:click={toggleFlex}
                class="flex items-center px-2 py-1 gray-border" style="border-style:dashed;">
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
            {#if flexMode}
                <div class="flex items-center gap-4" style="min-width: 220px">
                    <div class="flex items-center">
                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">win95</label>
                    </div>
                    <div class="flex items-center">
                        <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">macOS</label>
                    </div>
                </div>
            {/if}

            {#if !flexMode}
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
            {/if}
        </div>
    </div>
    <div class="h-vh w-full flex flex-col justify-center items-center" class:flex-bg={flexMode} >
        <div class:editor-flex={flexMode} class:fake-window-header={flexMode} class:shadow-2xl={flexMode} class:w-full={!flexMode}>
            {#if flexMode}
                <div>
                    <div class="ios-buttons">
                        <div class="ios-button close"></div>
                        <div class="ios-button minimize"></div>
                        <div class="ios-button maximize"></div>
                    </div>
                </div>
            {/if}
            <div bind:this={editorContainer} class="w-full" class:h-full={flexMode} class:h-vh={!flexMode} />
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
            <a class="ml-2" href="https://github.com/SavonarolaLabs/escript-online">
                <svg width="32" height="32" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill="#bdbdbd" fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>
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
                    <button on:click={clickCopy}>
                        <div
                            class="h-full copy-btn flex items-center justify-center px-4"
                        >
                            <clipboard-copy value={contractAddress}>
                                {#if !copyConfirmation}
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
    .ios-buttons {
        display: flex;
        gap: 5px;
        padding:0.7em;
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


    .fake-window-header{
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background: #1e1e1e;
    }

    .editor-flex{
        height:300px;
        width: 600px;
        margin-top:-10%;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
        resize: both;
        -webkit-box-shadow: 0px 0px 81px 5px rgba(0,0,0,0.7);
        -moz-box-shadow: 0px 0px 81px 5px rgba(0,0,0,0.7);
        box-shadow: 0px 0px 81px 5px rgba(0,0,0,0.7);
    }

    .flex-bg{
        background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    }
    svg.octicon > path {
        fill: #bdbdbd;
    }
    .gray-border {
        border: 1px solid rgb(185, 185, 185);
        color: rgb(185, 185, 185);
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
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
            Liberation Mono, monospace;
    }
    select:focus,
    input:focus {
        outline: none;
    }
    select {
        background: url("data:image/svg+xml;utf8, <svg width='16' height='16' viewBox='0 0 330 330' xmlns='http://www.w3.org/2000/svg'><g><path fill='%23bdbdbd' d='m325.61 229.39-150-150c-2.812-2.813-6.628-4.393-10.606-4.393-3.979 0-7.794 1.581-10.607 4.394l-150 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.39 139.4 139.39c2.929 2.929 6.768 4.393 10.607 4.393s7.678-1.464 10.607-4.394c5.857-5.858 5.857-15.355-1e-3 -21.213z'/></g></svg>")
            no-repeat;
        background-position: 80% 50%;
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
        transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
            opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .btn-secondary {
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
        padding: 10px 21px;
        text-align: center;
        text-transform: none;
        transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
            opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .btn {
        align-items: center;
        appearance: button;
        background-color: #0276ff;
        border-radius: 8px;
        border-style: none;
        box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        font-family: "RM Neue", sans-serif;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
        padding: 10px 21px;
        text-align: center;
        text-transform: none;
        transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
            opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .btn:active {
        background-color: #006ae8;
    }

    .btn:hover {
        background-color: #1c84ff;
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
