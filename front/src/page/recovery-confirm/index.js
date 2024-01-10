import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";
import Button from "../../component/button";
import BackButton from "../../component/back-button";

export default function RecoveryConfirm() {
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
          <Field name="code" label="Code" placeholder="Ваш Code" />
          <span name="code" class="form__error">
            Невірний код
          </span>
        </div>

        <div className="form__item">
          <FieldPassword
            name="password"
            label="New password"
            placeholder="Ваш password"
          />
          <span name="email" class="form__error">
            Занадто легкий
          </span>
        </div>

        <Button className="button--first" href="/balance">
          Restore password
        </Button>
      </div>
    </Page>
  );
}
