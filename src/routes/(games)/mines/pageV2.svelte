<script>
// import Gameview from "$lib/games/mines/gameview.svelte";
import "$lib/games/mines/styles/index.css";
import Controls from "$lib/games/mines/Controls.svelte";
import {onMount} from "svelte";
import axios from "axios";
import { screen } from "$lib/store/screen";
import { handleAuthToken } from "$lib/store/routes";
import { DicegameSocket } from "$lib/games/mines/socket/Socket"

// import Allbet from "$lib/games/mines/componets/allbet.svelte";
// import Hotkey from "$lib/games/mines/componets/hotkey.svelte";
// import LiveStats from "$lib/games/mines/componets/liveStats.svelte";
// import SeedSetting from "$lib/games/mines/componets/seedSetting.svelte";
// import Help from "$lib/games/mines/componets/help.svelte";
import { soundHandler} from "$lib/games/mines/store/index";
import {MinesEncription} from "$lib/games/mines/store/index";
import background from "$lib/games/mines/audio/sadness.mp3";
DicegameSocket()
import { serverUrl } from "$lib/backendUrl";
// import Mobile from "./mobile.svelte";
// import Mybet from "$lib/games/mines/componets/mybet.svelte";
const URl = serverUrl()
let is_loading = false
const handleMinesGameEncrypt = (async()=>{
    is_loading = true
    await axios.get(`${URl}/api/user/mine-game/mine-encrypt`,{
        headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${$handleAuthToken}`
        }
    })
    .then((res)=>{
        is_loading = false
        MinesEncription.set(res.data[0])
    })
    .catch((err)=>{
        is_loading = false
        console.log(err)
    })
})

onMount(()=>{
  $handleAuthToken && handleMinesGameEncrypt()
})

let playPlayb = false
function playBackground() {
    playPlayb =! playPlayb
    if(playPlayb){
        const audio = new Audio(background);
        audio.volume = 1;
        audio.play();
    }else{
        const audio = new Audio(background);        
        audio.volume = 0;
        audio.paused();
    }
}
$: activeTab = 1
let is_hotkey = false
const handleHotKey = (()=>{
    is_hotkey = !is_hotkey
})

let is_stats = false
let stats = (()=>{
    is_stats = !is_stats
})
let isSeed = false
const  hanhisSeed = (()=>{
    isSeed = !isSeed
})

let isHelp = false
const handleIsHelp = (()=>{
    isHelp = !isHelp
})
 
const handleSoundState = (()=>{
    if($soundHandler){
        soundHandler.set(0)
    }else{
        soundHandler.set(1)
    }
})

</script>
    
{#if is_hotkey}
    <!-- <Hotkey on:close={handleHotKey} /> -->
{/if}
    
{#if is_stats}
    <!-- <LiveStats on:close={stats} /> -->
{/if}

{#if isSeed}
    <!-- <SeedSetting on:close={hanhisSeed}/> -->
{/if}

{#if isHelp}
    <!-- <Help on:close={handleIsHelp} /> -->
{/if}
    

{#if !is_loading}
<div  id="dice-main">
    <div class="sc-lhMiDA ePAxUv" style="opacity: 1; transform: none;">
        <div id="game-ClassicDice" class="sc-haTkiu lmWKWf game-style0 sc-gDGHff gYWFhf">
            <div class="game-area">
                <div class="game-main">
                    <!-- <Controls /> -->
                    <!-- <Gameview /> -->
    
                    <div class="game-actions">
                        <button disabled={playPlayb} on:click={()=> playBackground() } class={`action-item ${playPlayb ? "active" : ""} `}>
                        </button>

                        <button on:click={()=> handleSoundState()} class={`action-item ${$soundHandler ? "active" : ""} `}>
                   
                        </button>

                        <button on:click={handleHotKey} class="action-item  ">
                        </button>
                        <button on:click={hanhisSeed} class="action-item  " id="set_seed">
                        </button>
                        <button on:click={stats} class="action-item  ">
                        </button>
                        <button on:click={handleIsHelp} class="action-item  ">
                        </button>
                    </div>
                </div>
            </div>
    
            <div class="sc-cxpSdN kQfmQV tabs game-tabs len-3">
                <div class="tabs-navs">
                    <button on:click={()=> activeTab = 1} class={`tabs-nav ${activeTab === 1 && "is-active"}`}>All Bets</button>
                    <button on:click={()=>activeTab = 2} class={`tabs-nav ${activeTab === 2 && "is-active"}`}>My Bets</button>
                    <button on:click={()=>activeTab = 3} class={`tabs-nav ${activeTab === 3 && "is-active"}`}>Contest</button>
                    {#if activeTab === 1}
                    <div class="bg" style={`left: 0%; right: 66.6667%;`}></div>
                    {:else if activeTab === 2}
                    <div class="bg" style="left: 33.3333%; right: 33.3333%;"></div>
                    {:else if activeTab === 3 }
                    <div class="bg" style="left: 66.6667%; right: 0%;"></div>
                   {/if}
                </div>
                {#if activeTab === 1}
                    <!-- <Allbet /> -->
                    {:else if activeTab === 2}
                    <!-- <Mybet /> -->
                {/if}
            </div>
    
            <div class="sc-knKHOI cFxmZX">
              <div class="intro-title">
                <p>Mines game</p>
                <div class="intro-tags">
                  <p>Our Best Games</p>
                </div>
              </div>
              <div class="description">Classic Dice, a probability game established by blockchain hash value calculation and algorithm, provides more fun with bet and prediction, in which the closer the number rolled by players to the random number, the higher the probability winning.</div>
              <button class="intro-detail">
                Details
                <span style="margin-left: 1.125rem;">
                </span>
              </button>
            </div>
        </div>
    </div>
</div>


{:else}
    <div class="uytutfyh">
        <div class="tdthuy">
            <img src="https://res.cloudinary.com/dxwhz3r81/image/upload/v1697848286/dpp-favicon-logo_j53rwc.jpg" alt="">
        </div>
    </div>
{/if}
    
    
<style>
.uytutfyh{
    background-color: var(--background-color);
    width: 100%;
    height: 100vh;
}
.tdthuy {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    height: 500px;
}
.tdthuy img{
    width: 120px;
    background-color: rgba(51, 57, 57, 0.502);
    padding: 20px;
    opacity: 0.6;
    border-radius: 50%;
    animation: monyy 3s infinite;
}

@keyframes monyy{
    10%{
        margin-right: -100px;
    }

    100%{
        margin-right: 100px;
    }
}

    .ePAxUv {
        margin-top: 4rem;
    }
    
    .kQfmQV .tabs-navs {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 2.25rem;
        position: relative;
        border-radius: 1.125rem;
        background: var(--tab-nav-bg);
    }
    
    .lmWKWf .game-actions {
        display: flex;
        order: 10;
        -webkit-box-align: center;
        align-items: center;
        height: 4rem;
        position: relative;
    }
    
    .lmWKWf .game-actions::before {
        content: "";
        flex: 1 1 0%;
    }
    
    .lmWKWf .action-item {
        cursor: pointer;
        margin-right: 0.5rem;
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 50%;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
    }
    
    .action-item:hover {
        background: rgba(203, 203, 203, 0.082);
    }
    
    .lmWKWf .game-actions::after {
        content: "";
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        height: 1px;
        opacity: 0.3;
        background-color: var(--card-bg-2);
    }
    
    .lmWKWf .game-actions::before {
        content: "";
        flex: 1 1 0%;
    }
    
    .lmWKWf .game-actions {
        display: flex;
        order: 10;
        -webkit-box-align: center;
        align-items: center;
        height: 4rem;
        position: relative;
    }
    
    .lmWKWf .game-tabs {
        margin-top: 2.5rem;
    }
    
    .lmWKWf .game-tabs .tabs-navs {
        margin-bottom: 0.75rem;
        margin-left: 0.625rem;
        display: inline-flex;
    }
    
    .lmWKWf .game-tabs .tabs-navs .tabs-nav {
        width: 5.625rem;
    }
    
    .kQfmQV .tabs-nav.is-active {
        color: var(--text-5);
        font-weight: bold;
    }
    
    .kQfmQV .tabs-nav {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex: 1 1 0%;
        height: 100%;
        cursor: pointer;
        white-space: nowrap;
        width: 100%;
        z-index: 1;
    }
    
    .kQfmQV .tabs-navs .bg {
        border-radius: 1.125rem;
        background-image: linear-gradient(to left, rgb(85, 89, 102), rgb(85, 89, 102), rgb(88, 174, 20));
        opacity: 0.4;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        transition: right 0.2s ease-out 0s, left 0.3s ease-out 0s;
        transform: translateZ(0px);
        box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 0.3125rem;
    }
    .cFxmZX {
        width: 100%;
        border-radius: 1.25rem;
        background-color: var(--card-bg-5);
        padding: 1.5rem 1.5rem 2rem;
        margin-top: 2rem;
    }
    .cFxmZX .intro-title {
        min-height: 5rem;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
    }
    .cFxmZX .intro-title > p {
        font-size: 1rem;
        color: var(--text-5);
        font-weight: 600;
        margin: 0px;
        white-space: nowrap;
    }
    .cFxmZX .intro-title .intro-tags {
        margin-left: 2.5rem;
        display: flex;
        flex-wrap: wrap;
    }
    .cFxmZX .intro-title .intro-tags > p {
        margin: 0px 1.125rem 0.3125rem 0px;
        padding: 0.5rem 1.25rem;
        border-radius: 1.125rem;
        background-color: var(--card-bg-10);
    }
    .cFxmZX .description {
        margin-top: 0.75rem;
        line-height: 1.25rem;
    }
    .cFxmZX .intro-detail {
        width: 6.75rem;
        height: 2.5rem;
        margin-top: 2rem;
        border-radius: 1.25rem;
        background-color: var(--card-bg-13);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
    }
    </style>
    