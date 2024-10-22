<script>
    import { mines } from "$lib/games/mines-game/mines.store.js";
    import { onMount } from "svelte";
    $: tab = 0
    $: sliderBlock = false
    $: _isOpen = false
    let _Mines = []
    $: active_mine = 1
    
    onMount(()=>{
        _Mines = $mines.mines
    })

    const handleMinesSellect = ((id)=>{
        active_mine = id
    })

</script>

<div id="Mines-control-0" class="sc-eoHXOn kMAYer game-control style0">
    <div class="sc-iwjdpV ikWSlH radio game-control-switch">
        <button on:click={()=> tab = 0} class="{!tab && "is-active"}">
            <div class="label">Manual</div>
        </button>
        <button on:click={()=> tab = 1} class="{tab && "is-active"}">
            <div class="label">Auto</div>
        </button>
    </div>
    <div class="game-control-panel">
        <div class="sc-ePIFMk kwuJys">
            <div class="sc-ezbkAF gcQjQT input sc-fvxzrP gOLODp sc-dWbSDx IUvXt game-coininput">
                <div class="input-label">
                    <div class="sc-jnSlpE dJJJKk label">
                        <div>Amount</div>
                        <div class="max-profit">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                                <use xlink:href="#icon_Inform"></use>
                            </svg>
                            <div class="tip">
                                <span class="tit">Max Profit:&nbsp;</span>
                                <div class="sc-Galmp erPQzq coin notranslate">
                                    <div class="amount">
                                        <span class="amount-str">5000.<span class="suffix">00000</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="label-amount">0 USD</div>
            </div>
            <div class="input-control">
                <input type="text" value="100.000000000">
                <img class="coin-icon" loading="lazy" alt="" src="https://cryptologos.cc/logos/thumbs/solana.png?v=034">
                <div class="sc-kDTinF bswIvI button-group">
                    <button>/2</button>
                    <button>x2</button>
                    {#if sliderBlock}
                        <div class="fix-layer" style="opacity: 1; transform: none;">
                            <button class="">Min</button>
                            <div class="sc-kLwhqv eOA-dmL slider">
                                <div class="slider-after" style="transform: scaleX(0);"></div>
                                <!-- <div class="slider-handler-wrap" style="transform: translateX(0%);">
                                    <button class="slider-handler"></button>
                                </div> -->
                                <input type="range" class="slider-block" name="" id="">
                                <div class="slider-before" style="transform: scaleX(1);"></div>
                            </div>
                            <button class="">Max</button>
                        </div>
                    {/if}
                        
                    <button  class="sc-fpyFWH AZvYO">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Arrow"></use>
                        </svg>
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Arrow"></use>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
        <div class="sc-ezbkAF gcQjQT input ">
            <div class="input-label">Mines</div>
            <div class="input-control">
                   <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div on:click={()=> _isOpen =! _isOpen} class="sc-jJoQJp gOHquD select {_isOpen && "is-open"} sc-hCwLRM gnHBOV">
                    <div class="select-trigger">{active_mine}<div class="arrow ">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
                            <use xlink:href="#icon_Arrow"></use>
                        </svg>
                    </div>
                </div>
                {#if _isOpen}
                    <div class="sc-hiCibw iVwWcQ select-options-wrap" style="opacity: 1; top: 100%; transform: none;">
                        <div class="sc-dkPtRN jScFby scroll-view select-options len-24">
                            {#each _Mines as mine}
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div on:click={()=> handleMinesSellect(mine.id)} class="select-option {mine.id === active_mine && "active"}">{mine.id}</div>
                            {/each}
                        </div>
                    </div>
                {/if}
        
            </div>
        </div>
    </div>
    <button class="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big bet-button">
        <div class="button-inner">Bet</div>
    </button>
    </div>
</div>
</div>

<style>
.gOHquD .arrow > svg {
  transform: rotate(0deg);
}
.gOHquD .select-trigger {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    overflow: hidden;
    height: 100%;
    cursor: pointer;
    padding: 0px 1.25rem;
    user-select: none;
    border-radius: 1.25rem;
    background-color: transparent;
}
.gOHquD.is-open .arrow > svg {
    transform: rotate(90deg);
}
.iVwWcQ .select-options {
    border-radius: .25rem;
    padding: 0.125rem 0.375rem;
    background-color: rgb(20, 22, 34);
    box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 8px 0px;
    height: auto;
    max-height: 16.25rem;
}
</style>