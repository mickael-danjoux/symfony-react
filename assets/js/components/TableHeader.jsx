import React from 'react';

/**
 * Create Table Header for dataTable sorting
 * @param items
 * @param setOrderRequest
 * @param setCurrentPage
 * @returns {*}
 * @constructor
 */
const TableHeader = ( { items, setOrderRequest, setCurrentPage }) => {

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
        <tr>
            { items.map( item => (
                <th
                    key={item.sortName}
                    className="text-center sorting"
                    onClick={(evt) => handleSort(evt,item.sortName)}
                >
                    {item.title}

                </th>
            ))

            }
        </tr>
    );
}

export default TableHeader;