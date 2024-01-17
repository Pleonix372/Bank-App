import { Link } from "react-router-dom";
import "./index.scss";

export default function Component({ onClick, children, className, href }) {
  return (
    <Link to={href}>
      <button onClick={onClick} className={`button ${className}`}>
        {children}
      </button>
    </Link>
  );
}
