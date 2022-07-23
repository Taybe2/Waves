import React from 'react';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

const HistoryBlock = ({history}) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Products</th>
                        <th>Amount paid</th>
                        <th>Order ID</th>
                    </tr>
                </thead>
                <tbody>
                    { history.map((item) => (
                        <tr key={item[0].transactionId}>
                            <td><Moment to={item[0].date}></Moment></td>
                            <td>
                                { item[0].items.map((article, i) => (
                                    <div key={i}>{article.name}</div>
                                ))}
                            </td>
                            <td>{item[0].amount}</td>
                            <td>{item[0].orderId}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>

    )
}

export default HistoryBlock;
