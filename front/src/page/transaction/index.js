import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";

import BackButton from "../../svg/back-button.svg";

export default function Transaction() {
  return (
    <Page>
      <div className="back">
        <Title title="Notifications" buttonLeft={BackButton} hidden="hidden" />

        <div className="balance balance--green">$100.20</div>

        <div className="data-block">
          <div className="data-block__card">
            <div className="data-block__content">
              <span>Date</span>
              <span>25 May, 15:20</span>
            </div>
          </div>
          <div className="data-block__card">
            <div className="data-block__content">
              <span>Address</span>
              <span>user123@mail.com</span>
            </div>
          </div>
          <div className="data-block__card">
            <div className="data-block__content">
              <span>Type</span>
              <span>Receive</span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
