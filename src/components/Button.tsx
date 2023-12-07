import { FC } from "react";
import styled from "styled-components";
import { StyleSheetManager } from "styled-components";
import isValidProp from "@emotion/is-prop-valid";

const StyledButton = styled.button<ButtonProps>`
    padding: 10px 20px;
    font-size: 14px;
    background-color: ${({ inverted }) => (inverted ? "#fff" : "#1c633f")};
    color: ${({ inverted }) => (inverted ? "#1c633f" : "#fff")};
    font-weight: bold;
    border: 2px solid #1c633f;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
        background-color: ${({ inverted }) => (inverted ? "#ececec" : "#14492f")};
        border-color: #14492f;
    }
    &.disabled {
        background-color: #707070;
        color: #fff;
        border-color: #707070;
        cursor: not-allowed;
    }
    &.disabled:hover {
        background-color: #707070;
        border-color: #707070;
    }
`;

interface ButtonProps {
    children: string;
    inverted?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, inverted = false, disabled = false, onClick }) => {
    return (
        <StyleSheetManager shouldForwardProp={(propName) => isValidProp(propName)}>
            <StyledButton
                className={disabled ? "disabled" : ""}
                inverted={inverted}
                onClick={onClick}
            >
                {children}
            </StyledButton>
        </StyleSheetManager>
    );
};

export default Button;
