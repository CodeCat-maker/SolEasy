// utils/api.js
export const createWallets = async (walletData) => {
    console.log(walletData);
    const response = await fetch('http://132.145.49.82:8000/wallet/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "numbers": parseInt(walletData.count)
        }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();

    // Replace single quotes with double quotes in the result string
    const resultString = data.result.replace(/'/g, '"');

    // Parse the result to an array of objects
    const wallets = JSON.parse(resultString);
    return wallets;
  };

  // Request SOL balance for a wallet
  export const getSolBalance = async (privateKey) => {
    const response = await fetch(`http://132.145.49.82:8000/account/balance/sol?private_key=${privateKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
        
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };

  // Request token balance for a wallet
  export const getTokenBalance = async (privateKey, mintAddress) => {
    const response = await fetch(`http://132.145.49.82:8000/account/balance/sol?private_key=${privateKey}&mint=${mintAddress}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('token balance', data.result);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return data.result;
  };