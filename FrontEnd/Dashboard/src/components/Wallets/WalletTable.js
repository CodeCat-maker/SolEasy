import React from 'react';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';
import { Table, Button, Input, Row, Col } from 'reactstrap';
import { FaCopy } from 'react-icons/fa'; // Importing a copy icon from react-icons
import NotificationAlert from "react-notification-alert";

const WalletTable = ({ wallets, onDelete, selectedToken }) => {
    const data = React.useMemo(() => wallets, [wallets]);
    const notificationAlertRef = React.useRef(null); // Ensure this is initialized

    const columns = React.useMemo(
        () => [
            {
                Header: 'Public Key',
                accessor: 'publicKey',
                Cell: ({ value }) => (
                    <div className="d-flex align-items-center">
                        <div style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {value}
                        </div>
                        <FaCopy 
                            style={{ cursor: 'pointer', marginLeft: '5px' }} 
                            onClick={() => handleCopy(value)} 
                            title="Copy Public Key"
                        />
                    </div>
                ),
            },
            {
                Header: 'Private Key',
                accessor: 'privateKey',
                Cell: () => <span>********</span>, // Hide the private key
            },
            {
                Header: 'Create Time',
                accessor: 'createTime',
                Cell: ({ value }) => value || "N/A",
            },
            {
                Header: 'Balance',
                accessor: 'balance',
                Cell: ({ value, row }) => {
                    if (selectedToken) {
                        return (value?.tokenBalance?.[selectedToken.address] === 0 ? "0" : value?.tokenBalance?.[selectedToken.address] || "N/A");
                    } else {
                        return (value?.solBalance === 0 ? "0" : value?.solBalance || "N/A");
                    }
                },
                className: 'text-center',
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ value }) => (
                    <div className="text-center">
                        <Button onClick={() => onDelete(value)}>Delete</Button>
                    </div>
                ),
            },
        ],
        [onDelete]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Use page instead of rows for pagination
        prepareRow,
        setFilter,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Start on the first page
        },
        useFilters, // Use filters
        useSortBy, // Use sorting
        usePagination // Use pagination
    );

    const handleCopy = (text) => {
        // Send alert
        const options = {
                place: 'tr',
                message: (
                    <div>
                        <div>
                            Address copied to clipboard!
                        </div>
                    </div>
                  ),
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      notificationAlertRef.current.notificationAlert(options);
    };

    return (
        <>
            <NotificationAlert ref={notificationAlertRef} /> {/* Ensure the ref is assigned here */}

            <Table {...getTableProps()} className="tablesorter ps" responsive>
                <thead className="text-primary">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                    {/* Add a filter input for the public key column */}
                                    {/* {column.id === 'publicKey' ? (
                                        <Input
                                            placeholder="Search..."
                                            onChange={e => {
                                                setFilter(column.id, e.target.value || undefined); // Set undefined to remove the filter
                                            }}
                                        />
                                    ) : null} */}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => { // Use page instead of rows for pagination
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
            <div className="pagination">
              <Row>
                <Col>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </Button>
                </Col>
                <Col>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageSize}
                        </strong>{' '}
                    </span>
                </Col>
                <Col>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </Button>
                </Col>

                <Col>
                    <Input
                    type="select"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                        ))}
                    </Input>
                </Col>
              </Row>
            </div>
        </>
    );
};

export default WalletTable;
