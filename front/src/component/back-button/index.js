import "./index.scss";
import BackButtonSvg from "../../svg/back-button.svg";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    alert("hello");
    navigate(-1);
  };

  return (
    <div className="back-button" onClick={goBack}>
      <img src={BackButtonSvg} alt="<" width="24" height="24" />
    </div>
  );
}
