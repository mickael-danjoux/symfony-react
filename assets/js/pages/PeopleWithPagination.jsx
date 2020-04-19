import React, {useEffect, useState} from 'react';
import Moment from "react-moment";
import Pagination from "../components/Pagination";
import PeopleAPI from "../sevices/PeopleAPI";
import TableHeader from "../components/TableHeader";


const PeoplePageWithPagination = props => {

    const [people, setPeople] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [itemsPerPage, setItemPerPage] = useState(10);
    const [orderRequest, setOrderRequest] = useState([]);

    // get all people with api request
    const fetchPeople = async () => {
        try {
            const data = await PeopleAPI.findAll(currentPage, itemsPerPage, orderRequest);
            setPeople(data["hydra:member"]);
            setTotalItems(data["hydra:totalItems"]);
            setLoading(false);
        } catch (e) {
            console.error(e.message);
        }
    };

    // get people on component loading
    useEffect(() => {
        fetchPeople()
    }, [currentPage, itemsPerPage, orderRequest]);

    // manage page changing
    const handlePageChange = page => {
        setLoading(true);
        setCurrentPage(page);
    };

    // manage item per page
    const handleItemsPerPageChange = event => {
        setCurrentPage(1);
        setItemPerPage(event.currentTarget.value);
    };

    // data paginator not using ajax
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

            <table className="table table-hover dataTable">
                <thead>
                    <TableHeader
                        items={
                            [
                                {title: 'Last Name', sortName: 'lastName'},
                                {title: 'First Name', sortName: 'firstName'},
                                {title: 'Gender', sortName: 'gender'},
                                {title: 'Birth Date', sortName: 'birthDate'}
                            ]
                        }
                        setOrderRequest={setOrderRequest}
                        setCurrentPage={setCurrentPage}
                    />
                </thead>
                <tbody>
                {loading && (
                    <tr>
                        <td>Chargement ...</td>
                    </tr>
                )}
                {!loading && people.map(person =>
                    <tr key={person.id}>
                        <td className="text-center">{person.lastName}</td>
                        <td className="text-center">{person.firstName}</td>
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

            {itemsPerPage < totalItems && (
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