import * as React from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import ArticleHead from '../ArticleHead';


const SCOrderStatus = styled.div`

`

function OrderStatus({}: RouteComponentProps) {
    const { status } = useParams<any>();

    const title = status === "success" ? "Your order has been successfully processed" : "Your order has been cancelled"

    return <SCOrderStatus>
        <ArticleHead title={title}></ArticleHead>
    </SCOrderStatus>
}

export default OrderStatus;