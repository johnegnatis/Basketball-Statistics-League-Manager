/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react'
// import { useTable } from 'react-table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { Link } from 'react-router-dom'
import { NAV } from '../../appUtils'

import EditIcon from '../../images/edit.svg'

export function NewTable ({ data, editTeamName }) {
  return (
    <Table
      height={500}
      width={350 * 2 + 250}
      data={data}
      onRowClick={rowData => {
        console.log(rowData)
      }}
    >
      <Column width={350}>
        <HeaderCell>Name</HeaderCell>
        <Cell>
          {rowData => (
            <Link className='table-link'
              to={NAV.getSingleTeamRoute(rowData.Name)}>
              {(rowData.Name) ? rowData.Name : 'error'}
            </Link>
          )}
        </Cell>
      </Column>

      <Column width={150}>
        <HeaderCell>Number of Trophies</HeaderCell>
        <Cell dataKey="No_trophy" />
      </Column>

      <Column width={350}>
        <HeaderCell>Coach Name</HeaderCell>
        <Cell dataKey="Coach_name" />
      </Column>

      <Column width={100}
        fixed="right">
        <HeaderCell>Edit</HeaderCell>

        <Cell>
          {rowData => (
            <img src={EditIcon}
              alt="edit"
              height="50"
              onClick={() => editTeamName(rowData.Name)}/>
          )}
        </Cell>
      </Column>
    </Table>)
}
