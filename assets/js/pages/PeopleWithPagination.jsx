import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Moment from "react-moment";
import {API_ROUTE} from "../config/api";
import Pagination from "../components/Pagination";

const PeoplePageWithPagination = props => {

    const [people, setPeople] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage ] = useState(1);
    const [loading, setLoading ] = useState(true);
    const itemsPerPage = 30;


    useEffect( () => {
        Axios
            .get(API_ROUTE + `/people?page=${currentPage}`)
            .then(response => {
                setPeople(response.data["hydra:member"]);
                setTotalItems(response.data["hydra:totalItems"]);
                setLoading(false);
            })
            .catch(error => console.log(error.response));

    }, [currentPage]);

    const handlePageChange = page => {
        setLoading(true);
        setCurrentPage(page);
    };


    const paginatedPeople = Pagination.getData(
        people,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <h1>People List paginated</h1>

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
                {loading && (
                    <tr>
                        <td>Chargement ...</td>
                    </tr>
                )}
                {!loading && people.map( person =>
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
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />

        </>
    );
};

export default PeoplePageWithPagination;