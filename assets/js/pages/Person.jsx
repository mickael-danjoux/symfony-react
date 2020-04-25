import React, {useState, useEffect} from 'react';
import Field from "../components/forms/Fields";
import {Link} from "react-router-dom";
import DatePickerField from "../components/forms/DatePickerField";
import SelectField from "../components/forms/SelectField";
import DefaultAPI from "../sevices/DefaultAPI";

// import fr from "date-fns/locale/fr"; // the locale you want
// registerLocale("fr", fr); // register it with the name you want


const PersonPage = ({match, history}) => {

    const {id = "new"} = match.params;
    const [person, setPerson] = useState({
        lastName: "",
        firstName: "",
        gender: 0,
        birthDate: null
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        gender: "",
        birthDate: ""
    })

    const [editing, setEditing] = useState(false);

    const fetchPerson = async id => {
        try {
            const {lastName, firstName, gender, birthDate} = await DefaultAPI.findOne('people', id);
            setPerson({firstName, lastName, gender, birthDate: new Date(birthDate)});
        } catch (e) {
            console.log(e.response)
            //TODO : Flash error notification
            history.replace("/people")
        }
    }


    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchPerson(id);
        }
    }, [id]);


    const handleChange = ({currentTarget}) => {
        let {name, value} = currentTarget;
        if (name === 'gender') value = parseInt(value)
        setPerson({...person, [name]: value});
    }


    const handleDateChange = date => {
        setPerson({...person, ['birthDate']: date})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(person)
        try {
            if ( editing ) {
                await DefaultAPI.put('people', id, person);
                //TODO : flash success notification
            } else {
                await DefaultAPI.post('people', person);
                //TODO : flash success notification
                history.replace("/people");
            }
            setErrors({});
        } catch ({ response }) {
            const { violations } = response.data;
            if ( violations ) {
                const apiErrors = {};
                violations.forEach( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                })
                setErrors(apiErrors);

                //TODO : flash errors notification
            }
        }
    }

    return (
        <>
            {!editing && <h1>Create a person</h1> || <h1>Editing a person</h1>}


            <form>
                <Field
                    name="lastName"
                    label="Last name"
                    placeholder="Enter your last name"
                    value={person.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />

                <Field
                    name="firstName"
                    label="First name"
                    placeholder="Enter your first name"
                    value={person.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />

                <SelectField
                    name="gender"
                    label="Gender"
                    placeholder="Choose your gender"
                    value={person.gender}
                    onChange={handleChange}
                    error={errors.gender}
                />

                <DatePickerField
                    name="birthDate"
                    label="Birth date"
                    value={person.birthDate}
                    onChange={handleDateChange}
                    placeholder={"Choose your birth date"}
                    error={errors.birthDate}
                />


                <div className="form-group">
                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>save</button>
                    <Link to="/people" className="btn btn-link">Back to list</Link>
                </div>


            </form>
        </>);
};

export default PersonPage;