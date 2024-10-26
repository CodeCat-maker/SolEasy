import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import Popup from "components/Popup/Popup.js";
import CreateWallet from "components/Wallets/CreateWallet.js";
import WalletTable from "components/Wallets/WalletTable.js";
import WalletsHeader from "components/Wallets/WalletsHeader.js";
import CsvUpload from "components/Wallets/CsvUpload.js"; // Import the CSV upload component
import { exportToCSV } from "utils/csvUtils"; // Import the CSV export utility
import { initDB, addWallet, getWallets, deleteWallet, updateWallet } from "utils/walletStorage"; // Import IndexedDB functions
import { createWallets, getTokenBalance, getSolBalance } from "utils/walletRequest"; // Import wallet creation utility
import NotificationAlert from "react-notification-alert";

function Wallets() {
  const [wallets, setWallets] = useState([]);
  const [selectedToken, setSelectedToken] = useState({symbol: "SOL", address: "So11111111111111111111111111111111111111111"});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const notificationAlertRef = React.useRef(null); // Ensure this is initialized

  const fetchWallets = async () => {
    setLoading(true);
    try {
      const fetchedWallets = await getWallets(); // Fetch wallets from IndexedDB
      setWallets(fetchedWallets);
      setError(null);
    } catch (error) {
      setError("Failed to fetch wallets");
    } finally {
      setLoading(false);
    }
  };

  const updateWalletBalances = async () => {
    const updatedWallets = await Promise.all(wallets.map(async (wallet) => {
      if (!wallet.balance || typeof wallet.balance === 'string') {
        wallet.balance = {};
      }
      if (!wallet.balance.tokenBalance) {
        wallet.balance.tokenBalance = {};
      }
      
      // Fetch balances concurrently
      wallet.balance.tokenBalance[selectedToken.address] = await getTokenBalance(wallet.privateKey, selectedToken.address);
      wallet.balance.solBalance = await getSolBalance(wallet.privateKey);

      await updateWallet(wallet.id, wallet);
      
      return wallet; // Return the updated wallet
    }));

    setWallets(updatedWallets); // Update state with the new wallets
  }

  const handleSelectToken = async (address) => {
      const token = {symbol: "", address: address};
      setSelectedToken(token);
  }

  const handleUploadWallets = async (newWallets) => {
    try {
      for (const wallet of newWallets) {
        await addWallet(wallet); // Add each wallet to IndexedDB
      }
      await fetchWallets(); // Refresh the wallet list after upload
    } catch (error) {
      console.error("Failed to upload wallets:", error);
    }
    setIsPopupOpen(false);
            // Send alert
            const options = {
              place: 'tr',
              message: (
                  <div>
                      <div>
                          Wallets uploaded successfully!
                      </div>
                  </div>
                ),
      type: "success",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const handleCreateWallet = async (walletData) => {
    try {
      // request wallet creation and add to IndexedDB
      const newWallets = await createWallets(walletData);
      for (const wallet of newWallets) {
        //set lastmodified to current date and balance to 0
        wallet.createTime = new Date().toISOString();
        wallet.balance = 0;
        await addWallet(wallet); // Add each wallet to IndexedDB
      }
      await fetchWallets(); // Refresh the wallet list after creation
    } catch (error) {
      console.error("Failed to create wallet:", error);
    }
    setIsPopupOpen(false);
    // Send alert
    const options = {
              place: 'tr',
              message: (
                  <div>
                      <div>
                          Wallets created successfully!
                      </div>
                  </div>
                ),
      type: "success",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const handleExport = () => {
    exportToCSV(wallets); // Call the export function with the current wallets
  };

  useEffect(() => {
    fetchWallets(); // Fetch wallets when the component mounts
    updateWalletBalances(wallets, selectedToken);
  }, []);

  const handleDeleteWallet = async (walletId) => {
      await deleteWallet(walletId);
      await fetchWallets(); // Refresh the wallet list after deletion
      // Send alert
      const options = {
                    place: 'tr',
                    message: (
                        <div>
                            <div>
                                Wallet deleted successfully!
                            </div>
                        </div>
                      ),
        type: "warning",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const openCreateWalletPopup = () => {
    setPopupContent(
      <CreateWallet
        onDownloadKeys={() => {}} 
        onCreate={handleCreateWallet} // Pass the create function
      />
    );
    setIsPopupOpen(true);
  };

  const openCsvUploadPopup = () => {
    setPopupContent(<CsvUpload onUpload={handleUploadWallets} />);
    setIsPopupOpen(true);
  };



  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlertRef} /> {/* Ensure the ref is assigned here */}
        <Row>
          <Col md="12">
            <Card>
              <WalletsHeader 
                onCreate={openCreateWalletPopup} // Use the new function
                onUpload={openCsvUploadPopup} 
                onDownload={handleExport}
                onSelectToken={handleSelectToken}
              />
              <CardBody>
                <WalletTable wallets={wallets} onDelete={handleDeleteWallet} selectedToken={selectedToken} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <Popup
        isOpen={isPopupOpen}
        toggle={() => setIsPopupOpen(!isPopupOpen)}
        title="Manage Wallet"
        content={popupContent} // Render the dynamic content
      />
    </>
  );
}

export default Wallets;
