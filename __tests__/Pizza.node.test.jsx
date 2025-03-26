import { render, cleanup } from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import Pizza from '../src/Pizza';

afterEach(cleanup);

test('alt test renders on Pizza image', () => {
    const name = "My Favorite Pizza";
    const src = "https://example.com/pizza.jpg";
    const description = "This is a delicious pizza!";
    const screen = render(<Pizza name={name} image={src} description={description} />);
    const img = screen.getByRole("img");
    expect(img.src).toBe(src);
    expect(img.alt).toBe(name);
});

test('default image renders on Pizza image', () => {
    const name = "My Favorite Pizza";
    const description = "This is a delicious pizza!";
    const screen = render(<Pizza name={name} description={description} />);
    const img = screen.getByRole("img");
    expect(img.src).toBe("https://picsum.photos.com/150");
    expect(img.alt).toBe(name);
}
);