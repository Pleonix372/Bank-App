import "./index.scss";
import BackButtonSvg from "../../svg/back-button.svg";

class BackButton {
  static back() {
    return window.history.back();
  }
}

window.backButton = BackButton;

export default function Component() {
  return (
    <div class="back-button" onClick={BackButton.back}>
      <img src={BackButtonSvg} alt="<" width="24" height="24" />
    </div>
  );
}
