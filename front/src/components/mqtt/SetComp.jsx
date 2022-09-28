import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router";
import { SETT_ROUTE } from "../router/constRouter";

const SetComp = () => {
  const [pass, setPass] = useState("");
  const [gotoset, setGotoset] = useState(false);

  // const navigate = useNavigate();
  const onPass = () => {
    if (pass === "333") {
      setPass("");
      // navigate(SETT_ROUTE);
      setGotoset(true);
    }
  };

  return (
    <div className="mb-2">
      {gotoset && <Navigate to={SETT_ROUTE} />}
      <input
        className="me-2"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        placeholder="pass"
      />
      <button onClick={onPass}>Settings</button>
    </div>
  );
};

export default SetComp;
