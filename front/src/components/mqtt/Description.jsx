import { observer } from "mobx-react-lite";
import React from "react";
import descrStore from "../../store/DescrStore";

const Description = observer(() => {
  const handleSave = () => {
    descrStore.saveDescrToStorage();
  };
  return (
    <div className="container">
      <div className="mb-2 row">
        <label className="col-sm-2">объект1 выход1</label>
        <div className="col-sm-2">
          <input
            onChange={(v) => descrStore.setDescrOut(0, 0, v)}
            value={descrStore.outs[0][0]}
          />
        </div>
      </div>
      <div className="mb-2 row">
        <label className="col-sm-2">объект1 выход2</label>
        <div className="col-sm-2">
          <input
            onChange={(v) => descrStore.setDescrOut(0, 1, v)}
            value={descrStore.outs[0][1]}
          />
        </div>
      </div>

      <div className="mb-2 row">
        <label className="col-sm-2">объект2 выход2</label>
        <div className="col-sm-2">
          <input
            onChange={(v) => descrStore.setDescrOut(1, 1, v)}
            value={descrStore.outs[1][1]}
          />
        </div>
      </div>
      <div className="mb-2 row">
        <label className="col-sm-2">объект2 выход3</label>
        <div className="col-sm-2">
          <input
            onChange={(v) => descrStore.setDescrOut(1, 2, v)}
            value={descrStore.outs[1][2]}
          />
        </div>
      </div>

      <div className="mb-2 row">
        <label className="col-sm-2"></label>
        <div className="col-sm-2">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
});

export default Description;
