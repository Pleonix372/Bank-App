import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import { Form, REG_EXP_PASSWORD } from "../../script/form";
import { loadSession } from "../../script/session";

loadSession();

class RecoveryConfirmForm extends Form {
  FIELD_NAME = {
    CODE: "code",
    PASSWORD: "password",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    PASSWORD:
      "Пароль повинен складатися з не менш ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру",
  };

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG;
    }

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD;
      }
    }

    return undefined;
  };

  submit = async () => {
    if (this.disabled === true) {
      this.validateAll();
    } else {
      console.log(this.value);

      this.setWarning("error");

      try {
        const res = await fetch("http://localhost:4000/recovery-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();
        // alert(data.message);
        this.setWarning("error", data.message);

        if (res.ok) {
          // this.setWarning("error", data.message);
          alert("Пароль успішно змінено");
        }
      } catch (error) {
        this.setWarning("error", error.message);
        // alert(error.message);
      }
    }
  };

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
      [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
    });
  };
}

window.recoveryConfirmForm = new RecoveryConfirmForm();

export default function RecoveryConfirm() {
  const recoveryConfirmForm = new RecoveryConfirmForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    recoveryConfirmForm.change(name, value);
  };

  const handleSubmit = () => {
    recoveryConfirmForm.submit();
  };

  return (
    <Page>
      <div className="form">
        <div className="form__header">
          <BackButton />
          <Title
            title="Recover password"
            description="Write the code you received"
          />
        </div>

        <div className="form__item">
          <Field
            onInput={handleChange}
            name="code"
            label="Code"
            placeholder="Ваш Code"
          />
          <span name="code" className="form__error" />
        </div>

        <div className="form__item">
          <FieldPassword
            onInput={handleChange}
            name="password"
            label="New password"
            placeholder="Ваш password"
          />
          <span name="password" className="form__error" />
        </div>

        <Button
          onClick={handleSubmit}
          className="button--first button--disabled"
          //  href="/balance"
        >
          Restore password
        </Button>
        <div className="warning warning--disabled">
          <span className="warning--icon" />
          <div className="warning--text" />
        </div>
      </div>
    </Page>
  );
}
