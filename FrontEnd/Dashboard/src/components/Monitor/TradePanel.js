import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ButtonGroup,
    Col,
    Row,
} from 'reactstrap';

const TradingSettings = () => {
    const [interval, setInterval] = useState({ min: 2, max: 4 });
    const [slippage, setSlippage] = useState(5);
    const [amount, setAmount] = useState('fixed');
    const [fixedAmount, setFixedAmount] = useState(0.02);
    const [mode, setMode] = useState('Pulling');
    const [targetPrice, setTargetPrice] = useState(0.01);
    const [jitoFee, setJitoFee] = useState('Default');
    const [poolType, setPoolType] = useState('RaydiumV2');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    {/* Interval and Slippage */}
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="interval">Interval (seconds):</Label>
                                <Row>
                                    <Col md="5">
                                        <Input
                                            type="number"
                                            value={interval.min}
                                            onChange={(e) => setInterval({ ...interval, min: e.target.value })}
                                            min="1"
                                        />
                                    </Col>
                                    <Col md="2" className="text-center">~</Col>
                                    <Col md="5">
                                        <Input
                                            type="number"
                                            value={interval.max}
                                            onChange={(e) => setInterval({ ...interval, max: e.target.value })}
                                            min="1"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="slippage">Slippage (%):</Label>
                                <Input
                                    type="number"
                                    value={slippage}
                                    onChange={(e) => setSlippage(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Pool Type */}
                    <FormGroup>
                        <Label className='mr-5'>Pool Type:</Label>
                        <ButtonGroup>
                            <Button className='w-20 p-1' color={poolType === 'RaydiumV2' ? 'success' : 'secondary'} onClick={() => setPoolType('RaydiumV2')}>RaydiumV2</Button>
                            <Button className='w-20 p-1' color={poolType === 'RaydiumV3' ? 'success' : 'secondary'} onClick={() => setPoolType('RaydiumV3')}>RaydiumV3</Button>
                        </ButtonGroup>
                    </FormGroup>

                    {/* Amount */}
                    <FormGroup tag="fieldset">
                        <Label>Amount:</Label>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" value="All" checked={amount === '全部'} onChange={() => setAmount('全部')} /> All
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" value="Random" checked={amount === '随机'} onChange={() => setAmount('随机')} /> Random
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" value="fixed" checked={amount === 'fixed'} onChange={() => setAmount('fixed')} /> Fixed
                            </Label>
                        </FormGroup>
                        {amount === 'fixed' && (
                            <Input
                                type="number"
                                value={fixedAmount}
                                onChange={(e) => setFixedAmount(e.target.value)}
                            />
                        )}
                    </FormGroup>

                    {/* Mode */}
                    <FormGroup tag="fieldset">
                        <Label>Mode:</Label>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" value="Pulling" checked={mode === '拉盘'} onChange={() => setMode('拉盘')} /> Pulling
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="radio" value="Dumping" checked={mode === '砸盘'} onChange={() => setMode('砸盘')} /> Dumping
                            </Label>
                        </FormGroup>
                    </FormGroup>

                    {/* Target Price */}
                    <FormGroup>
                        <Label for="targetPrice">Target Price:</Label>
                        <Input
                            type="number"
                            id="targetPrice"
                            value={targetPrice}
                            onChange={(e) => setTargetPrice(e.target.value)}
                        />
                    </FormGroup>

                    {/* Jito Fee */}
                    <FormGroup>
                        <Label className='mr-5'>Jito Fee:</Label>
                        <ButtonGroup>
                            <Button className='w-20 p-1' color={jitoFee === 'Default' ? 'success' : 'secondary'} onClick={() => setJitoFee('Default')}>Default</Button>
                            <Button className='w-20 p-1' color={jitoFee === 'Fast' ? 'success' : 'secondary'} onClick={() => setJitoFee('Fast')}>Fast</Button>
                            <Button className='w-20 p-1' color={jitoFee === 'Super Fast' ? 'success' : 'secondary'} onClick={() => setJitoFee('Super Fast')}>Super Fast</Button>
                        </ButtonGroup>
                        <Input
                            type="number"
                            value={0.000001}
                            readOnly
                            style={{ marginTop: '10px' }}
                        />
                    </FormGroup>

                    {/* Submit Button */}
                    <Button color="primary" type="submit">Submit</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default TradingSettings;
