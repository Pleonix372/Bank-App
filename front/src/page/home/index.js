import "./index.scss";

import Title from "../../component/title";
import Money from "../../png/money.png";
import Button from "../../component/button";
import Page from "../../component/page";

// document.addEventListener("DOMContentLoaded", () => {
  // if (window.session) {
  //   const { user } = window.session;
  //   if (user.isConfirm) {
  //     window.location.assign("/balance");
  //   } else {
  //     window.location.assign("/signup-confirm");
  //   }
  // }
  // else {
  //   window.location.assign("/");
  // }
// });

export default function Home() {
  return (
    <Page>
      <div className="main-home">
        <Title
          title="Hello!"
          description="Welcome to bank app"
          classNameTitle="title--home"
          classNameDescription="description--home"
          classNameHeading="heading--home"
        />
        <img src={Money} alt="money" className="money" />
        <div className="button_block">
          <Button className="button--first" href="/signup">
            Sign Up
          </Button>

          <Button className="button--second" href="/signin">
            Sign In
          </Button>
        </div>
      </div>
    </Page>
  );
}
