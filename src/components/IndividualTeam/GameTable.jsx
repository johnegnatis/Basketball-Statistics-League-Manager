/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { useTable } from 'react-table'

export function GameTable ({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Games',
        columns: [
          {
            Header: 'Result',
            Cell: (props) => (
              <div className='table-width'>
                {(props.row.original.points_for > props.row.original.points_against) ? 'Win' : 'Loss'}
              </div>
            )
          },
          {
            Header: 'Opponent',
            Cell: (props) => (
              <div className='table-width'>
                {props.row.original.opponent}
              </div>
            )
          },
          {
            Header: 'PF',
            Cell: (props) => (
              <div className='table-width'>
                {props.row.original.points_for}
              </div>
            )
          },
          {
            Header: 'PA',
            Cell: (props) => (
              <div>
                {props.row.original.points_against}
              </div>
            )
          },
          {
            Header: 'Game Date',
            accessor: 'Game_date'
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

  if (!data || data.length <= 0) return <div>No data</div>
  return (
    <table className="team-table"
      {...getTableProps()}>
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
