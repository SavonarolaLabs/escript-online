<script lang="ts">
    import { selected_tab } from "./store";
</script>

<div class="row flex">
    <button on:click={()=>{selected_tab.set('code')}} class:active={$selected_tab=='code'}>code</button>
    <button on:click={()=>{selected_tab.set('tree')}} class:active={$selected_tab=='tree'}>tree</button>
</div>

<style>
    .row{
        background: gray;
        border-radius: 50px;
        height: 32px;
        padding: 2px;
        box-shadow: inset 0 0 2px;
    }
    button{
        padding-left: 1em;
        padding-right: 1em;
        border-radius: 45px;
        color: #1e1e1e;
    }
    button.active{
        color: unset;
        background-color: #1e1e1e;
        padding-left: 1em;
        padding-right: 1em;
    }
</style>
