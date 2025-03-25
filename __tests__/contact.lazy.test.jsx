import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Route } from '../src/routes/contacts.lazy';

const queryClient = new QueryClient();

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

test('can submit contact form', async () => {

   fetchMock.mockResponse(JSON.stringify({ status: "ok" }));
   const screen = render(
        <QueryClientProvider client={queryClient}>
             <Route.options.component />
        </QueryClientProvider>
     );
     const name = screen.getByPlaceholderText("Name");
     const email = screen.getByPlaceholderText("Email");
     const message = screen.getByPlaceholderText("Message");

     const testData = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        message: 'This is a test message'
     };

     const button = screen.getByRole("button");
     button.click();
     const h3 = await screen.findByRole("heading", { level: 3});
     expect(h3.innerText).toContain("Thank you for your message!");       
});