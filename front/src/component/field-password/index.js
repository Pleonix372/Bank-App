import "./index.scss";

class FieldPassword {
  static toggle = (target) => {
    target.toggleAttribute("show");

    const input = target.previousElementSibling;

    const type = input.getAttribute("type");

    if (type === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  };
}

window.fieldPassword = FieldPassword;

export default function Component({
  name,
  label,
  onInput,
  onChange,
  value,
  placeholder,
}) {
  const handleToggle = (event) => {
    FieldPassword.toggle(event.target);
  };

  return (
    <div className="field field--password">
      <label htmlFor={name} className="field__label">
        {label}
      </label>

      <div className="field__wrapper">
        <input
          onInput={onInput}
          onChange={onChange}
          type="password"
          className="field__input validation"
          name={name}
          value={value}
          placeholder={placeholder}
        />
        <span onClick={handleToggle} className="field__icon"></span>
      </div>
    </div>
  );
}
