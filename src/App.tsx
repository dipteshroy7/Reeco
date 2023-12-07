import { useEffect } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import { useAppDispatch } from "./app/store";
import { useGetOrderDetailsQuery } from "./app/services/orderApi.ts";
import { setOrderDetails } from "./app/services/orderSlice.ts";

const StyledApp = styled.div`
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    .container {
        margin: 0px 110px;
    }
    .mt-30 {
        margin-top: 30px;
    }
    .mt-24 {
        margin-top: 24px;
    }
    .mb-60 {
        margin-bottom: 60px;
    }
`;

function App() {
    const dispatch = useAppDispatch();
    const { data } = useGetOrderDetailsQuery();

    useEffect(() => {
        if (data) dispatch(setOrderDetails(data));
    }, [dispatch, data]);

    return (
        <StyledApp>
            <Navbar />
            <OrderPage />
        </StyledApp>
    );
}

export default App;
