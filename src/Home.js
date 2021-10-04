import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { statesData } from './json_db/states';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Chart } from "react-google-charts";
import District from './District';
const Home = () => {
    const [showStateChartToggle, setShowStateChartToggle] = useState(false);
    const [statewiseTotalData, setStatewiseTotalData] = useState([]);
    const [totalData, setTotalData] = useState([]);
    const [yestCompData, setYestCompData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [stateSelected, setStateSelected] = useState('');
    useEffect(() => {
        fetch('https://data.covid19india.org/v4/min/data.min.json').then(response => response.json()).then(response => {
            setStatewiseTotalData(response);
            let totald = Object.keys(response).filter(i => i === "TT").map(obj => {
                return response[obj].total
            });

            //console.log(restd);
            setTotalData(totald[0]);
        });

        fetch('https://data.covid19india.org/v4/min/timeseries.min.json').then(response => response.json()).then(response => {
            let totald = Object.keys(response).filter(i => i === "TT").map(obj => {
                return response[obj]
            });
            let today = new Date().toISOString().slice(0, 10);
            let yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24).toISOString().slice(0, 10);

            //console.log(totald[0].dates[today].total);
            setYestCompData({
                confirmed: Math.abs(totald[0].dates[today].total.confirmed - totald[0].dates[yesterday].total.confirmed),
                recovered: Math.abs(totald[0].dates[today].total.recovered - totald[0].dates[yesterday].total.recovered),
                deceased: Math.abs(totald[0].dates[today].total.deceased - totald[0].dates[yesterday].total.deceased),
                other: Math.abs(totald[0].dates[today].total.other - totald[0].dates[yesterday].total.other)

            });

            let chartD = [['x', 'Total']];
            Object.keys(totald[0].dates).map(date => {
                chartD = [...chartD, [date, totald[0].dates[date].total.confirmed]]
            });

            console.log(chartD);
            setChartData(chartD);
        });

    }, []);



    return (<>
        <Container fluid className="mt-3">
            <Row>
                <Col lg="3" sm="6">
                    <Card className="card-stats text-white mb-2 bg-primary">
                        <Card.Body>
                            <Row>
                                <Col xs="12">
                                    <div className="numbers text-center">
                                        <p className="card-category">ACTIVE CASES</p>
                                        <Card.Title as="h4">
                                            <NumberFormat
                                                value={(totalData.confirmed - (totalData.recovered + totalData.deceased + totalData.other))}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            />
                                            <div className="yest-comp-text">
                                                <NumberFormat
                                                    value={Math.abs(yestCompData.confirmed - (yestCompData.recovered + yestCompData.deceased + yestCompData.other))}
                                                    displayType="text"
                                                    thousandsGroupStyle="lakh"
                                                    thousandSeparator={true}
                                                />
                                                &nbsp;
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            </div>
                                        </Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>

                        </Card.Footer>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats text-white mb-2 bg-warning">
                        <Card.Body>
                            <Row>
                                <Col xs="12">
                                    <div className="numbers text-center">
                                        <p className="card-category">TOTAL CASES</p>
                                        <Card.Title as="h4">
                                            <NumberFormat
                                                value={totalData.confirmed}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            />
                                            <div className="yest-comp-text">
                                                <NumberFormat
                                                    value={yestCompData.confirmed}
                                                    displayType="text"
                                                    thousandsGroupStyle="lakh"
                                                    thousandSeparator={true}
                                                /> &nbsp;
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            </div>
                                        </Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>

                        </Card.Footer>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats text-white mb-2 bg-success">
                        <Card.Body>
                            <Row>
                                <Col xs="12">
                                    <div className="numbers text-center">
                                        <p className="card-category">DISCHARGED</p>
                                        <Card.Title as="h4">
                                            <NumberFormat
                                                value={totalData.recovered}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            />
                                            <div className="yest-comp-text">
                                                <NumberFormat
                                                    value={yestCompData.recovered}
                                                    displayType="text"
                                                    thousandsGroupStyle="lakh"
                                                    thousandSeparator={true}
                                                /> &nbsp;
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            </div>
                                        </Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>

                            <div className="stats">
                                <i className="far fa-clock-o mr-1"></i>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats text-white mb-2 bg-danger">
                        <Card.Body>
                            <Row>
                                <Col xs="12">
                                    <div className="numbers text-center">
                                        <p className="card-category">DEATHS</p>
                                        <Card.Title as="h4">
                                            <NumberFormat
                                                value={totalData.deceased}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            />
                                            <div className="yest-comp-text">
                                                <NumberFormat
                                                    value={yestCompData.deceased}
                                                    displayType="text"
                                                    thousandsGroupStyle="lakh"
                                                    thousandSeparator={true}
                                                /> &nbsp;
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            </div>
                                        </Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>

                            <div className="stats">
                                <i className="fas fa-redo mr-1"></i>

                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <Chart
                        width={'100%'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData}
                        options={{
                            hAxis: {
                                title: 'Date',
                                textColor: "#FFF"
                            },
                            vAxis: {
                                title: 'Cases',

                            },
                            series: {
                                1: { curveType: 'function' },
                            },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <div className="mt-2">
                        <div className="table-heading"><span className="fw-bold">State Wise Status</span></div>
                        {!showStateChartToggle ? <Table bordered hover size="sm" className="bg-light">
                            <thead>
                                <tr>
                                    <th>State</th>
                                    <th>Confirmed</th>
                                    <th>Recovered</th>
                                    <th>Deaths</th>
                                    <th>Tested</th>
                                </tr>
                            </thead>
                            <tbody className="table-font">
                                {Object.keys(statewiseTotalData).filter(i => i !== "TT").map(obj => {
                                    return <><tr onClick={() => { setStateSelected(obj) }} key={obj}>
                                        <td>{statesData[obj]}</td>
                                        <td>
                                            <NumberFormat
                                                value={statewiseTotalData[obj].total.confirmed}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            /></td>
                                        <td>
                                            <NumberFormat
                                                value={statewiseTotalData[obj].total.recovered}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            />
                                        </td>
                                        <td>
                                            <NumberFormat
                                                value={statewiseTotalData[obj].total.deceased}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            />
                                        </td>
                                        <td>
                                            <NumberFormat
                                                value={statewiseTotalData[obj].total.tested}
                                                displayType="text"
                                                thousandsGroupStyle="lakh"
                                                thousandSeparator={true}
                                            />
                                        </td>
                                    </tr>
                                        {stateSelected == obj ? <tr><td colSpan='5'><button className='closebutton' onClick={() => { setStateSelected('') }}>X</button><District stateSelected={stateSelected} /></td></tr> : <></>}
                                    </>
                                })}
                            </tbody>
                        </Table> : <></>}
                    </div>
                </Col>
            </Row>
        </Container>
    </>);
}
export default Home;