/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { toPercent } from '../../appUtils'

export function PlayerTable ({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Players',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            Cell: (props) => (
              <div>
                {`${props.row.original.Fname} ${props.row.original.Lname}`}
              </div>
            )
          },
          {
            Header: 'Height',
            accessor: 'height',
            Cell: (props) => (
              <div>
                {`${props.row.original.Height} cm`}
              </div>
            )
          },
          {
            Header: 'Weight',
            accessor: 'weight',
            Cell: (props) => (
              <div>
                {`${props.row.original.Weight} kg`}
              </div>
            )
          },
          {
            Header: 'FG%',
            accessor: 'fg',
            Cell: (props) => (
              <div>
                {toPercent(props.row.original.fg_percentage)}
              </div>
            )
          },
          {
            Header: 'ThreePT%',
            accessor: 'tp',
            Cell: (props) => (
              <div>
                {toPercent(props.row.original.three_pt_percentage)}
              </div>
            )
          },
          {
            Header: 'FT%',
            accessor: 'ft',
            Cell: (props) => (
              <div>
                {toPercent(props.row.original.ft_percentage)}
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

  if (data.length <= 0) return <div>No data</div>
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
