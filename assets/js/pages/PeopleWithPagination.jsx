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
    const [itemsPerPage, setItemPerPage ] = useState(10);



    useEffect( () => {
        Axios
            .get(API_ROUTE + `/people?page=${currentPage}&&itemsPerPage=${itemsPerPage}`)
            .then(response => {
                setPeople(response.data["hydra:member"]);
                setTotalItems(response.data["hydra:totalItems"]);
                setLoading(false);
            })
            .catch(error => console.log(error.response));

    }, [currentPage, itemsPerPage]);

    const handlePageChange = page => {
        setLoading(true);
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = event => {
        setCurrentPage(1);
        setItemPerPage(event.currentTarget.value);
    };


    const paginatedPeople = Pagination.getData(
        people,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <h1>People List paginated</h1>
            <div className="col-2">
                <span>Elements par page :</span>
                    <select className="form-control" onChange={handleItemsPerPageChange} value={itemsPerPage}>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>
            </div>

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

            { itemsPerPage < totalItems && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={totalItems}
                    onPageChanged={handlePageChange}
                />
            )}


        </>
    );
};

export default PeoplePageWithPagination;