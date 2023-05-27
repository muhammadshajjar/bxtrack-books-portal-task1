import React from "react";
import styles from "./InputField.module.css";
const InputField = ({
  label,
  type,
  placeHolder,
  value,
  hasError,
  valueChangeHandler,
  inputBlurHandler,
  errorMessage,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        placeholder={placeHolder}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        value={value}
      />
      {hasError && <p className={styles.feedBackTxt}>{errorMessage}</p>}
    </div>
  );
};

export default InputField;
