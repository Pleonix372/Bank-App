import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";
import Button from "../../component/button";
import BackButton from "../../component/back-button";

export default function Signin() {
  return (
    <Page>
      <div className="form">
        <div className="form__header">
          <BackButton />
          <Title title="Sign in" description="Select login method" />
        </div>

        <div className="form__item">
          <Field name="email" label="Email" placeholder="Ваш E-mail" />
          <span name="email" class="form__error">
            Помилка
          </span>
        </div>

        <div className="form__item">
          <FieldPassword
            name="password"
            label="Password"
            placeholder="Ваш password"
          />
          <span name="email" class="form__error">
            Помилка
          </span>
        </div>

        <p>
          Forgot your password? <a href="/recovery">Restore</a>
        </p>

        <p>
          You have not an account? <a href="/signup">Sign up</a>
        </p>
        <Button className="button--first" href="/balance">
          Continue
        </Button>
        <div className="warning">
          <div className="warning--content">
            <span className="warning--icon"></span>
            <div className="warning--text">
              A user with the same name is not exist
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
