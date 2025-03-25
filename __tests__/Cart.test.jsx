import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Cart from '../src/Cart';

test("snapshot with nothing in cart", () => {
    const { asFragment } = render(<Cart cart={[]} />);
    expect(asFragment()).toMatchSnapshot();
});

test("snapshot with items in cart", () => {
    
    const cart = [
        {
            pizza: {
                name: "Pizza 1",
                sizes: {
                    S: 10,
                    M: 15,
                    L: 20
                }
            },
            pizzaSize: "S"
        },
        {
            pizza: {
                name: "Pizza 2",
                sizes: {
                    S: 10,
                    M: 15,
                    L: 20
                }
            },
            pizzaSize: "M"
        }
    ];
    const { asFragment } = render(<Cart cart={cart} />);
    expect(asFragment()).toMatchSnapshot();
});
