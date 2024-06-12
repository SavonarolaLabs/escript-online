<script lang="ts">
	import type monaco from "monaco-editor";
	import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
	import { onMount } from "svelte";
	import { compileContract } from "$lib/compiler";

	import * as srust from "ergo-lib-wasm-browser";
	import { Network } from "@fleet-sdk/core";

	// html widget
	import hljs from "highlight.js/lib/core";
	import scala from "highlight.js/lib/languages/scala";
	hljs.registerLanguage("scala", scala);
	// html widget

	import { Address, ErgoTree } from "ergo-lib-wasm-browser";
	import Blockly from "./Blockly.svelte";

	let editorContainer: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco: typeof monaco;

	let selectedNetwork = Network.Mainnet;
	let selectedVersion = "v1";
	let selectedIncludeSize = false;
	let contractAddress = "";
	let compileErrorMessage = "";

	let lobbyLink = "";

	let flexMode = false;

	function onCompileClick() {
		const contract = editor.getValue();
		try {
			contractAddress = compileContract(
				contract,
				selectedNetwork,
				selectedVersion,
				selectedIncludeSize
			);
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
		editor.updateOptions({ readOnly: true });
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
</script>

<div class="h-vh">
	<div class="navbar flex justify-between items-center">
		<div class="flex items-center">
			<img src="logo.png" alt="" class="ml-4" style="width:30px;" />
			<div class=" text-2xl font-bold p-4 pl-2">ErgoScript</div>
		</div>
		<div class="flex gap-4 items-center pr-2"></div>
	</div>
	<div
		class="h-vh w-full flex flex-col justify-center items-center"
	>
		<div
			class="flex flex-col w-full"
		>
            <Blockly></Blockly>
			<div
				bind:this={editorContainer}
				class="w-full "
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
					<option value={"v1"}>v1</option>
					<option value={"v0"}>v0</option>
				</select>
				{#if selectedVersion == "v0"}
					<select
						bind:value={selectedIncludeSize}
						name="includeSize"
						id="includeSize"
						class=" bg-black flex items-center gap-2 m-2 px-3 py-2 custom-select"
						style="  -webkit-appearance: none !important;
-moz-appearance: none !important;"
					>
						<option value={false}
							>includeSize: false &nbsp;&nbsp;</option
						>
						<option value={true}
							>includeSize: true &nbsp;&nbsp;</option
						>
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
