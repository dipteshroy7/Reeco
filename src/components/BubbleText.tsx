import { FC } from "react";
import styled from "styled-components";
import type { textColor } from "../app/services/orderApi";

const StyledBubbleText = styled.div`
    padding: 10px 15px;
    color: #fff;
    border-radius: 30px;
    display: inline-block;
    text-align: center;
    &.green {
        background-color: #3eca72;
    }
    &.orange {
        background-color: #f66d45;
    }
    &.red {
        background-color: #db2114;
    }
`;

interface BubbleTextProps {
    children: string;
    color: textColor | undefined;
}

const BubbleText: FC<BubbleTextProps> = ({ children, color }) => {
    return <StyledBubbleText className={color}>{children}</StyledBubbleText>;
};

export default BubbleText;
