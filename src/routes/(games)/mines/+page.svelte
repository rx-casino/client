<script>
    import { mines } from "$lib/games/mines-game/mines.store.js";
    import { newScreen } from "$lib/store/screen.js";
    import "../../../styles/game/index.css"
    import Controllers from '$lib/games/mines-game/controllers.svelte';
    import Loader from "$lib/loader.svelte";
    import GameView from "$lib/games/mines-game/game-view.svelte";
    import GameActions from "$lib/games/mines-game/game-actions.svelte";


</script>

{#if $mines?.mines.length }
    <div id="game-Mines " class="sc-kszsFN bdrOAo {$newScreen > 1000 ? "game-style0" : "game-style-mobile"}  sc-iyyVIK fzlRCD ">
        <div class="game-area">
            <div class="game-main">
                <Controllers />
                <GameView />
                <GameActions />
            </div>
        </div>  
    </div>
{:else}
    <div style="height: 70vh;">
        <Loader color="null"/>
    </div>
{/if}

<style>
    /* .bdrOAo.load{
        display: none;
    } */
</style>