/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react'
// import { useTable } from 'react-table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { NAV, toPercent } from '../../appUtils'

export function MyTable ({ data, navigate }) {
  return (
    <Table
      height={600}
      width={150 * 7}
      data={data}
      onRowClick={(rowData) =>
        navigate(
          NAV.getPlayerRoute(rowData.Fname, rowData.Lname),
          { state: rowData }
        )
      }
    >
      <Column width={150}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="Fname" />
      </Column>

      <Column width={150}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="Lname" />
      </Column>

      <Column width={150}>
        <HeaderCell>Team</HeaderCell>
        <Cell dataKey="Team" />
      </Column>

      <Column width={150}>
        <HeaderCell>Field Goal Percentage</HeaderCell>
        <Cell>{rowData => toPercent(rowData.fg_percentage)}</Cell>
      </Column>

      <Column width={150}>
        <HeaderCell>Free Throw Percentage</HeaderCell>
        <Cell>{rowData => toPercent(rowData.ft_percentage)}</Cell>
      </Column>

      <Column width={150}>
        <HeaderCell>Three Point Percentage</HeaderCell>
        <Cell>{rowData => toPercent(rowData.three_pt_percentage)}</Cell>
      </Column>

      <Column width={150}>
        <HeaderCell>Plus Minus</HeaderCell>
        <Cell dataKey="plus_minus_avg" />
      </Column>
    </Table>)
}
