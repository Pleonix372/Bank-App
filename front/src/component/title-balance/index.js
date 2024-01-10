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
      <a href={hrefLeft}>
        <img src={buttonLeft} alt="" className="icon__left" />
      </a>
      <h1 className={`title-balance__text ${className}`}>{title}</h1>
      <a href={hrefRight}>
        <img src={buttonRight} alt="" className={`icon__right ${hidden}`} />
      </a>
    </div>
  );
}
