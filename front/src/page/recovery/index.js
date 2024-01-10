import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title";
import Field from "../../component/field";
import Button from "../../component/button";
import BackButton from "../../component/back-button";

export default function Recovery() {
  return (
    <Page>
      <div className="form">
        <div className="form__header">
          <BackButton />
          <Title
            title="Recovery password"
            description="Choose a recovery method"
          />
        </div>

        <div className="form__item">
          <Field name="email" label="Email" placeholder="Ваш E-mail" />
          <span name="email" class="form__error">
            A user with the same email is not exist
          </span>
        </div>

        <Button className="button--first" href="/recovery-confirm">
          Send code
        </Button>
      </div>
    </Page>
  );
}
