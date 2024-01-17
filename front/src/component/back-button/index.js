import "./index.scss";
import BackButtonSvg from "../../svg/back-button.svg";
import { useNavigate } from "react-router-dom";

// class BackButton {
//   static back() {
//     return window.history.back();
//   }
// }

// window.backButton = BackButton;

export default function Component() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="back-button" onClick={goBack}>
      <img src={BackButtonSvg} alt="<" width="24" height="24" />
    </div>
  );
}
