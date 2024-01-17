import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";
import Field from "../../component/field";
import Card from "../../component/card";
import Button from "../../component/button";

import BackButton from "../../svg/back-button.svg";
import Stripe from "../../svg/stripe.svg";
import Coinbase from "../../svg/coinbase.svg";
import { useState } from "react";

export default function Receive() {
  const [amount, setAmount] = useState("");
  const [selectedPaymentSystem, setSelectedPaymentSystem] = useState(null);

  const handleCardClick = (paymentSystem) => {
    setSelectedPaymentSystem(paymentSystem);
  };

  // const handleAmountChange = (event) => {
  //   setAmount(event.target.value);
  // };

  // const handlePaymentSystemSelect = (system) => {
  //   setSelectedPaymentSystem(system === selectedPaymentSystem ? null : system);
  // };

  const handlePaymentSubmit = () => {
    if (!amount || !selectedPaymentSystem) {
      console.error("Amount and payment system are required");
    }

    console.log("Creating payment:", amount, selectedPaymentSystem);

    setAmount("");
    setSelectedPaymentSystem(null);
  };

  return (
    <Page>
      <div className="back__receive">
        <div className="form ">
          <span>
            <Title title="Receive" buttonLeft={BackButton} hidden="hidden" />
          </span>

          <div className="form__item text">
            <p className="text">Receive amount</p>
            <Field
              name="receive"
              placeholder="Введіть суму"
              value={amount}
              // onChange={handleAmountChange}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <span className="divider" />
          <div className="card-zone">
            <h2 className="text">Payment system</h2>

            <Card
              logo={Stripe}
              name="Stripe"
              hiddenContent="none"
              hiddenSum="none"
              padding={`padding`}
              showPayment="show"
              // onClick={() => handlePaymentSystemSelect("Stripe")}
              onClick={() => handleCardClick("Stripe")}
              className={selectedPaymentSystem === "Stripe" ? "selected" : ""}
            />
            <Card
              logo={Coinbase}
              name="Coinbase"
              hiddenContent="none"
              hiddenSum="none"
              padding={`padding`}
              paymentReverse="card__payment--group-rev"
              showPayment="show"
              // onClick={() => handlePaymentSystemSelect("Coinbase")}
              onClick={() => handleCardClick("Coinbase")}
              className={selectedPaymentSystem === "Coinbase" ? "selected" : ""}
            />
            <div className="button" onClick={handlePaymentSubmit}>
              Submit Payment
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
