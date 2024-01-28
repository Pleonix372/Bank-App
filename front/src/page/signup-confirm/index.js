import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import { Form } from "../../script/form";
import {
  loadSession,
  getTokenSession,
  saveSession,
  getSession,
} from "../../script/session";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
loadSession();

class SignupConfirmForm extends Form {
  FIELD_NAME = {
    CODE: "code",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
  };

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG;
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
        const res = await fetch("http://localhost:4000/signup-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();
        this.setWarning("error", data.message);

        if (res.ok) {
          alert("Код успішно підтверджено. Користувача зареєстровано");
          saveSession(data.session);
          window.location.assign("/balance");
        }
      } catch (error) {
        this.setWarning("error", error.message);
      }
    }
  };

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
      token: getTokenSession(),
    });
  };
}

window.signupConfirmForm = new SignupConfirmForm();

export default function SignupConfirm() {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();

    try {
      if (session) {
        if (session.user.isConfirm) {
          navigate("/balance");
        }
      } else {
        navigate("/");
      }
    } catch (err) {}
  }, [navigate]);

  const signupConfirmForm = new SignupConfirmForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    signupConfirmForm.change(name, value);
  };

  const handleSubmit = () => {
    signupConfirmForm.submit();
  };

  return (
    <Page>
      <div className="form">
        <div className="form__header">
          <BackButton />
          <Title
            title="Confirm account"
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

        <Button
          onClick={handleSubmit}
          className="button--first button--disabled"
        >
          Confirm
        </Button>
        <div className="warning warning--disabled">
          <span className="warning--icon" />
          <div className="warning--text" />
        </div>
      </div>
    </Page>
  );
}
