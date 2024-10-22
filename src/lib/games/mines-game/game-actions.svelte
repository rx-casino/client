<script>

    import { soundManager } from "./mines.store.js";
    
</script>

<div class="game-actions">
    <button on:click={()=> $soundManager.playBg("bg")} class="action-item  ">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon"><use xlink:href="#icon_MusicOff"></use></svg>
    </button>
    <button class="action-item  active">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" title="ospe" class="sc-gsDKAQ hxODWG icon">
            <use xlink:href="#icon_SoundOn"></use>
        </svg>
    </button>
    <button class="action-item  ">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
            <use xlink:href="#icon_HotKeys"></use>
        </svg>
    </button>
    <button class="action-item  " id="set_seed">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
            <use xlink:href="#icon_Seed"></use>
        </svg>
    </button>
    <button class="action-item  ">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
            <use xlink:href="#icon_LiveStats"></use>
        </svg>
    </button>
    <button class="action-item  ">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="sc-gsDKAQ hxODWG icon">
            <use xlink:href="#icon_Help"></use>
        </svg>
    </button>
</div>