import React from 'react';
import { Row, Col } from "reactstrap";
import WalletActivityTable from '../components/Wallets/WalletActivityTable';
import TransactionPanel from '../components/TransactionPanel'; // Adjust the import path as necessary

const Transaction = () => {
    return <div className="content">
        <Row>
            <Col md="12">
                {/* a transaction panel which can select address/token/amount/fee of transfer to and from */}
                <TransactionPanel />
            </Col>
            <Col md="12">
                <WalletActivityTable 
              activities={[
                    { wallet: "Wallet1", action: "Deposit", amount: "$1000", date: "2023-05-01" },
                    { wallet: "Wallet2", action: "Withdrawal", amount: "$500", date: "2023-05-02" },
                    { wallet: "Wallet3", action: "Transfer", amount: "$250", date: "2023-05-03" },
                    { wallet: "Wallet1", action: "Deposit", amount: "$2000", date: "2023-05-04" },
                    { wallet: "Wallet2", action: "Withdrawal", amount: "$100", date: "2023-05-05" },
                ]}
                />
            </Col>
        </Row>
    </div>;
};

export default Transaction;
