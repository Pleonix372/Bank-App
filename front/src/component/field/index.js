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
    <div class="field">
      <label for={name} class="field__label">
        {label}
      </label>
      <input
        // onInput={{ action }`(this.name, this.value)`}
        onInput={onInput}
        // onInput={(event) => Field.handleInput(event, onInput)}
        type={type}
        class="field__input validation"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
