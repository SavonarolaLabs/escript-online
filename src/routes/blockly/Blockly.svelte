<script lang="ts">
    import { onMount } from 'svelte';
    import * as Blockly from 'blockly';
    import { ergoScriptGenerator, blocks } from './ergoscript';
    import darkTheme from '@blockly/theme-dark';
  
    let blocklyDiv;
    let codeDiv;
  
    onMount(() => {
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
  
      const runCode = () => {
        const code = ergoScriptGenerator.workspaceToCode(ws);
        codeDiv.innerText = code;
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
    });
  </script>
  
  <style>
    #pageContainer {
      display: flex;
      flex-direction: column;
      height: 99vh;
    }
    #outputPane {
      flex: 1;
      background-color: #1e1e1e;
      color: #fff;
      overflow: auto;
      padding: 10px;
    }
    #blocklyDiv {
      flex: 3;
      height: 100%;
      width: 100%;
    }
  </style>
  
  <div id="pageContainer">
    <div id="blocklyDiv" bind:this={blocklyDiv}></div>
    <div id="outputPane">
      <pre id="generatedCode"><code bind:this={codeDiv}></code></pre>
    </div>
  </div>
  