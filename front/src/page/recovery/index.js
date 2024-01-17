import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import { Form, REG_EXP_EMAIL } from "../../script/form";
import { loadSession } from "../../script/session";

loadSession();

class RecoveryForm extends Form {
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

  submit = async () => {
    if (this.disabled === true) {
      this.validateAll();
    } else {
      // this.setWarning("error");

      try {
        const res = await fetch("http://localhost:4000/recovery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();
        // alert(data.message);
        this.setWarning("error", data.message); // Користувач не існує
        if (res.ok) {
          // this.setWarning("error", data.message);
          alert("Код для відновлення паролю надіслано");
          window.location.assign("/recovery-confirm");
        }
      } catch (error) {
        this.setWarning("error", error.message);
        // alert("Помилка");
      }
    }
  };

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
    });
  };
}

window.recoveryForm = new RecoveryForm();

export default function Recovery() {
  const recoveryForm = new RecoveryForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    recoveryForm.change(name, value);
  };

  const handleSubmit = () => {
    recoveryForm.submit();
  };

  return (
    <Page>
      <div className="form">
        <div className="form__header">
          <BackButton />
          <Title
            title="Recover password"
            description="Choose a recovery method"
          />
        </div>

        <div className="form__item">
          <Field
            name="email"
            label="Email"
            placeholder="Ваш E-mail"
            onInput={handleChange}
          />
          <span name="email" className="form__error" />
        </div>

        <Button
          onClick={handleSubmit}
          className="button--first button--disabled"
          //  href="/recovery-confirm"
        >
          Send code
        </Button>
        <div className="warning warning--disabled">
          <span className="warning--icon" />
          <div className="warning--text" />
        </div>
      </div>
    </Page>
  );
}
