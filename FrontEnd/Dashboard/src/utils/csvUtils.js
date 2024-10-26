// utils/csvUtils.js
export const exportToCSV = (wallets) => {
    const csvRows = [];
    // Get the headers
    const headers = ['Public Key', 'Private Key', 'Create Time', 'Last Transaction', 'Balance'];
    csvRows.push(headers.join(','));
  
    // Format the wallet data
    wallets.forEach(wallet => {
      const row = [
        wallet.publicKey,
        wallet.privateKey,
        wallet.createTime,
        wallet.lastTransaction,
        wallet.balance
      ];
      csvRows.push(row.join(','));
    });
  
    // Create a Blob from the CSV string
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    // Create a link element to download the CSV
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'wallets.csv');
    a.click();
    window.URL.revokeObjectURL(url); // Clean up
  };