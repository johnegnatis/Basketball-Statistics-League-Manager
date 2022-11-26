/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { useTable } from 'react-table'

export function Table ({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Players',
        columns: [
          {
            Header: 'Name',
            Cell: (props) => (
              <div>
                {`${props.row.original.Fname} ${props.row.original.Lname}`}
              </div>
            )
          },
          {
            Header: 'Height',
            Cell: (props) => (
              <div>
                {`${props.row.original.Height} cm`}
              </div>
            )
          },
          {
            Header: 'Weight',
            Cell: (props) => (
              <div>
                {`${props.row.original.Weight} kg`}
              </div>
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
