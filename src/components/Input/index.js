import React, { useState } from "react";

const Input = ({ label, state, setState, type = "text", placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-wrapper" style={{ marginBottom: "16px" }}>
      <label className="input-label" style={{ display: "block", marginBottom: "4px" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={inputType}
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={placeholder}
          className="input-field"
          style={{
            width: "96%",
            padding: "10px",
            paddingRight: isPasswordField ? "40px" : "10px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        {isPasswordField && (
          <span
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "" : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
