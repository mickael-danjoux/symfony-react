import React from 'react';

/**
 *
 * @param name
 * @param label
 * @param value
 * @param onChange
 * @param placeholder
 * @param type
 * @param error
 * @returns {*}
 * @constructor
 */
const InputField = ({

         name,
         label,
         value,
         onChange,
         placeholder,
         type = "text",
         error = ""

     }) => (

        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                className={"form-control" + (error && " is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>

    );


export default InputField;