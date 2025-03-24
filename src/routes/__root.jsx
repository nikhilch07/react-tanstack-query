import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";
import { CartContext } from "../context/cartContext";

export const Route = createRootRoute({
    component: () => {
        const cartHook = useState([]);
        return ( 
            <>
            <CartContext.Provider value={cartHook}>
                <Header />
                <Outlet />
                <PizzaOfTheDay />
                </CartContext.Provider>
                <TanStackRouterDevtools />
                <ReactQueryDevtools />
            </>
        );
    },
});



