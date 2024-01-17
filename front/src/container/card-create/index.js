import "./index.scss";

import Page from "../../component/page";
// import Card from "../../component/card";
// import Title from "../../component/title-balance";
// import Settings from "../../svg/settings.svg";
// import Notifications from "../../svg/notifications.svg";
// import Stripe from "../../svg/stripe.svg";
// import Coinbase from "../../svg/coinbase.svg";
// import User from "../../svg/user.svg";
// import { Link } from "react-router-dom";
import { useState } from "react";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";

export default function Balance(onCreate) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    return sendData({ value });
  };

  const sendData = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch("http://localhost:4000/card-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(null);

        if (onCreate) onCreate();
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = ({ value }) =>
    JSON.stringify({
      text: value,
      username: "user",
    });

  return <Page></Page>;
}
