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

  // static handleInput = (event) => {
  //   const { name, value } = event.target;
  //   console.log(name, value);
  // };
}

window.fieldPassword = FieldPassword;

export default function Component({
  name,
  label,
  onInput,
  // action,
  value,
  placeholder,
}) {
  const handleToggle = (event) => {
    FieldPassword.toggle(event.target);
  };

  return (
    <div class="field field--password">
      <label for={name} class="field__label">
        {label}
      </label>

      <div class="field__wrapper">
        <input
          // onInput={`${action}(this.name, this.value)`}
          onInput={onInput}
          // onInput={FieldPassword.handleInput}
          type="password"
          class="field__input validation"
          name={name}
          value={value}
          placeholder={placeholder}
        />
        <span onClick={handleToggle} class="field__icon"></span>
      </div>
    </div>
  );
}
