<script lang="ts">
    import Avatars from "$lib/Avatars.svelte";
    import type monaco from "monaco-editor";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import { onMount } from "svelte";

    let editorContainer: HTMLDivElement;
    let monacoEditor: monaco.editor.IStandaloneCodeEditor;
    let Monaco: typeof monaco;

    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId: any, label: string) {
                return new editorWorker();
            },
        };

        Monaco = await import("monaco-editor");
        monacoEditor = Monaco.editor.create(editorContainer, {
            value: text,
            language: "scala",
            minimap: { enabled: false },
            theme: "vs-dark",
            fontSize: 16,
            automaticLayout: true
        });

        return () => {
            monacoEditor.dispose();
        };
    });

</script>

<div class="h-vh">
    <div class="navbar flex justify-between items-center">
        <div class=" text-2xl font-bold p-4">ErgoScript</div>
        <div class=" pr-2">
            <Avatars />
        </div>
    </div>
    <div bind:this={editorContainer} class="h-vh w-full" />
    <div class="footer w-full flex rounded-md justify-end p-2 gap-4">
        <button class="btn-secondary flex items-center gap-2 m-2 px-3 py-2">
            Mainnet
            <svg
            width="16px"
            height="16px"
            fill="#000000"
            version="1.1"
            viewBox="0 0 330 330"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            fill="#bdbdbd"
                d="m325.61 229.39-150-150c-2.812-2.813-6.628-4.393-10.606-4.393-3.979 0-7.794 1.581-10.607 4.394l-150 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.39 139.4 139.39c2.929 2.929 6.768 4.393 10.607 4.393s7.678-1.464 10.607-4.394c5.857-5.858 5.857-15.355-1e-3 -21.213z"
            />
        </svg>
            </button
        >
        <button class="btn flex items-center gap-2 m-2 px-3 py-2">
            <img src="command_line.png" class="w-4" alt="" />
            compile</button
        >
    </div>
</div>

<style>
    .btn-secondary {
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
