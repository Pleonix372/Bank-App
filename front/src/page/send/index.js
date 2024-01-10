import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";
import Button from "../../component/button";
import Field from "../../component/field";

import BackButton from "../../svg/back-button.svg";

export default function Send() {
  return (
    <Page>
      <div className="">
        <div className="form back">
          <Title title="Send" buttonLeft={BackButton} hidden="hidden" />

          <div className="form__item">
            <Field name="email" label="Email" placeholder="Ваш E-mail" />
          </div>

          <div className="form__item">
            <Field name="sum" label="Sum" placeholder="Введіть суму" />
          </div>

          <Button className="button--first">Send</Button>
        </div>
      </div>
    </Page>
  );
}
