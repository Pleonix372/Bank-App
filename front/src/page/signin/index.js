import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import { Form, REG_EXP_EMAIL } from "../../script/form";
import { Link, useNavigate } from "react-router-dom";
import { saveSession } from "../../script/session";
import { loadSession } from "../../script/session";
import { useEffect } from "react";

loadSession();

class SigninForm extends Form {
  FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
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
      console.log(this.value);

      this.setWarning("error");

      try {
        const res = await fetch("http://localhost:4000/signin", {
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
          alert("Ви увійшли в акаунт");
          saveSession(data.session);
          window.location.assign("/balance");
        }
      } catch (error) {
        this.setWarning("error", error.message);
        // alert(error.message);
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

export default function Signin() {
  const navigate = useNavigate();

  useEffect(() => {
    const session = loadSession();

    try {
      if (session) {
        if (session.user.isConfirm) {
          navigate("/balance");
        } else {
          navigate("/balance");
        }
      }
    } catch (err) {}
  }, [navigate]);

  const signinForm = new SigninForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    signinForm.change(name, value);
  };

  const handleSubmit = () => {
    signinForm.submit();
  };

  return (
    <Page>
      <div className="form">
        <div className="form__header">
          <BackButton />
          <Title title="Sign in" description="Select login method" />
        </div>

        <div className="form__item">
          <Field
            onInput={handleChange}
            name="email"
            label="Email"
            placeholder="Ваш E-mail"
          />
          <span name="email" className="form__error" />
        </div>

        <div className="form__item">
          <FieldPassword
            onInput={handleChange}
            name="password"
            label="Password"
            placeholder="Ваш password"
          />
          <span name="password" className="form__error" />
        </div>

        <p>
          Forgot your password? <Link to="/recovery">Restore</Link>
        </p>

        <p>
          You have not an account? <Link to="/signup">Sign up</Link>
        </p>
        <Button
          onClick={handleSubmit}
          className="button--first button--disabled"
          //  href="/balance"
        >
          Continue
        </Button>
        <div className="warning warning--disabled">
          <div className="warning--content">
            <span className="warning--icon" />
            <div className="warning--text" />
          </div>
        </div>
      </div>
    </Page>
  );
}
