import React from "react";
import { useTable } from "react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { NAV } from "../../appConstants";

export function Table({ data }) {

    const columns = useMemo(
        () => [
        {
        Header: "Team",
        columns: [
            {
                Header: "Name",
                accessor: "Name",
                Cell: ((props) => (
                    <Link className='table-link' to={NAV.getSingleTeamRoute(props.row.original.Name)}>
                        {(props.row.original.Name) ? props.row.original.Name : 'error'}
                    </Link>
                )),
            },
            {
                Header: "Trophies",
                accessor: "No_trophy"
            },
            {
                Header: "Coach's Name",
                accessor: "Coach_name"
            }
        ]
        }
    ], []);

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
      } = useTable({
        columns,
        data
      });

      return (
        <table className="team-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
}