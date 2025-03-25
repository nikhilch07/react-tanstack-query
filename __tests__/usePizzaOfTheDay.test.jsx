import { expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import createFetchMock from 'vitest-fetch-mock';
import { usePizzaOfTheDay } from '../src/hooks/usePizzaOfTheDay';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

const testPizza = { 
    id: "calabrese",
    name: "The Calabrese Pizza",
    catefory: "vegetarian",
    description: "A delicious vegetarian pizza",
    image: "/public/pizzas/calabrese.jpg",
    size: { S: 12.25, M: 16.25, L: 20.25 },
};

test("gives null when first called", () => {
    fetchMock.mockResponse(JSON.stringify(testPizza));
    const { result } = renderHook(() => usePizzaOfTheDay());
    expect(result.current).toBe(null);
})

test(" to call the APIand give back the pizza of the day", async () => {
    fetchMock.mockResponse(JSON.stringify(testPizza));
    const { result, waitForNextUpdate } = renderHook(() => usePizzaOfTheDay());
    await waitFor( () => {
        expect(result.current).toEqual(testPizza);
    })
    expect(fetchMock).toBeCalledWith("/api/pizza-of-the-day");
});