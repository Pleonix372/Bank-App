import { Link } from "react-router-dom";
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
  return (
    <div className="title-balance">
      <Link to={hrefLeft}>
        <img src={buttonLeft} alt="" className="icon__left" />
      </Link>

      <h1 className={`title-balance__text ${className}`}>{title}</h1>
      <Link to={hrefRight}>
        <img src={buttonRight} alt="" className={`icon__right ${hidden}`} />
      </Link>
    </div>
  );
}
