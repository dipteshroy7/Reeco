import { FC } from "react";
import styled from "styled-components";
import { HiOutlineXMark } from "react-icons/hi2";
import { useAppDispatch, useTypedSelector } from "../app/store";
import {
    getOrderDetails,
    updateMissingModalId,
    updateOrderItemStatus,
} from "../app/services/orderSlice";

const StyledMissingModal = styled.div`
    z-index: 99999;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    border: 0;
    background-color: #00000066;

    .modal-box {
        height: 200px;
        width: 400px;
        border-radius: 3px;
        padding: 40px 30px;
        background-color: #fff;
        margin: calc(50vh - 100px) calc(50vw - 200px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .modal-upper {
            & > h3 {
                margin-bottom: 15px;
            }
            & > .modal-product {
                font-size: 15px;
                color: #666;
                & > span {
                    vertical-align: middle;
                    max-width: 240px;
                    display: inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            & > svg {
                height: 25px;
                width: 25px;
                position: absolute;
                top: 37px;
                right: 27px;
                cursor: pointer;
            }
        }
        .modal-lower {
            text-align: right;
            & > b {
                margin-left: 45px;
                cursor: pointer;
            }
        }
    }
`;

interface MissingModalProps {
    id: number;
}

const MissingModal: FC<MissingModalProps> = ({ id }) => {
    const { order_items } = useTypedSelector(getOrderDetails);
    const dispatch = useAppDispatch();
    const missingHandler = (id: number) => {
        const text = "Missing";
        const type = "orange";
        dispatch(updateOrderItemStatus({ id, text, type }));
        dispatch(updateMissingModalId(null));
    };
    const missingUrgentHandler = (id: number) => {
        const text = "Missing - Urgent";
        const type = "red";
        dispatch(updateOrderItemStatus({ id, text, type }));
        dispatch(updateMissingModalId(null));
    };
    return (
        <StyledMissingModal>
            <div className="modal-box">
                <div className="modal-upper">
                    <h3>Missing product</h3>
                    <div className="modal-product">
                        Is '<span>{order_items[id].name}</span>' urgent?
                    </div>
                    <HiOutlineXMark onClick={() => dispatch(updateMissingModalId(null))} />
                </div>
                <div className="modal-lower">
                    <b onClick={() => missingHandler(id)}>No</b>
                    <b onClick={() => missingUrgentHandler(id)}>Yes</b>
                </div>
            </div>
        </StyledMissingModal>
    );
};

export default MissingModal;
