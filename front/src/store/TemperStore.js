import { makeAutoObservable, runInAction } from "mobx";
import devSend from "../utils/devsend";

// const nvobj = {
//   fout: [0, 0, 0, 0],
//   ftout: [0, 0, 0, 0],
//   sout: [0, 0, 0, 0],
//   temper: [0x80, 0x80, 0x80],
// };
class TemperStore {
  constructor() {
    // this._temper = 0x80;
    // this._fout1 = 0;
    // this._ftout1 = 0;
    // this._sout1 = 0;
    // this._fout2 = 0;
    // this._ftout2 = 0;
    // this._sout2 = 0;
    // this._valid = false;

    this._nvobj = [
      {
        ind: 0,
        nobj: "0808",
        fout: [0, 0, 0, 0],
        ftout: [0, 0, 0, 0],
        sout: [0, 0, 0, 0],
        indtemp: [0, 0, 0, 0],
        temper: [0x80, 0x80, 0x80],
        valid: false,
      },
      {
        ind: 1,
        nobj: "0809",
        fout: [0, 0, 0, 0],
        ftout: [0, 0, 0, 0],
        sout: [0, 0, 0, 0],
        indtemp: [0, 0, 0, 0],
        temper: [0x80, 0x80, 0x80],
        valid: false,
      },
    ];
    makeAutoObservable(this, {});
  }

  fillNobj(ind, nobj) {
    if (ind < 2) this._nvobj[ind].nobj = nobj;
    devSend.fillNobj(ind, nobj);
  }

  clear(indObj) {
    devSend.clear(indObj);
    runInAction(() => {
      this._nvobj[indObj].fout = [0, 0, 0, 0];
      this._nvobj[indObj].ftout = [0, 0, 0, 0];
      this._nvobj[indObj].sout = [0, 0, 0, 0];
      this._nvobj[indObj].indtemp = [0, 0, 0, 0];
      this._nvobj[indObj].temper = [0x80, 0x80, 0x80];
      this._nvobj[indObj].valid = false;
    });
  }
  clearAll() {
    devSend.clearAll();
    runInAction(() => {
      this._nvobj.forEach((o) => {
        o.fout = [0, 0, 0, 0];
        o.ftout = [0, 0, 0, 0];
        o.sout = [0, 0, 0, 0];
        o.indtemp = [0, 0, 0, 0];
        o.temper = [0x80, 0x80, 0x80];
        o.valid = false;
      });
    });
  }
  getTemper(indObj, indOut) {
    const indTemper = this._nvobj[indObj].indtemp[indOut];
    if (this._nvobj[indObj].temper[indTemper] === 0x80) {
      return "--";
    }
    return `${this._nvobj[indObj].temper[indTemper]} (датчик ${indTemper + 1})`;
  }
  getTemperAll() {
    let strRes = "";
    this._nvobj.forEach((o) => {
      o.temper.forEach((t, ind) => {
        if (t !== 0x80) {
          //strRes.concat(`<br/>${t} (obj${o.ind + 1} sensor${ind + 1})`);
          strRes = strRes + `\r\n ${t} (obj${o.ind + 1} sensor${ind + 1})`;
        }
      });
    });
    //console.log("strTemp", strRes);
    return strRes;
  }

  cpyObj(obj) {
    let ind;
    if (this._nvobj[0].nobj === obj.nobj) ind = 0;
    else if (this._nvobj[1].nobj === obj.nobj) ind = 1;

    runInAction(() => {
      if (obj.fout.length !== 0)
        obj.fout.forEach((f, i) => {
          //console.log(`${o.nobj} fout${i + 1}=${o.fout[i].toString()}`);
          this._nvobj[ind].fout[i] = obj.fout[i];
        });
      if (obj.ftout.length !== 0)
        obj.ftout.forEach((f, i) => {
          //console.log(`${o.nobj} ftout${i + 1}=${o.ftout[i].toString()}`);
          this._nvobj[ind].ftout[i] = obj.ftout[i];
        });
      if (obj.sout.length !== 0)
        obj.sout.forEach((f, i) => {
          //console.log(`${o.nobj} sout${i + 1}=${o.sout[i].toString()}`);
          this._nvobj[ind].sout[i] = obj.sout[i];
        });
      if (obj.indtemp.length !== 0)
        obj.indtemp.forEach((f, i) => {
          //console.log(`${o.nobj} indtemp${i + 1}=${o.indtemp[i].toString()}`);
          this._nvobj[ind].indtemp[i] = obj.indtemp[i];
        });
      obj.temper.forEach((f, i) => {
        if (i < 3) {
          //console.log(`${o.nobj} temper${i + 1}=${o.temper[i].toString()}`);
          this._nvobj[ind].temper[i] = obj.temper[i];
        }
      });
      this._nvobj[ind].valid = obj.valid;
      //console.log(`valid${ind}=${this._nvobj[ind].valid}`);
    });
  }
  recMes(p) {
    const { topic, message } = p;
    const xx = devSend.parseMes(topic, message.toString());
    if (xx && xx.valid) {
      this.cpyObj(xx);
    }
  }
}

const temperStore = new TemperStore();

export default temperStore;
