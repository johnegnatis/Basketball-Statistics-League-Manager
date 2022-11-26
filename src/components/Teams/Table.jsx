/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { useTable } from 'react-table'

import { Link } from 'react-router-dom'
import { NAV } from '../../appConstants'

import EditIcon from '../../images/edit.svg'

export function Table ({ data, editTeamName }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Team',
        columns: [
          {
            Header: 'Name',
            accessor: 'Name',
            Cell: (props) => (
                    <div>
                      <Link className='table-link' to={NAV.getSingleTeamRoute(props.row.original.Name)}>
                          {(props.row.original.Name) ? props.row.original.Name : 'error'}
                      </Link>
                    </div>
            )
          },
          {
            Header: 'Trophies',
            accessor: 'No_trophy',
            Cell: (props) => (
                    <span>
                      {props.row.original.No_trophy}
                      <img src={EditIcon} alt="edit" height="20" onClick={() =>
                        editTeamName(props.row.original.Name)}/>
                    </span>
            )
          },
          {
            Header: "Coach's Name",
            accessor: 'Coach_name',
            Cell: (props) => (
                  <span>
                    {props.row.original.Coach_name}
                    <img src={EditIcon} alt="edit" height="20"
                    onClick={() => editTeamName(props.row.original.Name)}/>
                  </span>
            )
          }
        ]
      }
    ], [])

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  })

  return (
        <table className="team-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
  )
}
