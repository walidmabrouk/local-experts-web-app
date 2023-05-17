import React from "react";
import Classnames from 'classnames'
function Inputs({name, label, placeholder, value, type, icon, onChangeHandler, errors}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        className="update-profile-input"
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
}

export default Inputs;
