import "./index.scss";

export const LOAD_STATUS = {
  PROGRESS: "progress",
  SUCCESS: "success",
  ERROR: "error",
};

export function Alert({ message, status = "default" }) {
  return (
    <div className={`warning warning--${status}`}>
      <span className="warning--icon" />
      <div className="warning--text">{message}</div>
    </div>
  );
}

// export function Alert({ message, status = "default" }) {
//   return <div className={`alert alert--${status}`}>{message}</div>;
// }

export function Loader() {
  return <div className="loader"></div>;
}

export function Skeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
    </div>
  );
}
