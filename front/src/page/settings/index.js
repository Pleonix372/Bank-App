import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";
import Button from "../../component/button";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";

import BackButton from "../../svg/back-button.svg";
import {
  saveSession,
  loadSession,
  getTokenSession,
  getSession,
} from "../../script/session";

import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../../script/form";
loadSession();

class SettingsForm extends Form {
  FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
    OLD_PASSWORD: "oldPassword",
    NEW_PASSWORD: "newPassword",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    EMAIL: "Введіть коректне значення e-mail адреси",
    PASSWORD: "",
    OLD_PASSWORD: "",
    NEW_PASSWORD:
      "Новий пароль повинен складатися з не менш ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру",
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

    if (name === this.FIELD_NAME.OLD_PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.OLD_PASSWORD;
      }
    }

    if (name === this.FIELD_NAME.NEW_PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.NEW_PASSWORD;
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
        const res = await fetch("http://localhost:4000/settings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();
        this.setWarning("error", data.message);

        if (res.ok) {
          alert("Відправлено код для підтвердження");
          saveSession(data.session);
        }
      } catch (error) {
        this.setWarning("error", error.message);
      }
    }
  };

  validateAll = (fields) => {
    fields.forEach((name) => {
      const error = this.validate(name, this.value[name]);

      if (error) {
        this.setError(name, error);
      }
    });
  };

  convertData = (fields) => {
    const data = {};

    fields.forEach((name) => {
      data[name] = this.value[name];
    });

    data.token = getTokenSession();

    return JSON.stringify(data);
  };

  checkDisabledForEmail = () => {
    const fields = ["email", "password"];
    const disabled = fields.some(
      (name) => !this.value[name] || !!this.error[name]
    );

    const button = document.querySelector(".email");
    if (button) {
      button.classList.toggle("button--disabled", disabled);
    }
  };

  checkDisabledForPassword = () => {
    const fields = ["oldPassword", "newPassword"];
    const disabled = fields.some(
      (name) => !this.value[name] || !!this.error[name]
    );

    const button = document.querySelector(".password");
    if (button) {
      button.classList.toggle("button--disabled", disabled);
    }
  };
}

export default function Settings() {

  const settingsForm = new SettingsForm();

  const session = getSession();
  const userId = session ? Number(session.user.id) : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    settingsForm.change(name, value);

    if (name === "email" || name === "password") {
      settingsForm.checkDisabledForEmail();
    }
    if (name === "oldPassword" || name === "newPassword") {
      settingsForm.checkDisabledForPassword();
    }
  };

  const createNotification = async (operationType) => {
    try {
      const res = await fetch(
        `http://localhost:4000/notifications/${operationType}?userId=${userId}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error creating notification:", error.message);
    }
  };

  const handleEmailSubmit = async () => {
    settingsForm.validateAll(["email", "password"]);
    try {
      const res = await fetch("http://localhost:4000/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: settingsForm.convertData(["email", "password"]),
      });

      const data = await res.json();
      settingsForm.setWarning("error", data.message);

      if (res.ok) {
        alert("Електронну пошту змінено успішно");

        createNotification("change-email");
      }
    } catch (error) {
      settingsForm.setWarning("error", error.message);
    }
  };

  const handlePasswordSubmit = async () => {
    settingsForm.validateAll(["oldPassword", "newPassword"]);
    try {
      const res = await fetch("http://localhost:4000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: settingsForm.convertData(["oldPassword", "newPassword"]),
      });

      const data = await res.json();
      settingsForm.setWarning("error", data.message);

      if (res.ok) {
        alert("Пароль змінено успішно");

        createNotification("change-password");
      }
    } catch (error) {
      settingsForm.setWarning("error", error.message);
    }
  };

  const handleLogout = () => {
    saveSession(null);
    window.location.href = "/";
  };

  return (
    <Page>
      <div className="form">
        <div>
          <Title title="Settings" buttonLeft={BackButton} hidden="hidden" />
        </div>

        <div className="form__item">
          <h2 className="margin">Change Email</h2>

          <Field
            onInput={handleChange}
            name="email"
            label="Email"
            placeholder="Ваш E-mail"
          />
          <span name="email" className="form__error">
            Помилка
          </span>
        </div>

        <div className="form__item">
          <FieldPassword
            onInput={handleChange}
            name="password"
            label="Old Password"
            placeholder="Ваш password"
          />
          <span name="password" className="form__error">
            Помилка
          </span>
        </div>
        <Button
          onClick={handleEmailSubmit}
          className="button--second email button--disabled"
        >
          Save Email
        </Button>

        <span className="divider" />

        <div className="form__item">
          <h2>Change password</h2>

          <FieldPassword
            onInput={handleChange}
            name="oldPassword"
            label="Old Password"
            placeholder="Ваш password"
          />
          <span name="oldPassword" className="form__error">
            Помилка
          </span>
        </div>

        <div className="form__item">
          <FieldPassword
            onInput={handleChange}
            name="newPassword"
            label="New Password"
            placeholder="Ваш password"
          />
          <span name="newPassword" className="form__error">
            Помилка
          </span>
        </div>
        <Button
          onClick={handlePasswordSubmit}
          className="button--second password button--disabled"
        >
          Save Password
        </Button>

        <div className="warning warning--disabled">
          <span className="warning--icon" />
          <div className="warning--text" />
        </div>

        <span className="divider" />

        <Button onClick={handleLogout} className="button--red">
          Log out
        </Button>
      </div>
    </Page>
  );
}
