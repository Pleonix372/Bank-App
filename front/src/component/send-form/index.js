import { Fragment, useState } from "react";

import Field from "../field";
import Button from "../button";
import { Form, REG_EXP_EMAIL } from "../../script/form";

import "./index.scss";

class SendForm extends Form {
  FIELD_NAME = {
    EMAIL: "email",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    EMAIL: "Введіть коректне значення e-mail адреси",
  };

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG;
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
    }

    return undefined;
  };

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
    });
  };
}

export default function Component({
  placeholderEmail,
  placeholderSum,
  button,
  onSubmit,
}) {
  const [email, setEmail] = useState("");
  const [sum, setSum] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeSum = (e) => setSum(e.target.value);

  const handleSubmit = (email, sum) => {
    if (email.length === 0 || sum.length === 0) return null;

    if (onSubmit) {
      onSubmit(email, sum);
    } else {
      throw new Error("onSubmit props is undefined");
    }

    setEmail("");
    setSum("");
  };

  const isDisabled = email.length === 0 || sum.length === 0;

  const sendForm = new SendForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    sendForm.change(name, value);
  };

  return (
    <Fragment>
      <div className="form__item ">
        <Field
          onInput={handleChange}
          name="email"
          label="Email"
          placeholder={placeholderEmail}
          onChange={handleChangeEmail}
        />
        <span name="email" className="form__error" />
      </div>

      <div className="form__item">
        <Field
          name="sum"
          label="Sum"
          placeholder={placeholderSum}
          onChange={handleChangeSum}
        />
      </div>

      <Button
        disabled={isDisabled}
        className="button--first"
        onClick={() => handleSubmit(email, sum)}
      >
        {button}
      </Button>
    </Fragment>
  );
}
