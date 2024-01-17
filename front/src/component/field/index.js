import "./index.scss";

// class Field {
//   static handleInput = (event, onInput) => {
//     const { name, value } = event.target;
//     console.log(name, value);
//     if (onInput) {
//       onInput(name, value);
//     }
//   };
// }

export default function Component({
  name,
  label,
  // action,
  onInput,
  type,
  placeholder,
}) {
  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        // onInput={{ action }`(this.name, this.value)`}
        onInput={onInput}
        // onInput={(event) => Field.handleInput(event, onInput)}
        type={type}
        className="field__input validation"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
