<script>
  import { userBets, initializing } from "$lib/games/hilo/store";
  import Loader from "$lib/components/loader.svelte";
  import HiloDialog from "./dialogs/HiloDialog.svelte";
  import useFormatter from "$lib/hook/formatter";
  import { screen } from "$lib/store/screen";
  const { removeTrailingZeros, getSuffix } = useFormatter();
  $: hiloDialogData = null;
</script>

{#if $initializing}
  <div style="height: 400px;">
    <Loader />
  </div>
{:else if Boolean($userBets.length)}
  <div class="sc-eZhRLC iycaRo">
    <table class="sc-gWXbKe iUeetX table is-hover">
      <thead>
        <tr>
          <th class="num">Bet ID</th>
          {#if $screen > 650}
            <th class="time">Time</th>
          {/if}
          {#if $screen > 420}
          <th class="bet">Bet</th>
          {/if}
          <th class="payout">Payout</th><th class="profit">Profit</th></tr
        ></thead>
      <tbody>
        {#each $userBets as bet, index (`${bet.bet_id}_${index}`)}
          <tr on:click={() => (hiloDialogData = { tab: 1, betID: bet.bet_id })}
            ><td><a href="/hilo" class="hash ellipsis">{bet.bet_id}</a></td>
            {#if $screen > 650}
            <td>{new Date(bet.time).toLocaleTimeString()}</td>
            {/if}
            {#if $screen > 420}
            <td class="bet">
              <div class="sc-Galmp erPQzq coin notranslate monospace">
                <img alt="" class="coin-icon" src={bet.token_img} />
                <div class="amount">
                  <span class="amount-str"
                    >{removeTrailingZeros(bet.bet_amount.toFixed(7))}<span
                      class="suffix"
                      >{getSuffix(bet.bet_amount.toFixed(7))}</span
                    ></span
                  >
                </div>
              </div>
            </td>
            {/if}
              <td class="payout">{bet.payout.toFixed(2)}×</td><td
              class="profitline {!bet.won ? 'is-lose' : 'is-win'}"
              ><div class="sc-Galmp erPQzq coin notranslate monospace has-sign">
                <img alt="" class="coin-icon" src={bet.token_img} />
                <div class="amount">
                  <span class="amount-str"
                    >{bet.won ? "+" : ""}{removeTrailingZeros(
                      (bet.won
                        ? bet.bet_amount * bet.payout - bet.bet_amount
                        : bet.bet_amount
                      ).toFixed(7)
                    )}<span class="suffix"
                      >{getSuffix(
                        (bet.won
                          ? bet.bet_amount * bet.payout - bet.bet_amount
                          : bet.bet_amount
                        ).toFixed(7)
                      )}</span
                    ></span
                  >
                </div>
              </div></td
            ></tr
          >
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <div class="sc-epFoly etYRmD">
    <div class="sc-eCImPb biQums cuPxwd empty">
      <div class="msg">Oops! There is no data yet!</div>
    </div>
  </div>
{/if}

{#if Boolean(hiloDialogData)}
  <HiloDialog launchConf={hiloDialogData} on:close={() => hiloDialogData = null} />
{/if}

<style>
  .iycaRo {
    min-height: 30rem;
    padding: 0.5rem;
  }
  .iUeetX {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0px;
  }
  .iUeetX th:first-child,
  .iUeetX td:first-child {
    text-align: left;
  }
  .iUeetX th,
  .iUeetX td {
    overflow: hidden;
    text-align: center;
    padding: 0.875rem 0.75rem;
  }
  .iUeetX th {
    font-weight: normal;
    color: rgba(153, 164, 176, 0.6);
  }
  .iUeetX th:last-child,
  .iUeetX td:last-child {
    text-align: right;
  }
  .iycaRo tr {
    cursor: pointer;
  }
  .iUeetX td:first-child {
    border-radius: 0.625rem 0px 0px 0.625rem;
  }
  .iUeetX td:last-child {
    border-radius: 0px 0.625rem 0.625rem 0px;
  }
  .iycaRo a {
    color: inherit;
  }
  /* .iTDswZ.user-info {
    color: rgb(245, 246, 247);
    font-weight: bold;
  } */

  .iycaRo a {
    color: inherit;
  }

  /* .iTDswZ {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
  } */
  .iycaRo .coin {
    font-weight: bold;
  }

  .table .sc-Galmp {
    font-family: Monmono;
  }
  .erPQzq {
    display: inline-flex;
    vertical-align: middle;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
  }
  .erPQzq .coin-icon {
    width: 1.4em;
    height: 1.4em;
    margin-right: 0.25em;
  }
  .iycaRo .coin .amount {
    color: rgb(245, 246, 247);
  }
  .erPQzq .amount-str {
    width: 7em;
    display: inline-block;
  }
  .erPQzq .suffix {
    opacity: 0.5;
  }
  .iycaRo .is-lose .amount {
    color: #fb3d3d;
  }
  .iycaRo .is-win .amount {
    color: rgb(67, 179, 9);
  }
  .iUeetX.is-hover tbody tr:hover td {
    background: rgb(45, 48, 53);
  }
</style>
