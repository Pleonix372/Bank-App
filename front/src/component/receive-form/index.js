import { Fragment, useState } from "react";

import Field from "../field";
import Card from "../card";
import Button from "../button";

import Stripe from "../../svg/stripe.svg";
import Coinbase from "../../svg/coinbase.svg";

import "./index.scss";

export default function Component({ placeholder, button, onSubmit }) {
  const [value, setValue] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleChange = (e) => setValue(e.target.value);

  const handleChoice = (cardName) => {
    setSelectedCard(cardName === selectedCard ? null : cardName);
  };

  const handleSubmit = (value, selectedCard) => {
    if (value.length === 0 || !selectedCard) return null;

    if (onSubmit) {
      onSubmit(value, selectedCard);
    } else {
      throw new Error("onSubmit props is undefined");
    }

    setValue("");
    setSelectedCard(null);
  };

  const isDisabled = value.length === 0;

  return (
    <Fragment>
      <div className="form__item text">
        <p className="text margin">Receive amount</p>
        <Field
          name="receive"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
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
          cursor="pointer"
          choice={selectedCard === "Stripe" ? "choice" : ""}
          onClick={() => handleChoice("Stripe")}
        />
        <Card
          logo={Coinbase}
          name="Coinbase"
          hiddenContent="none"
          hiddenSum="none"
          padding={`padding`}
          paymentReverse="card__payment--group-rev"
          showPayment="show"
          cursor="pointer"
          choice={selectedCard === "Coinbase" ? "choice" : ""}
          onClick={() => handleChoice("Coinbase")}
        />
        <Button
          disabled={isDisabled || !selectedCard}
          onClick={() => handleSubmit(value, selectedCard)}
          className="button--first"
        >
          {button}
        </Button>
      </div>
    </Fragment>
  );
}
