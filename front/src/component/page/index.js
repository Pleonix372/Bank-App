import "./index.scss";

export default function Component({ children, classname }) {
  return <div className={`page ${classname}`}>{children}</div>;
}
