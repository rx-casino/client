<script>
    import { user } from "$lib/store/profile";
    import Details from "./details.svelte";
    import { goto } from "$app/navigation"
    export let wallet
    export let currency
    import Warning from "./warning.svelte";
    import { url } from "$lib/store/routes";
    $: warning = false
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
        if( !$user?.is_verified) {
            warning = true
        }
        else{
            goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=deposit&cur=${(e).toLowerCase()}`)
        }
    })
      

</script>


{#if !currency}
    <div>
        <h1 class="css-rhqiop">Deposit options</h1>
        <div class="css-1d5ntxf">
        {#each wallet as wa}
            <button on:click={()=> handleOpenDetails(wa.coin_name)} disabled={wa.disabled} class="css-1yhwmxl {wa.disabled ? "disabled" : "enabled"}">
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



{#if  currency}
    <Details activeCoin={activeCoin}/>
{/if}

{#if warning}
    <Warning on:close={()=> warning = false}/>
{/if}

<style>
   
</style>