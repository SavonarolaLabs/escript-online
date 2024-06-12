<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import * as Blockly from 'blockly';
  import { ergoScriptGenerator, blocks } from './ergoscript';
  import darkTheme from '@blockly/theme-dark';

  let blocklyDiv;
  const dispatch = createEventDispatcher();

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
</style>

<div id="pageContainer">
  <div id="blocklyDiv" bind:this={blocklyDiv}></div>
</div>
