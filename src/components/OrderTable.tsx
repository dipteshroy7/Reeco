import { FC } from "react";
import styled from "styled-components";
import { HiOutlineCheck } from "react-icons/hi";
import { HiOutlineXMark } from "react-icons/hi2";

import { useTypedSelector } from "../app/store";
import { useAppDispatch } from "../app/store";

import {
    getOrderDetails,
    updateOrderItemStatus,
    updateMissingModalId,
    updateEditModalId,
} from "../app/services/orderSlice";

import BubbleText from "./BubbleText";
import MissingModal from "./MissingModal";
import EditModal from "./EditModal";

import type { OrderItem } from "../app/services/orderApi";
import type { textColor } from "../app/services/orderApi";

const StyledOrderTable = styled.div`
    .table-headers {
        border: 1px solid #e4e4e4;
        border-radius: 10px 10px 0px 0px;
        display: flex;
        justify-content: space-between;
        div {
            padding: 10px;
            color: #777;
        }
    }
    .no-result {
        background-color: #f9f9f9;
        height: 250px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        color: #777;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-image {
        width: 6%;
        img {
            width: 40px;
        }
    }
    .item-image-block {
        padding-left: 20px;
        display: flex;
        justify-content: center;
    }
    .product-name {
        width: 24%;
    }
    .brand,
    .quantity,
    .total {
        width: 10%;
    }
    .quantity {
        p {
            color: #999;
            b {
                margin-right: 4px;
                color: #444;
            }
        }
    }
    .price {
        width: 11%;
    }
    .status {
        width: 29%;
    }
    .price,
    .quantity,
    .total {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        s {
            color: #999;
        }
    }
    .status-block {
        background-color: #f9f9f9;
        padding-left: 20px;
        padding-right: 20px;
        justify-content: center;
        svg {
            height: 25px;
            width: 25px;
            margin-right: 18px;
            stroke-width: 1.5;
            cursor: pointer;
        }
        svg.green {
            stroke: #3eca72;
            stroke-width: 3;
        }
        svg.orange {
            stroke: #f66d45;
            stroke-width: 3;
        }
        svg.red {
            stroke: #db2114;
            stroke-width: 3;
        }
        span {
            cursor: pointer;
        }
        .status-text {
            min-width: calc(100% - 112px);
            padding-right: 20px;
            display: flex;
            justify-content: center;
        }
    }
`;

const StyledOrderItemRow = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
    & > div {
        padding: 20px 10px;
        color: #444;
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    &:last-child {
        border: none;
        & > :first-child {
            border-bottom-left-radius: 10px;
        }
        & > :last-child {
            border-bottom-right-radius: 10px;
        }
    }
    &:hover {
        & > div {
            background-color: #3eca7220;
        }
    }
`;

interface OrderItemRowProps {
    order_item: OrderItem;
    order_status: string;
}

const OrderItemRow: FC<OrderItemRowProps> = ({
    order_item: {
        id,
        name,
        image,
        brand,
        price,
        old_price,
        quantity,
        old_quantity,
        total_price,
        old_total_price,
        weight,
        statusText,
        statusType,
    },
    order_status,
}) => {
    const dispatch = useAppDispatch();
    const checkMarkHandler = (id: number) =>
        dispatch(updateOrderItemStatus({ id, text: "Approved", type: "green" }));

    const checkMarkClassName = (statusType: textColor | undefined) => {
        if (statusType === "green") return statusType;
    };
    const crossMarkClassName = (statusType: textColor | undefined) => {
        if (statusType === "orange" || statusType === "red") return statusType;
    };

    return (
        <StyledOrderItemRow>
            <div className="item-image item-image-block">
                <img src={image} alt="product_image" />
            </div>
            <div className="product-name">{name}</div>
            <div className="brand">{brand}</div>
            <div className="price">
                ${price} / {weight}
                {old_price && <s>${old_price}</s>}
            </div>
            <div className="quantity">
                <p>
                    <b>{quantity}</b> x {weight}
                </p>
                {old_quantity && <s>{old_quantity}</s>}
            </div>
            <div className="total">
                ${total_price}
                {old_total_price && <s>${old_total_price}</s>}
            </div>
            <div className="status status-block">
                <div className="status-text">
                    {statusText && <BubbleText color={statusType}>{statusText}</BubbleText>}
                </div>
                {order_status !== "Approved" && (
                    <>
                        <HiOutlineCheck
                            className={checkMarkClassName(statusType)}
                            onClick={() => checkMarkHandler(id)}
                        />
                        <HiOutlineXMark
                            className={crossMarkClassName(statusType)}
                            onClick={() => dispatch(updateMissingModalId(id))}
                        />
                        <span onClick={() => dispatch(updateEditModalId(id))}>Edit</span>
                    </>
                )}
            </div>
        </StyledOrderItemRow>
    );
};

const OrderTable: FC = () => {
    const { missing_modal_id, edit_modal_id, searched_order_items, status } =
        useTypedSelector(getOrderDetails);
    return (
        <StyledOrderTable>
            <div className="table-headers">
                <div className="item-image"></div>
                <div className="product-name">Product name</div>
                <div className="brand">Brand</div>
                <div className="price">Price</div>
                <div className="quantity">Quantity</div>
                <div className="total">Total</div>
                <div className="status">Status</div>
            </div>
            {searched_order_items.length === 0 && (
                <div className="no-result">No Result Found...</div>
            )}
            {searched_order_items.map((order_item) => (
                <OrderItemRow
                    key={Math.round(Math.random() * 10000)}
                    order_item={order_item}
                    order_status={status}
                />
            ))}
            {missing_modal_id !== null && <MissingModal id={missing_modal_id} />}
            {edit_modal_id !== null && <EditModal id={edit_modal_id} />}
        </StyledOrderTable>
    );
};

export default OrderTable;
