import "./index.scss";

export default function Component({
  name,
  label,
  onInput,
  type,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        onInput={onInput}
        type={type}
        className="field__input validation"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
