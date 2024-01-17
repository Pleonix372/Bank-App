import "./index.scss";

import Page from "../../component/page";
import Card from "../../component/card";
import Title from "../../component/title-balance";
import Settings from "../../svg/settings.svg";
import Notifications from "../../svg/notifications.svg";
import Stripe from "../../svg/stripe.svg";
import Coinbase from "../../svg/coinbase.svg";
import User from "../../svg/user.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

// import { Alert, Loader, LOAD_STATUS } from "../../component/load";

export default function Balance(onCreate) {
  // const [status, setStatus] = useState(null);
  // const [message, setMessage] = useState("");

  // const handleSubmit = (value) => {
  //   return sendData({ value });
  // };

  // const sendData = async (dataToSend) => {
  //   setStatus(LOAD_STATUS.PROGRESS);
  //   try {
  //     const res = await fetch("http://localhost:4000/card-create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: convertData(dataToSend),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setStatus(null);

  //       if (onCreate) onCreate();
  //     } else {
  //       setMessage(data.message);
  //       setStatus(LOAD_STATUS.ERROR);
  //     }
  //   } catch (error) {
  //     setMessage(error.message);
  //     setStatus(LOAD_STATUS.ERROR);
  //   }
  // };

  // const convertData = ({ value }) =>
  //   JSON.stringify({
  //     text: value,
  //     username: "user",
  //   });

  return (
    <Page>
      <div className="main-balance">
        <Title
          title="Main wallet"
          className="title-balance__balance"
          buttonLeft={Settings}
          hrefLeft="/settings"
          buttonRight={Notifications}
          hrefRight="/notifications"
        />

        <div className="balance">$100.20</div>

        <div className="button-operations">
          <div>
            <div className="button-operations__background--white">
              <div className="button-operations__background--blue">
                <a href="/receive">
                  <span className="icon__receive" />
                </a>
              </div>
            </div>
            <p className="button-operations__text">Receive</p>
          </div>

          <div>
            <div className="button-operations__background--white">
              <div className="button-operations__background--blue">
                <Link to="/send">
                  <span className="icon__send" />
                </Link>
              </div>
            </div>
            <p className="button-operations__text">Send</p>
          </div>
        </div>
      </div>

      <div className="card__block">
        <Link className="balance__link" to="/transaction/:231">
          <Card
            logo={Stripe}
            name="Stripe"
            time="12:25"
            type="Receipt"
            sign="+"
            sum="125.00"
            showSum="show"
          />
        </Link>

        <Link className="balance__link" to="/transaction/:231">
          <Card
            logo={Coinbase}
            name="Coinbase"
            time="12:25"
            type="Receipt"
            sign="+"
            sum="125.00"
            showSum="show"
          />
        </Link>

        <Link className="balance__link" to="/transaction/:231">
          <Card
            logo={User}
            name="Oleg V."
            time="12:25"
            type="Sending"
            sign="-"
            sum="125.00"
            operation="sending"
            showSum="show"
          />
        </Link>
      </div>
    </Page>
  );
}
