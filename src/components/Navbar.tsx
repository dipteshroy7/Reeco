import { FC } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { useTypedSelector } from "../app/store";
import { getOrderDetails } from "../app/services/orderSlice";

const StyledNavbar = styled.nav`
    height: 60px;
    background-color: #1c633f;
    color: #fff;
    font-size: 18px;
    .container {
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
    .nav-left-section {
        display: flex;
    }
    .nav-left-section > p {
        margin-left: 70px;
        line-height: 60px;
        cursor: pointer;
    }
    .nav-left-section > p:hover {
        text-decoration: underline;
    }
    .nav-right-section {
        display: flex;
        align-items: center;
    }
    .nav-right-section > div {
        cursor: pointer;
    }
    .cart-icon {
        margin-right: 65px;
        position: relative;
    }
    .cart-icon > svg {
        transform: scale(-1.5, 1.5);
    }
    .logo {
        width: 80px;
        cursor: pointer;
    }
`;

const CartCount = styled.div`
    background-color: #3eca72;
    font-size: 10px;
    padding: 4px;
    border-radius: 20px;
    position: absolute;
    height: 20px;
    min-width: 20px;
    left: -12px;
    top: -10px;
    z-index: 2;
    text-align: center;
`;

const Navbar: FC = () => {
    const data = useTypedSelector(getOrderDetails);
    const cartCount = data.order_items.length;

    return (
        <StyledNavbar>
            <div className="container">
                <div className="nav-left-section">
                    <img className="logo" src="/logo.svg" alt="logo" />
                    <p>Store</p>
                    <p>Orders</p>
                    <p>Analytics</p>
                </div>
                <div className="nav-right-section">
                    <div className="cart-icon">
                        <CartCount>{cartCount}</CartCount>
                        <BsCart2 />
                    </div>
                    <div>
                        Hello, {data.user_name}
                        <FaAngleDown />
                    </div>
                </div>
            </div>
        </StyledNavbar>
    );
};

export default Navbar;
