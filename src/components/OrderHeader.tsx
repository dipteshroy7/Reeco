import { FC, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { getOrderDetails } from "../app/services/orderSlice";
import { updateOrderStatus } from "../app/services/orderSlice";

const StyledOrderHeader = styled.div`
    height: 110px;
    padding: 20px 0px;
    background-color: #fff;
    box-shadow: 0px 6px 10px 0px #e0e0e0;
    .container {
        u {
            cursor: pointer;
        }
        .order-lower-row {
            display: flex;
            justify-content: space-between;
            h2.order {
                margin-top: 22px;
                font-size: 26px;
            }
            Button {
                margin-top: 12px;
                margin-left: 18px;
            }
        }
    }
`;

const OrderHeader: FC = () => {
    const { status, order_number } = useTypedSelector(getOrderDetails);
    const [ApprovalBtnDisabled, setApprovalBtnDisabled] = useState(false);
    const dispatch = useAppDispatch();
    const ApproveHandler = () => {
        if (status === "Approved") return;
        setApprovalBtnDisabled(true);
        dispatch(updateOrderStatus("Approved"));
    };
    return (
        <StyledOrderHeader>
            <div className="container">
                <div>
                    {"Orders > "}
                    <u>Order {order_number}</u>
                </div>
                <div className="order-lower-row">
                    <h2 className="order">Order {order_number}</h2>
                    <div>
                        <Button inverted>Back</Button>
                        <Button disabled={ApprovalBtnDisabled} onClick={ApproveHandler}>
                            Approve Order
                        </Button>
                    </div>
                </div>
            </div>
        </StyledOrderHeader>
    );
};

export default OrderHeader;
