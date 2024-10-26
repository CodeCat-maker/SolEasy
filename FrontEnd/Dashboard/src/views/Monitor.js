// tradingview template
import React from 'react';
import TradingViewChart from '../components/Monitor/TradingViewChart'; // Adjust the import path as necessary
import MarketActivities from '../components/Monitor/MarketActivities';
import TradePanel from '../components/Monitor/TradePanel';
import { Col, Row } from 'reactstrap';

const Monitor = () => {
    return (
        <div className="content">
                <Row style={{ height: '70vh' }}>
                    <Col xs="12">
                        <TradingViewChart symbol="SOL" interval="D" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MarketActivities 
                        activities={[
                            { maker: "Wallet1", type: "Buy", amount: "$1000", date: "2023-05-01" },
                            { maker: "Wallet2", type: "Sell", amount: "$500", date: "2023-05-02" },
                            { maker: "Wallet3", type: "Buy", amount: "$250", date: "2023-05-03" },
                            { maker: "Wallet1", type: "Buy", amount: "$2000", date: "2023-05-04" },
                            { maker: "Wallet2", type: "Buy", amount: "$100", date: "2023-05-05" },
                        ]} />
                    </Col>
                    <Col>
                        <TradePanel />
                    </Col>
                </Row>
        </div>
    );
};

export default Monitor;

