import React from 'react';
import { useTable } from 'react-table';
import { Table } from 'reactstrap';

const WalletActivityTable = ({ activities }) => {
    const data = React.useMemo(() => activities, [activities]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Wallet',
                accessor: 'wallet', // accessor is the "key" in the data
            },
            {
                Header: 'Action',
                accessor: 'action',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <Table {...getTableProps()} striped>
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
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default WalletActivityTable;
