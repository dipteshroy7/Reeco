import { FC } from "react";
import styled from "styled-components";
import { GiFruitBowl } from "react-icons/gi";
import { FaBottleWater } from "react-icons/fa6";
import { FaRegSnowflake } from "react-icons/fa";
import { LuIceCream2 } from "react-icons/lu";
import { GiDumplingBao } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import { GiFlowerPot } from "react-icons/gi";
import { LuCakeSlice } from "react-icons/lu";
import { useTypedSelector } from "../app/store";
import { getOrderDetails } from "../app/services/orderSlice";

const StyledOrderInfoBox = styled.div`
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    min-height: 130px;
    min-width: 1240px;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    & > div {
        padding: 5px 25px;
        border-right: 1px solid #e4e4e4;
        width: 16.666%;
        h4 {
            color: #777;
        }
        h3 {
            margin-top: 10px;
        }
        .category-icons > svg {
            height: 20px;
            width: 20px;
            margin: 10px 8px 0px 8px;
            cursor: pointer;
        }
    }
    & > div:last-child {
        border-right: none;
    }
`;

const OrderInfoBox: FC = () => {
    const data = useTypedSelector(getOrderDetails);
    const orderTotal = data.order_items
        .reduce((prev, curr) => (prev += curr.total_price), 0)
        .toFixed(2);

    return (
        <StyledOrderInfoBox>
            <div>
                <h4>Supplier</h4>
                <h3>{data.supplier}</h3>
            </div>
            <div>
                <h4>Shipping Date</h4>
                <h3>{data.shipping_date}</h3>
            </div>
            <div>
                <h4>Total</h4>
                <h3>$ {orderTotal}</h3>
            </div>
            <div>
                <h4>Category</h4>
                <div className="category-icons">
                    <GiFruitBowl />
                    <FaBottleWater />
                    <FaRegSnowflake />
                    <LuIceCream2 />
                    <GiDumplingBao />
                    <TbMeat />
                    <GiFlowerPot />
                    <LuCakeSlice />
                </div>
            </div>
            <div>
                <h4>Department</h4>
                <h3>{data.department}</h3>
            </div>
            <div>
                <h4>Status</h4>
                <h3>{data.status}</h3>
            </div>
        </StyledOrderInfoBox>
    );
};

export default OrderInfoBox;
