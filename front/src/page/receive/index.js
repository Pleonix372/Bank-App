import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";
import Field from "../../component/field";
import Card from "../../component/card";

import BackButton from "../../svg/back-button.svg";
import Stripe from "../../svg/stripe.svg";
import Coinbase from "../../svg/coinbase.svg";

export default function Receive() {
  return (
    <Page>
      <div className="back__receive">
        <div className="form ">
          <span>
            <Title title="Receive" buttonLeft={BackButton} hidden="hidden" />
          </span>

          <div className="form__item text">
            <p className="text">Receive amount</p>
            <Field name="receive" placeholder="Введіть суму" />
          </div>

          <span className="divider" />
          <div className="card-zone">
            <h2 className="text">Payment system</h2>

            <Card
              logo={Stripe}
              name="Stripe"
              hiddenContent="none"
              hiddenSum="none"
              padding="padding"
            />
            <Card
              logo={Coinbase}
              name="Coinbase"
              hiddenContent="none"
              hiddenSum="none"
              padding="padding"
              paymentReverse="card__payment--group-rev"
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
