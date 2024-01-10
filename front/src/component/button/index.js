import "./index.scss";

export default function Component({ onClick, children, className, href }) {
  return (
    <a href={href}>
      <button onClick={onClick} className={`button ${className}`}>
        {children}
      </button>
    </a>
  );
}
