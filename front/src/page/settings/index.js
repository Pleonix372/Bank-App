import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";
import Button from "../../component/button";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";

import BackButton from "../../svg/back-button.svg";

export default function Settings() {
  return (
    <Page>
      <div className="form margin">
        <div>
          <Title title="Settings" buttonLeft={BackButton} hidden="hidden" />
        </div>

        <div className="form__item">
          <h2>Change Email</h2>

          <Field name="email" label="Email" placeholder="Ваш E-mail" />
        </div>

        <div className="form__item">
          <FieldPassword
            name="password"
            label="Old Password"
            placeholder="Ваш password"
          />
          <span name="password" class="form__error">
            Помилка
          </span>
        </div>
        <Button className="button--second" href="/balance">
          Save Email
        </Button>

        <span className="divider" />

        <div className="form__item">
          <h2>Change password</h2>

          <FieldPassword
            name="password"
            label="Old Password"
            placeholder="Ваш password"
          />
          <span name="password" class="form__error">
            Помилка
          </span>
        </div>

        <div className="form__item">
          <FieldPassword
            name="password"
            label="New Password"
            placeholder="Ваш password"
          />
        </div>
        <Button className="button--second">Save Password</Button>

        <span className="divider" />

        <Button className="button--red">Log out</Button>
      </div>
    </Page>
  );
}
