<script>
    import { goto } from "$app/navigation"
    import { url } from "$lib/store/routes";
    import Detailed from "./detailed.svelte";
    import { isLoggin} from "$lib/store/activities";
    export let wallet
    export let currency
    $: activeCoin = ""
    $:{
        if(currency){
            wallet.forEach(element => {
                if((element.coin_name).toLowerCase() === currency){
                    activeCoin = element
                }
            });
        }
    }

    const handleOpenDetails = ((e)=>{
        goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=withdraw&cur=${(e).toLowerCase()}`)
    })
      
</script>

{#if !currency}
    <div>
        <h1 class="css-rhqiop">Withdrawal options</h1>
        <div class="css-1d5ntxf">
        {#each wallet as wa}
            <button on:click={()=> handleOpenDetails(wa.coin_name)} class="css-1yhwmxl {wa.disabled ? "disabled" : "enabled"}">
                <div class="css-tt41bp">
                    <img src="{wa.coin_image}" alt="" size="32" class="css-bzek24">
                </div>
                <div class="css-1v92hyt">
                    {wa.fullname}
                    <div class="css-h7b5qw">{wa.coin_name}</div>
                </div>
            </button>
        {/each}
        </div>
    </div>
{/if}

{#if currency}
    <Detailed activeCoin={activeCoin}/>
{/if}

<style>
   
</style>