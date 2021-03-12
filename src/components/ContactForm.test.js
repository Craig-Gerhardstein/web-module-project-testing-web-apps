import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
    
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i);

    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/contact form/i);
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'asdf')

    await waitFor(() => {
        expect(firstNameInput).toThrowError
    })
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
  
  const button = screen.getByRole("button");
  userEvent.click(button);
  
  const error1 = screen.queryByText(/firstName must have at least 5 characters./);
  
  const error2 = screen.queryByText(/lastName is a required field./);
  
  const error3 = screen.queryByText(/email must be a valid email address./);

 
  expect(error1).toBeInTheDocument();
  expect(error2).toBeInTheDocument();
  expect(error3).toBeInTheDocument();
}
    
);

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    
    const firstNameInput = screen.queryByLabelText(/firstname/i);
    userEvent.type(firstName, "Craig");
   
    const lastNameInput = screen.queryByLabelText(/lastname/i);
    userEvent.type(lastName, "Gerhardstein");
   
    const button = screen.getByRole("button");
    userEvent.click(button);
    
    const error = await screen.queryByText(/email must be a valid email address./);
    
    expect(error).toBeInTheDocument();
    
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
   
    const emailInput = screen.queryByLabelText(/email/i);
    userEvent.type(email, "Craig.com");
   
    const error = await screen.queryByText(/email must be a valid email address./);
    
    expect(error).toBeInTheDocument();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
  
  const firstNameInput = screen.queryByLabelText(/firstname/i);
  userEvent.type(firstName, "Craig");
  
  const emailInput = screen.queryByLabelText(/email/i);
  userEvent.type(email, "Craigh@Craig.com");
  
  const button = screen.getByRole("button");
  userEvent.click(button);
  
  const error = await screen.queryByText(/lastName is a required field./);
  
  expect(error).toBeInTheDocument();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Craig");
    const lastNInput = screen.getByPlaceholderText("Gerhardstein");
    const emailInput = screen.getByPlaceholderText("craig@craig.com");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Craig');
    userEvent.type(lastNInput, 'Gerhardstein');
    userEvent.type(emailInput, 'craig@craig.com')
    userEvent.click(submit);
    const firstN = screen.queryByTestId('firstnameDisplay');
    const lastN = screen.queryByTestId('lastnameDisplay');
    const email = screen.queryByTestId('emailDisplay');
    expect(firstN).toBeInTheDocument();
    expect(lastN).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstNInput = screen.getByPlaceholderText("Craig");
    const lastNInput = screen.getByPlaceholderText("Gerhardstein");
    const emailInput = screen.getByPlaceholderText("craig@craig");
    const messageInput = screen.getByPlaceholderText("message");
    const submit = screen.getByTestId("submit");
    userEvent.type(firstNInput, 'Craig');
    userEvent.type(lastNInput, 'Gerhardstein');
    userEvent.type(emailInput, 'craig@craig')
    userEvent.type(messageInput, 'test')
    userEvent.click(submit);
    const firstN = screen.queryByTestId('firstnameDisplay');
    const lastN = screen.queryByTestId('lastnameDisplay');
    const email = screen.queryByTestId('emailDisplay');
    const message = screen.queryByTestId('messageDisplay');
    expect(firstN).toBeInTheDocument();
    expect(lastN).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    
})