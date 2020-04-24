import React from 'react';
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DatePickerField =
    ({
         name,
         label,
         value,
         onChange,
         placeholder,
         error = ""
     }) => {
        return (
            <div className="form-group">
                <div>
                    <label htmlFor={name}>{label}</label>
                </div>
                <DatePicker
                    selected={value}
                    onChange={onChange}
                    className={"form-control" + (error && " is-invalid")}
                    id={name}
                    placeholderText={placeholder}
                    showMonthDropdown
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={99}
                    maxDate={new Date()}

                />
                <div>
                    {error && <p className="invalid-feedback d-block">{error}</p>}

                </div>
            </div>
        );
    };

export default DatePickerField;