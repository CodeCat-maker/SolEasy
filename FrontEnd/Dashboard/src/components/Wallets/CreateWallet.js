import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const CreateWallet = ({ onDownloadKeys, onCreate }) => {
  const [walletCount, setWalletCount] = useState(1); // State for number of wallets

  const handleCreate = () => {
    // Trigger wallet creation logic in the parent component
    onCreate({ count: walletCount });
  };

  return (
    <div>
      <FormGroup>
        <Label for="walletCount">Number of Wallets</Label>
        <Input
          type="number"
          id="walletCount"
          value={walletCount}
          onChange={(e) => setWalletCount(e.target.value)}
          min="1"
        />
      </FormGroup>
      <Button color="primary" onClick={handleCreate}>
        Create
      </Button>
    </div>
  );
};

export default CreateWallet;
