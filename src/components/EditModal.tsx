import { FC, useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useAppDispatch, useTypedSelector } from "../app/store";
import {
    getOrderDetails,
    updateEditModalId,
    updateOrderItemPrice,
    updateOrderItemOldPrice,
    updateOrderItemQuantity,
    updateOrderItemOldQuantity,
    updateOrderItemTotalPrice,
    updateOrderItemOldTotalPrice,
    updateOrderItemReason,
    updateOrderItemStatus,
} from "../app/services/orderSlice";
import Button from "./Button";
import ToggleText from "./ToggleText";

const StyledEditModal = styled.div`
    z-index: 99999;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    border: 0;
    background-color: #00000066;

    .modal-box {
        height: 520px;
        width: 870px;
        border-radius: 15px;
        padding: 40px;
        background-color: #fff;
        margin: calc(50vh - 260px) calc(50vw - 435px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        & > svg {
            height: 25px;
            width: 25px;
            position: absolute;
            top: 37px;
            right: 37px;
            cursor: pointer;
        }
        & > div {
            & > h2 {
                padding-top: 15px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            & > p {
                color: #777;
                margin-top: 5px;
                font-size: 20px;
            }
            .product-box {
                display: flex;
                .product-image {
                    width: 200px;
                }
                .price-quantity-box {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    font-size: 18px;
                    margin-left: 15px;
                    margin-top: 30px;
                    & > div {
                        display: flex;
                        align-items: center;
                        & > .title {
                            width: 200px;
                        }
                        & > input {
                            background-color: #fff;
                            border: 1px solid #e4e4e4;
                            border-radius: 10px;
                            height: 40px;
                            width: 100px;
                            padding: 10px 20px;
                            font-size: 16px;
                            text-align: center;
                            margin: 0px 10px;
                            &:focus {
                                outline: 2px solid #1c633f;
                            }
                        }
                        & > input::-webkit-outer-spin-button,
                        input::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }
                        .edit-price-input {
                            margin-left: 40px;
                        }
                        & > button {
                            font-size: 16px;
                            background-color: #3eca72;
                            color: #fff;
                            font-weight: bold;
                            border: 0;
                            border-radius: 15px;
                            height: 30px;
                            width: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            &:hover {
                                background-color: #2ba256;
                            }
                        }
                        & > .total-price {
                            font-size: 16px;
                            margin-left: 60px;
                        }
                        .weight-unit {
                            font-size: 16px;
                            margin-left: 10px;
                        }
                    }
                }
            }
            h4 {
                margin-top: 20px;
                & > span {
                    font-weight: 300;
                    color: #999;
                    font-size: 14px;
                    margin-left: 5px;
                }
            }
            .reasons {
                margin-top: 20px;
                & > div {
                    margin-right: 15px;
                }
            }
        }
        & > .lower-btns {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            & > span {
                font-weight: bold;
                color: #1c633f;
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }
`;

interface EditModalProps {
    id: number;
}

const EditModal: FC<EditModalProps> = ({ id }) => {
    const { order_items } = useTypedSelector(getOrderDetails);
    const { name, brand, image, price, quantity, weight, total_price, reason } = order_items[id];
    const [updatedPrice, setUpdatedPrice] = useState<number>(price);
    const [updatedQuantity, setUpdatedQuantity] = useState<number>(quantity);
    const [updatedTotalPrice, setUpdatedTotalPrice] = useState<number>(total_price);
    const [updatedReason, setUpdatedReason] = useState<string>(reason);

    useEffect(() => {
        setUpdatedTotalPrice(Number((updatedPrice * updatedQuantity).toFixed(2)));
    }, [updatedPrice, updatedQuantity]);

    const dispatch = useAppDispatch();

    const reasonSelectionChecker = (r: string) => {
        if (r === updatedReason) return true;
        else return false;
    };

    const sendClickHandler = () => {
        let statusText = "";
        if (updatedPrice !== price) {
            statusText = "Price updated";
            dispatch(updateOrderItemOldPrice({ id, updatedOldPrice: price }));
            dispatch(updateOrderItemPrice({ id, updatedPrice }));
        }
        if (updatedQuantity !== quantity) {
            statusText = "Quantity updated";
            dispatch(updateOrderItemOldQuantity({ id, updatedOldQuantity: quantity }));
            dispatch(updateOrderItemQuantity({ id, updatedQuantity }));
        }
        if (updatedTotalPrice !== total_price) {
            dispatch(updateOrderItemOldTotalPrice({ id, updatedOldTotalPrice: total_price }));
            dispatch(updateOrderItemTotalPrice({ id, updatedTotalPrice }));
        }
        if (updatedReason !== reason) dispatch(updateOrderItemReason({ id, updatedReason }));

        if (updatedPrice !== price && updatedQuantity !== quantity) {
            statusText = "Quantity and Price updated";
        }
        if (updatedPrice !== price || updatedQuantity !== quantity) {
            dispatch(updateOrderItemStatus({ id, text: statusText, type: "green" }));
        }

        dispatch(updateEditModalId(null));
    };

    const reasons = [
        "Missing product",
        "Quantity is not the same",
        "Price is not the same",
        "Other",
    ];

    return (
        <StyledEditModal>
            <div className="modal-box">
                <HiOutlineXMark onClick={() => dispatch(updateEditModalId(null))} />
                <div>
                    <h2>{name}</h2>
                    <p>{brand}</p>
                    <div className="product-box">
                        <img className="product-image" src={image} alt="product_image" />
                        <div className="price-quantity-box">
                            <div>
                                <div className="title">Price ($)</div>
                                <input
                                    className="edit-price-input"
                                    type="number"
                                    min="0"
                                    max="10000"
                                    pattern="\b(0|[1-9]\d{0,3}|10000)\b"
                                    value={updatedPrice}
                                    onChange={(e) =>
                                        setUpdatedPrice(
                                            Math.abs(Number(Number(e.target.value).toFixed(2)))
                                        )
                                    }
                                />
                                <p className="weight-unit"> / {weight}</p>
                            </div>
                            <div>
                                <div className="title">Quantity</div>
                                <button
                                    onClick={() =>
                                        setUpdatedQuantity((q) => {
                                            if (q === 0) return 0;
                                            else return q - 1;
                                        })
                                    }
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    max="10000"
                                    pattern="\b(0|[1-9]\d{0,3}|10000)\b"
                                    value={updatedQuantity}
                                    onChange={(e) =>
                                        setUpdatedQuantity(
                                            Math.abs(Math.round(Number(e.target.value)))
                                        )
                                    }
                                />
                                <button onClick={() => setUpdatedQuantity((q) => Math.abs(q + 1))}>
                                    +
                                </button>
                                <p className="weight-unit"> x {weight}</p>
                            </div>
                            <div>
                                <div className="title">Total</div>
                                <div className="total-price">${updatedTotalPrice}</div>
                            </div>
                        </div>
                    </div>
                    <h4>
                        Choose reason <span>(optional)</span>
                    </h4>
                    <div className="reasons">
                        {reasons.map((reason) => (
                            <ToggleText
                                key={Math.round(Math.random() * 10000)}
                                selected={reasonSelectionChecker(reason)}
                                onClick={() => setUpdatedReason(reason)}
                            >
                                {reason}
                            </ToggleText>
                        ))}
                    </div>
                </div>
                <div className="lower-btns">
                    <span onClick={() => dispatch(updateEditModalId(null))}>Cancel</span>
                    <Button onClick={sendClickHandler}>Send</Button>
                </div>
            </div>
        </StyledEditModal>
    );
};

export default EditModal;
