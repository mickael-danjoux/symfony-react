import React, {useEffect, useState} from 'react';
import Moment from "react-moment";
import Pagination from "../components/Pagination";
import PeopleAPI from "../sevices/PeopleAPI";


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

    // data paginator
    const paginatedPeople = Pagination.getData(
        people,
        currentPage,
        itemsPerPage
    );




     function handleSort(event,name){
         let order = 'asc'

        let canDoAction = true;
         const elements = document.querySelectorAll('table.dataTable thead tr th:not(:last-child)')
         elements.forEach(element=>{
             if( event.target !== element){
                 element.classList.remove('sorting_asc')
                 element.classList.remove('sorting_desc')
                 element.classList.add('sorting')
             }
         })
         if( canDoAction && event.target.classList.contains('sorting') ){
             event.target.classList.remove('sorting')
             event.target.classList.add('sorting_asc')
             canDoAction = false
         }

         if( canDoAction && event.target.classList.contains('sorting_asc') ){
             event.target.classList.remove('sorting_asc')
             event.target.classList.add('sorting_desc')
             order = 'desc'
             canDoAction = false
         }

         if( canDoAction &&event.target.classList.contains('sorting_desc') ){
             event.target.classList.remove('sorting_desc')
             event.target.classList.add('sorting_asc')
             order = 'asc'
             canDoAction = false
         }

        setOrderRequest([{name:name,sort:order}])
        setCurrentPage(1);

    }

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
                <tr>
                    <th className="text-center sorting" onClick={(evt) => handleSort(evt,'lastName')} >Last Name</th>
                    <th className="text-center sorting" onClick={(evt) => handleSort(evt,'firstName')}>First Name</th>
                    <th className="text-center sorting" onClick={(evt) => handleSort(evt,'gender')}>Gender</th>
                    <th className="text-center sorting" onClick={(evt) => handleSort(evt,'birthDate')}>Birth Date</th>
                    <th/>
                </tr>
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