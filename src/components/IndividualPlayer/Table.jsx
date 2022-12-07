/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react'
// import { useTable } from 'react-table'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'

export function MyTable ({ data }) {
  return (
    <Table
      height={600}
      width={150 * 2 + 80 * 2 + 75 * 6 + 100}
      data={data}
    >
      <Column width={150}>
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="Game_date" />
      </Column>

      <Column width={150}>
        <HeaderCell>Opponent</HeaderCell>
        <Cell dataKey="opponent" />
      </Column>

      <Column width={80}>
        <HeaderCell>Result</HeaderCell>
        <Cell>{rowData => `${rowData.result}`}</Cell>
      </Column>

      <Column width={80}>
        <HeaderCell>Min Played</HeaderCell>
        <Cell>{rowData => `${rowData.Minutes}`}</Cell>
      </Column>

      <Column width={75}>
        <HeaderCell>FG Made</HeaderCell>
        <Cell>{rowData => (rowData.fg_made)}</Cell>
      </Column>

      <Column width={75}>
        <HeaderCell>FG Try</HeaderCell>
        <Cell>{rowData => (rowData.fg_attempt)}</Cell>
      </Column>

      <Column width={75}>
        <HeaderCell>FT Made</HeaderCell>
        <Cell>{rowData => (rowData.ft_made)}</Cell>
      </Column>

      <Column width={75}>
        <HeaderCell>FT Try</HeaderCell>
        <Cell>{rowData => (rowData.ft_attempt)}</Cell>
      </Column>

      <Column width={75}>
        <HeaderCell>3s Made</HeaderCell>
        <Cell>{rowData => (rowData.three_pt_made)}</Cell>
      </Column>

      <Column width={75}>
        <HeaderCell>3s Try</HeaderCell>
        <Cell>{rowData => (rowData.three_pt_attempt)}</Cell>
      </Column>

      <Column width={100}>
        <HeaderCell>Plus Minus</HeaderCell>
        <Cell dataKey="plus_minus" />
      </Column>
    </Table>)
}
