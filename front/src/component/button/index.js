import { Link } from "react-router-dom";
import "./index.scss";

export default function Component({
  disabled,
  onClick,
  children,
  className,
  href,
}) {
  return (
    <Link to={href}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`button ${className}`}
      >
        {children}
      </button>
    </Link>
  );
}
