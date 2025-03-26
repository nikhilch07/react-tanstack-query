import { render } from 'vitest-browser-react';
import { expect, test } from 'vitest';
import Pizza from '../src/Pizza';

test('alt text renders on Pizza image', async () => {
    const name = "My Favorite Pizza";
    const src = "https://example.com/pizza.jpg";
    const description = "This is a delicious pizza!";
    const screen = render(<Pizza name={name} image={src} description={description} />);
    const img = await screen.getByRole("img");
    await expect.element(img).toBeInTheDocument();
    await expect.element(img).toHaveAttribute("src", src);
    await expect.element(img).toHaveAttribute("alt", name);
});