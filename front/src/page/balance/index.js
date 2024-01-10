import "./index.scss";

import Page from "../../component/page";
import Card from "../../component/card";
import Title from "../../component/title-balance";
import Settings from "../../svg/settings.svg";
import Notifications from "../../svg/notifications.svg";
import Stripe from "../../svg/stripe.svg";
import Coinbase from "../../svg/coinbase.svg";
import User from "../../svg/user.svg";

export default function Balance() {
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
                <a href="/send">
                  <span className="icon__send" />
                </a>
              </div>
            </div>
            <p className="button-operations__text">Send</p>
          </div>
        </div>
      </div>

      <div className="card__block">
        <a className="balance__link" href="/transaction/:231">
          <Card
            logo={Stripe}
            name="Stripe"
            time="12:25"
            type="Receipt"
            sign="+"
            sum="125.00"
            hiddenPayment="none"
          />
        </a>

        <a className="balance__link" href="/transaction/:231">
          <Card
            logo={Coinbase}
            name="Coinbase"
            time="12:25"
            type="Receipt"
            sign="+"
            sum="125.00"
            hiddenPayment="none"
          />
        </a>

        <a className="balance__link" href="/transaction/:231">
          <Card
            logo={User}
            name="Oleg V."
            time="12:25"
            type="Receipt"
            sign="+"
            sum="125.00"
            hiddenPayment="none"
          />
        </a>
      </div>
    </Page>
  );
}
