// Request to create a transaction
export const createTransaction = async (senderAddress, recipientAddress, token, amount) => {
    const response = await fetch(`http://132.145.49.82:8000/transfer/send/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender_address: senderAddress,
            recipient_address: recipientAddress,
            token: token,
            amount: amount
        })
    });
}

// Request to create a transaction
export const createSolTransaction = async (senderAddress, recipientAddress, amount) => {
    const response = await fetch(`http://132.145.49.82:8000/transfer/sol`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender_private_key: senderAddress,
            recipient_public_key: recipientAddress,
            amount: amount
        })
    });
    // if code is 500, throw an error
    if (response.status === 500) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}