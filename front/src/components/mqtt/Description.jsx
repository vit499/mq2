import { observer } from "mobx-react-lite";
import React from "react";
import descrStore from "../../store/DescrStore";

const Description = observer(() => {
  const handleSave = () => {
    descrStore.saveDescrToStorage();
  };
  return (
    <div className="container">
      {descrStore.outs.map((obj, indObj) => (
        <div key={indObj}>
          {obj.map((out, indOut) => (
            <div key={indOut} className="mb-2 row">
              <label className="col-sm-2">{`объект${indObj + 1} выход${
                indOut + 1
              }`}</label>
              <div className="col-sm-2">
                <input
                  onChange={(v) => descrStore.setDescrOut(indObj, indOut, v)}
                  value={descrStore.outs[indObj][indOut]}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <hr />
      {descrStore.tempers.map((obj, indObj) => (
        <div key={indObj}>
          {obj.map((out, indOut) => (
            <div key={indOut} className="mb-2 row">
              <label className="col-sm-2">{`объект${indObj + 1} датчик${
                indOut + 1
              }`}</label>
              <div className="col-sm-2">
                <input
                  onChange={(v) => descrStore.setDescrTemper(indObj, indOut, v)}
                  value={descrStore.tempers[indObj][indOut]}
                />
              </div>
            </div>
          ))}
        </div>
      ))}

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
