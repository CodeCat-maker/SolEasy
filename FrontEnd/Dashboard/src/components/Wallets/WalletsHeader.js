import React from 'react';
import { CardHeader, CardSubtitle, CardTitle, Button, Col, Row, Input} from 'reactstrap';

const WalletsHeader = ({ onCreate, onDownload, onUpload, onSelectToken, selectedToken = {symbol:"SOL", address:"So11111111111111111111111111111111111111111" }, }) => {
  return (
        <CardHeader className="flex-row">
        <CardTitle tag="h4">Active Wallets for {selectedToken.address}</CardTitle>
        <Row>
          <Col>
          <Input
            placeholder="Search Token..."
            onChange={e => {
              onSelectToken(e.target.value || undefined); // Set undefined to remove the filter
              }}
          />          
          </Col>
          <Col className="d-flex justify-content-end">
            <Button color="primary" onClick={onCreate} className="mr-2">Create</Button>
            <Button color="warning" onClick={onDownload} className="mr-2">Export</Button>
            <Button color="info" onClick={onUpload}>Import</Button>
          </Col>
        </Row>    
    </CardHeader>
  );
};

export default WalletsHeader;
