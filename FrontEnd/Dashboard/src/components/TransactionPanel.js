import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody, Alert } from 'reactstrap';
import { createSolTransaction } from '../utils/transactionRequest';
import { getWallets } from '../utils/walletStorage';
import NotificationAlert from "react-notification-alert";

const TransactionPanel = () => {
    const [wallets, setWallets] = useState([]);
    const [senderWallet, setSenderWallet] = useState({});
    const [recipientAddress, setRecipientAddress] = useState('');
    const [isSendToAll, setIsSendToAll] = useState(false);
    const [token, setToken] = useState('SOL'); // Default token
    const [amount, setAmount] = useState('');

    const notificationAlertRef = React.useRef(null); // Ensure this is initialized

    const handleSubmit = (e) => {
        e.preventDefault();
        const senderAddress = senderWallet.publicKey;
        // Handle the transaction submission logic here
        console.log('Transaction Details:', { senderAddress, recipientAddress, token, amount });
        // You can call an API or perform any action with the transaction details
        // createSolTransaction(senderAddress, recipientAddress, amount);
        
        // Send alert
        const options = {
            place: 'tr',
            message: (
                <div>
                    <div>
                        Transaction submitted successfully!
                    </div>
                </div>
            ),
            type: "success",
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };


    const sendToAll = async () => {
        // send to all wallets
        const wallets = await getWallets();
        setWallets(wallets);
        for (const wallet of wallets) {
            createSolTransaction(senderWallet.privateKey, wallet.address, amount);
        }
    }
    // get wallets while mount
    useEffect(() => {
        getWallets().then(setWallets);
    }, []); 
    return (
        <Card>
            <NotificationAlert ref={notificationAlertRef} /> {/* Ensure the ref is assigned here */}
            <CardHeader>
                <h5>Transaction</h5>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="senderWallet">Sender Wallet</Label>
                    <Input
                        type="select"
                        id="senderWallet"
                        value={senderWallet.publicKey || ''} // Ensure it defaults to an empty string if no wallet is selected
                        onChange={(e) => {
                            const selectedWallet = wallets.find(w => w.publicKey === e.target.value);
                            setSenderWallet(selectedWallet || {}); // Set to an empty object if no wallet is found
                        }}
                        required
                    >
                        <option value="">Select a wallet</option> {/* Use an empty string for the default option */}
                        {wallets.map(wallet => (
                            <option key={wallet.publicKey} value={wallet.publicKey}>
                                {wallet.publicKey}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                <Label for="recipientType">Recipient Type</Label>
                <FormGroup>
                    <Button color={isSendToAll ? "info" : "secondary"} onClick={() => setIsSendToAll(true)} className="mr-2">
                        Send to All
                    </Button>
                    <Button color={!isSendToAll ? "info" : "secondary"} onClick={() => setIsSendToAll(false)} className="mr-2">
                        Specific Address
                    </Button>
                    <Button color="secondary" onClick={() => {/* Implement random logic */}} className="mr-2">
                        Random
                    </Button>
                </FormGroup>
                {!isSendToAll && (
                    <>
                        <Label for="address">Recipient Address</Label>
                        <Input
                            type="text"
                            id="address"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            placeholder="Enter recipient address"
                            required
                        />
                    </>
                )}
                </FormGroup>
                <FormGroup>
                    <Label for="token">Select Token</Label>
                    <Input
                        type="select"
                        id="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    >
                        <option value="So11111111111111111111111111111111111111111">Solana (SOL)</option>
                        <option value="Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB">Tether (USDT)</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    />
                </FormGroup>
                    <Button type="submit" color="primary">Submit Transaction</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default TransactionPanel;
