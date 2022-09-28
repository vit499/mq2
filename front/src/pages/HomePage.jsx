import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MqttComp from "../components/mqtt/MqttComp";
import SetOut from "../components/outs/SetOut";
import TemperComp from "../components/outs/TemperComp";
import { LOGIN_ROUTE } from "../components/router/constRouter";
import authStore from "../store/AuthStore";
import mq from "../store/Mq";
import temperStore from "../store/TemperStore";

const HomePage = observer(() => {
  useEffect(() => {
    // mq.mqttConnect();
    return () => mq.mqttDisconnect();
  }, []);

  return (
    <div className="container">
      {!authStore.isAuth && (
        <div>
          <p>Need login</p>
          <Link className="me-2" to={LOGIN_ROUTE}>
            Login
          </Link>
        </div>
      )}
      {authStore.isAuth && (
        <div>
          <br />
          <MqttComp />
          <SetOut indObj={0} indOut={1} />
          <SetOut indObj={1} indOut={1} />
          <SetOut indObj={1} indOut={2} />
          <TemperComp />
        </div>
      )}
    </div>
  );
});

export default HomePage;
