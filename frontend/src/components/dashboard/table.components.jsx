import React, { useState } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";
 
import ScrollComponent from "./scrroll.component";
import { SortDownIcon, SortIcon, SortUpIcon } from "../../utils/shared/Icons";

 



function TableV2({ columns, data, update,deleteRow, setLogs ,search,setSearch }) {
    // Use the state and functions returned from useTable to build your UI

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { sortBy }
    } = useTable(
        {
            columns,
            data
        },
        useSortBy
    );

 


 

    // Render the UI for your table
    return (
        
        <ScrollComponent  loadData= {update}  > 
            <div className="mt-4 flex flex-col">
                <div className="" style={{
                    overflow:'scroll'
                }}>
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 no-padding">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                // Add the sorting props to control sorting. For this example
                                                // we can add them into the header props
                                                <th
                                                    scope="col"
                                                    className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        {column.render('Header')}
                                                        {/* Add a sort direction indicator */}
                                                 
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                    : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                : (
                                                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                )}
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                               

                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white divide-y divide-gray-200"
                                >
                                    {rows.map((row,i) => {  // new
                                        prepareRow(row)
                                        return (
                                            <tr   {...row.getRowProps()}  key={`${i}`}>
                                                {row.cells.map(cell => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                            role="cell"
                                                            onClick={e=>{
                                                               if (cell.column.Header === 'Delete') {
                                                                 deleteRow(cell.value)
                                                               }
                                                            }}
                                                        >
                                                            {cell.column.Cell.name === "defaultRenderer"
                                                                ? <div className="text-sm text-gray-500">{cell.render('Cell')}</div>
                                                                : cell.render('Cell')
                                                            }
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                             
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </ScrollComponent>

     );
}
export default TableV2;