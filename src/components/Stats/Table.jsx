/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react'
// import { useTable } from 'react-table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { toPercent } from '../../appUtils'

export function MyTable ({ data }) {
  return (
    <Table
      height={600}
      width={150 * 6}
      data={data}
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
