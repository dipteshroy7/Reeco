import { FC } from "react";
import styled from "styled-components";
import OrderDashboard from "../components/OrderDashboard.tsx";
import OrderHeader from "../components/OrderHeader";
import OrderInfoBox from "../components/OrderInfoBox";

const StyledOrderPage = styled.div``;

const OrderPage: FC = () => {
    return (
        <StyledOrderPage>
            <OrderHeader />
            <div className="container mt-30 mb-60">
                <OrderInfoBox />
                <div className="mt-24">
                    <OrderDashboard />
                </div>
            </div>
        </StyledOrderPage>
    );
};

export default OrderPage;
