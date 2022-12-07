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
      width={300 * 2 + 200 * 2 + 100}
      data={data}
    >
      <Column width={300}>
        <HeaderCell>Name</HeaderCell>
        <Cell>
          {rowData => (
            <Link className='table-link'
              to={NAV.getSingleTeamRoute(rowData.Name)}>
              {rowData.Name}
            </Link>
          )}
        </Cell>
      </Column>

      <Column width={200}>
        <HeaderCell>Number of Trophies</HeaderCell>
        <Cell dataKey="No_trophy" />
      </Column>

      <Column width={300}>
        <HeaderCell>Coach Name</HeaderCell>
        <Cell dataKey="Coach_name" />
      </Column>

      <Column width={200}>
        <HeaderCell>Number of Players</HeaderCell>
        <Cell dataKey="num_players" />
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
