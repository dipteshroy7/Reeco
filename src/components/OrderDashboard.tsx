import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Button from "./Button";
import OrderTable from "./OrderTable";
import { SlPrinter } from "react-icons/sl";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { addDemoOrderItem, getOrderDetails } from "../app/services/orderSlice";

const StyledOrderDashboard = styled.div`
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    padding: 30px 45px;
    min-width: 1240px;
    min-height: 420px;
    .search-row {
        display: flex;
        justify-content: space-between;
        .left-section {
            display: flex;
            Button {
                margin-right: 50px;
            }
            .printer-icon {
                height: 30px;
                width: 30px;
                fill: #1c633f;
                display: block;
                margin-top: 5px;
                cursor: pointer;
            }
        }
    }
`;

const OrderDashboard: FC = () => {
    const dispatch = useAppDispatch();
    const { status } = useTypedSelector(getOrderDetails);
    const [AddBtnDisabled, setAddBtnDisabled] = useState(false);

    useEffect(() => {
        if (status === "Approved") setAddBtnDisabled(true);
    }, [status]);

    const AddBtnHandler = () => {
        if (status === "Approved") return;
        dispatch(addDemoOrderItem());
    };

    return (
        <StyledOrderDashboard>
            <div className="search-row">
                <SearchBar />
                <div className="left-section">
                    <Button disabled={AddBtnDisabled} inverted onClick={() => AddBtnHandler()}>
                        Add item
                    </Button>
                    <SlPrinter className="printer-icon" />
                </div>
            </div>
            <div className="mt-24">
                <OrderTable />
            </div>
        </StyledOrderDashboard>
    );
};

export default OrderDashboard;
