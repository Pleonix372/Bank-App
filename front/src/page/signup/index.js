import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../../script/form";

class SignupForm extends Form {
  FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    EMAIL: "Введіть коректне значення e-mail адреси",
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

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
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
        const res = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();
        alert(data.message);
        // if (res.ok) {
        //   this.setWarning("error");
        // }
      } catch (error) {
        // this.setWarning("error");
        alert("Помилка");
      }
    }
  };

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
    });
  };
}

window.signupForm = new SignupForm();

export default function Singup() {
  const signupForm = new SignupForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    signupForm.change(name, value);
  };

  const handleSubmit = () => {
    signupForm.submit();
  };

  return (
    <Page>
      <div className="form">
        <div className="form__header">
          <BackButton />
          <Title title="Sign up" description="Choose a registration method" />
        </div>

        <div className="form__item">
          <Field
            onInput={handleChange}
            type="email"
            name="email"
            label="Email"
            placeholder="Ваш E-mail"
          />
          <span name="email" class="form__error">
            Помилка
          </span>
        </div>

        <div className="form__item">
          <FieldPassword
            onInput={handleChange}
            name="password"
            label="Password"
            placeholder="Ваш password"
          />
          <span name="password" class="form__error">
            Помилка
          </span>
        </div>

        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>

        <Button
          onClick={handleSubmit}
          className="button--first button--disabled"
          // href="/signup-confirm"
        >
          Continue
        </Button>
        <div className="warning warning--disabled">
          {/* <div className="warning--content"> */}
          <span className="warning--icon"></span>
          <div className="warning--text">
            {/* A user with the same name is already exist */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </Page>
  );
}
