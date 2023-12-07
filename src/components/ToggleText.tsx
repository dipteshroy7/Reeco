import { FC } from "react";
import styled from "styled-components";

const StyledToggleText = styled.div`
    padding: 10px 15px;
    border-radius: 30px;
    border: 1px solid #e4e4e4;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    &.selected {
        background-color: #1c633f;
        color: #fff;
        border-color: #1c633f;
    }
`;

interface ToggleTextProps {
    onClick: () => void;
    children: string;
    selected: boolean;
}

const ToggleText: FC<ToggleTextProps> = ({
    onClick,
    children,
    selected = false,
}) => {
    return (
        <StyledToggleText className={selected ? "selected" : ""} onClick={onClick}>
            {children}
        </StyledToggleText>
    );
};

export default ToggleText;
