import React from 'react';

/**
 *
 * @param name
 * @param label
 * @param value
 * @param onChange
 * @param placeholder
 * @param error
 * @param children
 * @returns {*}
 * @constructor
 */
const SelectField =
    ({
         name,
         label,
         value = "",
         onChange,
         placeholder,
         error = "",
         children

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
                {children}
            </select>
            {error && <p className="invalid-feedback ">{error}</p>}
        </div>
    );
};

export default SelectField;