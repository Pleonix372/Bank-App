import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import Button from "../../component/button";
import BackButton from "../../component/back-button";

export default function SignupConfirm() {
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
          <Field name="code" label="Code" placeholder="Ваш Code" />
          <span name="code" class="form__error">
            Невірний код
          </span>
        </div>

        <Button className="button--first" href="/balance">
          Confirm
        </Button>
      </div>
    </Page>
  );
}
