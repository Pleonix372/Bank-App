import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

export default function Component({
  className,
  title,
  buttonLeft,
  buttonRight,
  hrefLeft,
  hrefRight,
  hidden,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (hrefLeft) {
      navigate(hrefLeft);
    } else {
      // window.history.back();
      navigate(-1);
    }
  };

  return (
    <div className="title-balance">
      {/* <Link to={hrefLeft}> */}
      <div onClick={handleBack}>
        <img src={buttonLeft} alt="" className="icon__left" />
      </div>
      {/* </Link> */}

      <h1 className={`title-balance__text ${className}`}>{title}</h1>
      <Link to={hrefRight}>
        <img src={buttonRight} alt="" className={`icon__right ${hidden}`} />
      </Link>
    </div>
  );
}
