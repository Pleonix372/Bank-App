import "./index.scss";

export default function Component({
  title,
  description,
  classNameTitle,
  classNameDescription,
  classNameHeading,
}) {
  return (
    <div className={`heading ${classNameHeading}`}>
      <h1 className={`title ${classNameTitle}`}>{title}</h1>
      <p className={`description ${classNameDescription}`}>{description}</p>
    </div>
  );
}
