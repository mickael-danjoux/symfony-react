import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Moment from "react-moment";
import {API_ROUTE} from "../config/api";
import Pagination from "../components/Pagination";

const PeoplePage = props => {

    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage ] = useState(1);

    useEffect( () => {
        Axios
            .get(API_ROUTE + '/people')
            .then(response => response.data["hydra:member"])
            .then(data => setPeople(data))
            .catch(error => console.log(error.response));

    }, []);

    const handlePageChange = page => {
        setCurrentPage(page);
    };


    const itemsPerPage = 8;
    const paginatedPeople = Pagination.getData(
        people,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <h1>People List</h1>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="text-center">Name</th>
                    <th className="text-center">Gender</th>
                    <th className="text-center">Birth Date</th>
                    <th/>
                </tr>
                </thead>
                <tbody>


                {paginatedPeople.map( person =>
                    <tr key={person.id}>
                        <td className="text-center">{ person.lastName } { person.firstName }</td>
                        <td className="text-center">
                            {person.gender ? 'M' : 'F'}
                        </td>
                        <td className="text-center"><Moment format="DD/MM/YYYY">
                            {person.birthDate}
                        </Moment></td>
                        <td>
                            <button className="btn btn-sm btn-danger">Supprimer</button>
                        </td>


                    </tr>
                )}

                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={people.length} onPageChanged={handlePageChange} />

        </>
    );
};

export default PeoplePage;