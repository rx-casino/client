import Decimal from "decimal.js";
import CasinoGame from "$lib/logics/CasinoGame";
import UserStore from "$lib/logics/UserStore";
import { serverUrl } from "$lib/backendUrl"
import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import ScriptManager from "./ScriptManager";

export default class BaseGame extends CasinoGame {
  static MAX_MYBET = 10;
  constructor(e, t) {
    super(e, t);
    this.script = new ScriptManager(this);
    this.myBets = [];
    this.onMybet = this.onMybet.bind(this);
    this.loadMybet = this.loadMybet.bind(this);
    makeObservable(this, {
      myBets: observable.ref,
      loadMybet: action,
      setMyBets: action,
    })
  }
  setMyBets(_v) {
    this.myBets = _v;
  }
  async init() {
    await super.init();
    this.socket.on("mybet", (data) => this.onMybet(data));
    UserStore.getInstance().waitLogin().then(this.loadMybet);
  }

  async loadMybet() {
    const response = await axios.post(serverUrl() + "/api/user/crash-game/my-bet/", {
      size: 10
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${UserStore.getInstance().authToken}`
      }
    });
    const data = response.data;
    this.setMyBets(BaseGame.formatBetData(data.bets).slice(
      0,
      BaseGame.MAX_MYBET
    ));
  }

  onMybet({ bets }) {
    const n = this.myBets.reduce((e, t) => ((e[t.betId] = t), e), {});
    const i = BaseGame.formatBetData(bets.filter(b => b.userId === UserStore.getInstance().user.userId)).filter((e) => !n[e.betId]);
    const a = i.concat(this.myBets);

    this.setMyBets(a.slice(0, BaseGame.MAX_MYBET));
    i.forEach((e) => {
      console.log('On my bet end > ', e)
      this.emit("betEnd", {
        amount: new Decimal(e.betAmount),
        odds: e.odds,
        currencyName: e.currencyName,
        currencyImage: e.currencyImage
      })
    }
    );
  }

  static formatBetData(bets) {
    return bets.map((t) => ({
      betID: t.betId,
      betId: t.betId,
      currencyName: t.currencyName,
      currencyImage: t.currencyImage,
      name: t.name,
      userId: t.userId,
      hidden: t.hidden,
      avatar: t.avatar,
      gameId: t.gameId,
      odds: t.odds / 1e4,
      won: t.won,
      betAmount: parseFloat(t.betAmount),
      winAmount: parseFloat(t.winAmount),
      profitAmount: new Decimal(t.winAmount).sub(t.betAmount).toNumber(),
      nickName: t.name,
      betTime: t.betTime,
    }))
  }
}
