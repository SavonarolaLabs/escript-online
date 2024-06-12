<script lang="ts">
    import { createEventDispatcher, onMount, tick } from 'svelte';
    import * as Blockly from 'blockly';
    import { ergoScriptGenerator, blocks } from './ergoscript';
    import darkTheme from '@blockly/theme-dark';
  
    let blocklyDiv;
    const dispatch = createEventDispatcher();
  
    onMount(async () => {
        Blockly.common.defineBlocks(
            Blockly.common.createBlockDefinitionsFromJsonArray(blocks)
        );
  
        const toolbox = {
            contents: blocks.map(b => ({
                kind: 'block',
                type: b.type,
            }))
        };
  
        const ws = Blockly.inject(blocklyDiv, { toolbox, theme: darkTheme });
  
        const applyCustomTooltipStyles = () => {
            const tooltipDiv = Blockly.Tooltip.DIV;
            if (tooltipDiv) {
                tooltipDiv.style.backgroundColor = '#f0f0f0';
                tooltipDiv.style.color = '#333';
                tooltipDiv.style.fontFamily = 'Arial, sans-serif';
                tooltipDiv.style.border = '1px solid #ccc';
                tooltipDiv.style.padding = '10px';
                tooltipDiv.style.borderRadius = '5px';
                tooltipDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
            }
        };
  
        // Ensure the tooltip is styled after it is created
        const originalShow = Blockly.Tooltip.show;
        Blockly.Tooltip.show = function(...args) {
            originalShow.apply(this, args);
            setTimeout(applyCustomTooltipStyles, 0); // Use timeout to ensure it is styled after creation
        };
  
        const runCode = () => {
            const code = ergoScriptGenerator.workspaceToCode(ws);
            dispatch('codeUpdate', { code });
        };
  
        runCode();
  
        ws.addChangeListener((e) => {
            if (
                e.isUiEvent ||
                e.type === Blockly.Events.FINISHED_LOADING ||
                ws.isDragging()
            ) {
                return;
            }
            runCode();
        });
  
        // Wait for the next tick to ensure everything is loaded
        await tick();
        applyCustomTooltipStyles();
    });
  </script>
  
  <style>
    #pageContainer {
        flex-grow: 2;
    }
    #blocklyDiv {
        flex: 3;
        height: 100%;
        width: 100%;
    }
  
    /* Custom tooltip style with :global to prevent Svelte class prefixing */
    :global(.blocklyTooltipDiv) {
        background-color: #333; /* Change background color */
        color: #f0f0f0;              /* Change text color */
        font-family: Arial, sans-serif; /* Change font */
        border: none;   /* Add border */
        padding: 10px;            /* Add padding */
        border-radius: 5px;       /* Add rounded corners */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add shadow */
        font-size: 18px;
    }
  </style>
  
  <div id="pageContainer">
    <div id="blocklyDiv" bind:this={blocklyDiv}></div>
  </div>
  