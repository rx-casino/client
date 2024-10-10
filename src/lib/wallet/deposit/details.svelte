<script>
    import { goto } from "$app/navigation"
    export let activeCoin;
</script>

<h1 class="css-mpks89">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={()=> history.back()} class="css-bofapj">
        <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" size="9" color="#fff" class="css-6opzgw">
            <title>arrow</title>
            <g id="arrow" fill-rule="currentColor">
                <path d="M8,12.534 C8.00312077,12.1491981 7.86017338,11.7775349 7.6,11.494 L3.348,7 L7.6,2.506 C8.14019021,1.91980519 8.14019021,1.01719481 7.6,0.431 C7.34808121,0.156127315 6.99235127,-0.000378973093 6.6195,-0.000378973093 C6.24664873,-0.000378973093 5.89091879,0.156127315 5.639,0.431 L0.407,5.963 C-0.135688789,6.54706274 -0.135688789,7.45093726 0.407,8.035 L5.634,13.569 C5.88591879,13.8438727 6.24164873,14.000379 6.6145,14.000379 C6.98735127,14.000379 7.34308121,13.8438727 7.595,13.569 C7.8548547,13.2872672 7.99785194,12.9172619 7.995,12.534" id="Arrow-left-1"></path>
            </g>
        </svg>
    </div>
    <img src="{activeCoin?.coin_image}" alt="" size="32" class="css-bzek24">
    Deposit {activeCoin?.fullname}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={()=> goto(`/account/withdrawals?tab=${(activeCoin.coin_name).toLowerCase()}`)} class="css-1w9eatj">View Transactions</div>
</h1>


<div class="css-1slrani">
    <div class="css-111h8nl">
        <div>
            <div class="css-1x7hz3d">Send the amount of Solana of your choice to the following address to receive the equivalent in Coins.</div>
            <div class="css-x3ayqu">
                <svg width="21" height="19" viewBox="0 0 21 19" xmlns="http://www.w3.org/2000/svg" size="20" color="#ffe500" glow="#FFB018" class="css-3fqycy">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7013 1.19853C11.3182 0.522528 10.3443 0.522527 9.96124 1.19853L0.962978 17.0785C0.585235 17.7451 1.06679 18.5715 1.83301 18.5715H19.8295C20.5957 18.5715 21.0773 17.7451 20.6996 17.0785L11.7013 1.19853ZM11.5541 12.1603C11.777 12.1603 11.8456 12.0574 11.8627 11.8345L12.017 6.92026C12.017 6.68026 11.9484 6.5774 11.7084 6.5774H9.97127C9.73127 6.5774 9.64555 6.68026 9.64555 6.92026L9.81698 11.8345C9.83413 12.0574 9.9027 12.1603 10.1256 12.1603H11.5541ZM11.7084 15.806C11.9313 15.806 12.017 15.7203 12.017 15.4803V13.646C12.017 13.4231 11.9313 13.3203 11.7084 13.3203H9.97127C9.73127 13.3203 9.64555 13.4231 9.64555 13.646V15.4803C9.64555 15.7203 9.73127 15.806 9.97127 15.806H11.7084Z" fill="currentColor"></path>
                </svg>
                Deposited SOL must be above 0.002 SOL. Deposits below this amount will not be credited.
            </div>
            <div class="css-x3ayqu">
                <svg width="21" height="19" viewBox="0 0 21 19" xmlns="http://www.w3.org/2000/svg" size="20" color="#ffe500" glow="#FFB018" class="css-3fqycy">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7013 1.19853C11.3182 0.522528 10.3443 0.522527 9.96124 1.19853L0.962978 17.0785C0.585235 17.7451 1.06679 18.5715 1.83301 18.5715H19.8295C20.5957 18.5715 21.0773 17.7451 20.6996 17.0785L11.7013 1.19853ZM11.5541 12.1603C11.777 12.1603 11.8456 12.0574 11.8627 11.8345L12.017 6.92026C12.017 6.68026 11.9484 6.5774 11.7084 6.5774H9.97127C9.73127 6.5774 9.64555 6.68026 9.64555 6.92026L9.81698 11.8345C9.83413 12.0574 9.9027 12.1603 10.1256 12.1603H11.5541ZM11.7084 15.806C11.9313 15.806 12.017 15.7203 12.017 15.4803V13.646C12.017 13.4231 11.9313 13.3203 11.7084 13.3203H9.97127C9.73127 13.3203 9.64555 13.4231 9.64555 13.646V15.4803C9.64555 15.7203 9.73127 15.806 9.97127 15.806H11.7084Z" fill="currentColor"></path>
                </svg>
                Solana is a highly experimental blockchain. Deposits and withdrawals might be routinely delayed for extended periods of time. Use at your own risk.
            </div>
        </div>
        <img class="css-c5ana5" src="data:image/png;base64,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" alt="qrcode">
    </div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="css-1vec8iw" style="color: rgb(255, 255, 255); margin: 16px 0px 12px;">Your personal Solana deposit address</label>
    <div class="css-c92lcy">
        <div style="margin: 0px 12px 0px 8px;">RBuiAjF8gaADcN892o3SwEnRkH1eJ6owfVabcib564a</div>
        <button class="css-vmbe4r">Copy Address</button>
    </div>
    <div class="css-1yy2fuw">Missing SOL  deposits? <span>Request deposit address sweep</span>
    </div>
</div>

<style>
.css-111h8nl {
    display: flex;
}
.css-c5ana5 {
    width: 150px;
    height: 150px;
    margin-left: 32px;
}
.css-1x7hz3d {
    margin-bottom: 16px;
    line-height: 1.6;
    color: rgb(177, 182, 198);
    font-size: 14px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 500;
    font-style: normal;
}
.css-x3ayqu {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    column-gap: 12px;
    margin-bottom: 16px;
    line-height: 1.6;
    color: rgb(255, 176, 24);
    font-size: 14px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 500;
    font-style: normal;
}
.css-3fqycy {
    fill: currentcolor;
    width: 20px;
    min-width: 20px;
    height: auto;
    filter: drop-shadow(rgba(255, 176, 24, 0.6) 0px 0px 5px);
}
.css-1vec8iw {
    text-transform: uppercase;
    color: rgb(177, 182, 198);
    margin-bottom: 10px;
    font-size: 12px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 800;
    font-style: normal;
}
.css-c92lcy {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 8px;
    border-radius: 6px;
    word-break: break-word;
    color: rgb(255, 255, 255);
    background: rgba(15, 17, 26, 0.55);
    font-size: 14px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 500;
    font-style: normal;
}
.css-1yy2fuw {
    margin-top: 16px;
    color: rgb(177, 182, 198);
    font-size: 12px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 500;
    font-style: normal;
}
.css-1yy2fuw span {
    cursor: pointer;
    color: var(--primary-color);
}
.css-1yy2fuw span:hover {
    text-decoration: underline;
}
</style>