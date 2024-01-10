import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";
import Card from "../../component/card";
import BackButton from "../../svg/back-button.svg";
import Warning from "../../svg/warning.svg";
import Annoucement from "../../svg/announcement.svg";

export default function Notifications() {
  return (
    <Page>
      <div className="back">
        <Title title="Notifications" buttonLeft={BackButton} hidden="hidden" />

        <div className="card-zone">
          <Card
            logo={Annoucement}
            name="New reward system"
            time="10 min ago"
            type="Annoucement"
            hiddenSum="none"
            hiddenPayment="none"
            padding="padding"
          />
          <Card
            logo={Warning}
            name="New login"
            time="10 min ago"
            type="Warning"
            hiddenSum="none"
            hiddenPayment="none"
            padding="padding"
          />
          <Card
            logo={Annoucement}
            name="New reward system"
            time="10 min ago"
            type="Annoucement"
            hiddenSum="none"
            hiddenPayment="none"
            padding="padding"
          />
        </div>
      </div>
    </Page>
  );
}
