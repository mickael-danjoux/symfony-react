import React from 'react';

const SelectField =
    ({
         name,
         label,
         value = "",
         onChange,
         placeholder,
         error = ""

       }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                className={"form-control" + (error && " is-invalid")}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            >
                <option value="">Choose your gender</option>
                <option value="1">Male</option>
                <option  value="2">Female</option>
            </select>
            {error && <p className="invalid-feedback ">{error}</p>}
        </div>
    );
};

export default SelectField;