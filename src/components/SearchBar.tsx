import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { getOrderDetails, updateSearchedOrderDetails } from "../app/services/orderSlice";

const StyledSearchBar = styled.div`
    position: relative;
    display: inline-block;
    input {
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 20px;
        height: 40px;
        width: 460px;
        padding: 10px 20px;
        &:focus {
            outline: 2px solid #1c633f;
        }
    }
    .search-icon {
        height: 25px;
        width: 25px;
        position: absolute;
        top: 8px;
        right: 15px;
    }
`;

const SearchBar: FC = () => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useAppDispatch();
    const { order_items } = useTypedSelector(getOrderDetails);

    useEffect(() => {
        const search_txt = searchText.replace(/\s+/g, " ").trim().toLowerCase();
        const search_result = order_items.filter(
            ({
                name,
                brand,
                price,
                old_price,
                quantity,
                old_quantity,
                weight,
                total_price,
                old_total_price,
                statusText,
            }) => {
                if (
                    name.toLowerCase().includes(search_txt) ||
                    brand.toLowerCase().includes(search_txt) ||
                    String(price).includes(search_txt) ||
                    String(old_price).includes(search_txt) ||
                    String(quantity).includes(search_txt) ||
                    String(old_quantity).includes(search_txt) ||
                    weight.toLowerCase().includes(search_txt) ||
                    String(total_price).includes(search_txt) ||
                    String(old_total_price).includes(search_txt) ||
                    statusText.toLowerCase().includes(search_txt)
                )
                    return true;
            }
        );
        dispatch(updateSearchedOrderDetails(search_result));
    }, [dispatch, order_items, searchText]);

    return (
        <StyledSearchBar className="search-wrapper">
            <input
                placeholder="Search...."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <IoIosSearch className="search-icon" fill="#919191" />
        </StyledSearchBar>
    );
};

export default SearchBar;
