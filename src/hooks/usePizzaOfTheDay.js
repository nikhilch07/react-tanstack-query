import { useState, useEffect } from "react";
 
export const usePizzaOfTheDay = () => {
    const [ pizzaOfTheDay, setPizzaOfTheDay ] = useState(null);

    useEffect(() => {
        fetchPizzaOfTheDay();
    }, []);

    const fetchPizzaOfTheDay = async () => {
        const response = await fetch("/api/pizza-of-the-day");
        const responseJson = await response.json();
        setPizzaOfTheDay(responseJson);
    };

    return pizzaOfTheDay;
};