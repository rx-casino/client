<script>
   /** @type {import('./$types').PageLoad} */
   import Navbar from "$lib/navbar.svelte";
   import "../styles/global.css"
   import "../styles/games.css"
   import { user } from "$lib/store/profile";
   import { browser} from '$app/environment';
   import { screen, newScreen } from "$lib/store/screen";
   import { onMount } from "svelte";
   import { url, seaser } from "$lib/store/routes";
   import { device } from "$lib/store/profile";
   // import Password from "$lib/password/index.svelte";
   import Loader from "$lib/loader.svelte";
   import RightSideBar from "$lib/right-sideBar.svelte";
   import LeftSidebar from "$lib/left-sidebar.svelte";
    import { Toaster } from 'svelte-sonner'
   import Footer from "$lib/footer.svelte";
   import { page } from '$app/stores';
   import { goto } from "$app/navigation";
   import { isLoggin, isLiveStat} from "$lib/store/activities";
   import Auth from "$lib/auth/layout.svelte";
   import Verification from "$lib/auth/verify/verification.svelte";
   import Wallet from "$lib/wallet/layout.svelte";
   import { handleSocketConnection } from "$lib/socket/index";
   import SearchGames from "$lib/searchGames/SearchGames.svelte";
   import User from "$lib/user/layout.svelte"
   import LiveStats from "$lib/games/crash/dialogs/LiveStats.svelte";
   import { app } from '$lib/store/app';
   import { loadapp } from '../lib/store/app';
   export let data 

   $: isPassword = data?.password ? false : true
   $: url.set($page.url.pathname)
   $: urlString = ($page.url.href);
   $: paramString = urlString.split('?')[1];
   $: queryString = new URLSearchParams(paramString);
   $: seaserEl = []
   $: tab = ""
   $: referral = ""

   $: {
    seaserEl = []
      if (paramString) {
         for (let pair of queryString.entries()) {
               seaserEl.push(pair[1])
         }
      }
      tab = seaserEl[0]
      referral = seaserEl[2]
      seaser.set(seaserEl)
   }

   let ens = browser && window.innerWidth
   browser && window.addEventListener("resize", () => {
      ens = (window.innerWidth)
      screen.set(ens)
      let el = document.documentElement
      el.style.fontSize = `${$screen > 650 ? 16 : $screen > 560 ?  23 : $screen > 500 ? 21.34 : $screen > 440 ? 17.54 : $screen > 300 ?  13.5 : 11.5}px`;
   })

   onMount(() => {
      ens = browser && window.innerWidth
      screen.set(ens)
      let el = document.documentElement
      el.style.fontSize = `${$screen > 650 ? 16 : $screen > 560 ?  23 : $screen > 500 ? 21.34 : $screen > 440 ? 17.54 : $screen >  300 ?  13.5 : 11.5}px`;
   })
  
   $: sideHasExpand = 8
   $: menu = false
   $: chat = false

   const handleChatSection = (()=>{
         menu = false
         chat = true
   })

   const handleMenuSection = (()=>{
         chat = false
         menu = true
   })

   const handleHomeSelection = (()=>{
         chat = false
         menu = false
   })
   onMount(()=>{
      if(!$isLoggin && $url === "/verification"){
         goto("/")
      }
   })

   onMount(async()=>{
     const { handleFetchPublicChat } = await handleSocketConnection()
     handleFetchPublicChat()
   })

   onMount(()=>{
      if(tab === "auth"){
         if(referral && $isLoggin){
            goto(`${$url === "/" ? "" : $url}/?tab=wallet&modal=referral&=${referral}`)
         }
      }
   })


   $:{
      if(tab === "verify-email"){
         if($user?.emailIsVerified){
            goto($url)
         }
      }
   }


   onMount(async()=>{
     const response = await $app?.fetchVistorsDevice()
     device.set(response)
   })

   $: newScreen.set($screen - sideHasExpand)

   
</script>

<Toaster position="bottom-left" expand={true} richColors  />
{#if !$loadapp}
   <div id="root" >
      <Navbar sideHasExpand={sideHasExpand} chat={chat} menu={menu} on:home={handleHomeSelection} on:return={()=> sideHasExpand = 248} on:chat={handleChatSection} on:menu={handleMenuSection}/>
         {#if $screen < 750}
            <div style="min-height: 112px;"></div>
         {:else}
            <div style="min-height: 64px;"></div>
         {/if}
      
      {#if $screen > 750 || menu}
         <RightSideBar />
      {/if}
      <div class="{sideHasExpand === 340 ? "css-yl3y1i" : sideHasExpand === 8 ? "css-qk763z" : "css-1polf3r"}">
         <div class="css-1gcbewu">
            {#if $url !== "/verification" && $isLoggin  && !$user.is_verified}
               <Verification />
            {/if}
            <slot></slot>
         </div>
         <Footer />
      </div>
      {#if $screen > 750 || chat}
         <LeftSidebar sideHasExpand={sideHasExpand} on:close={()=> sideHasExpand = 8}  on:ellapse={()=> sideHasExpand = 248} on:expand={()=> sideHasExpand = 340}/>  
      {/if}
   </div>
   {:else}
   <div style="height: 70vh;">
      <Loader />
   </div>
{/if}

{#if $isLoggin}
   <div class="rollbit-modal-popover-container" style="display: {tab === "wallet" ? "inline-block" : "none"} ;">
      <Wallet tab={seaserEl} />
   </div>

   {#if tab === "user"}
      <User tab={seaserEl} />
   {/if}
{/if}


{#if tab === "auth"}
   <Auth tab={seaserEl} />
{/if}

{#if tab === "search"}
   <SearchGames tab={seaserEl}/>
{/if}

{#if $isLiveStat}
   <LiveStats />
{/if}

