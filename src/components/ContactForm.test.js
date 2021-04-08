import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
    
});

test('renders the contact form header', ()=> {
    render(<ContactForm />) 
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);

    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText("First Name*")

    userEvent.type(firstName, "Al")

    const errors = await screen.findAllByText(/error/i)
    
    expect(errors.length).toEqual(1)

    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button")

    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i)

    expect(errors.length).toEqual(3)
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText("First Name*");
    const lastName = screen.getByLabelText("Last Name*");
    const button = screen.getByRole("button")

    userEvent.type(firstName, "Craig")
    userEvent.type(lastName, "Gerhardstein")
    userEvent.click(button)

    const error = await screen.findAllByText(/error/i)

    expect(error.length).toEqual(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const email = screen.getByLabelText("Email*")
    console.log(email)
    

    userEvent.type(email, "Hello")
    

    const error= await screen.findByText(/email must be a valid email address/i)

    expect(error).toBeInTheDocument()
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
  
  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, "Craig");
  
  const email = screen.getByLabelText(/Email*/i);
  userEvent.type(email, "Craigh@Craig.com");
  
  const button = screen.getByRole("button");
  userEvent.click(button);
  
  const error = await screen.queryByText(/lastName is a required field./);
  
  expect(error).toBeInTheDocument();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByPlaceholderText("Edd");
    userEvent.type(firstName, "Craig");
    const lastName = screen.getByPlaceholderText("Burke");
    userEvent.type(lastName, "Gerhardstein");
    const email = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    userEvent.type(email, "cgerhardstein@live.com");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const message = await screen.queryByTestId("messageDisplay");
    expect(message).not.toBeInTheDocument();
    const firstNameSubmission = await screen.findByTestId("firstnameDisplay");
    const lastNameSubmission = await screen.findByTestId("lastnameDisplay");
    const emailSubmission = await screen.findByTestId("emailDisplay");
  
    expect(firstNameSubmission).toBeInTheDocument();
    expect(lastNameSubmission).toBeInTheDocument();
    expect(emailSubmission).toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
  const firstName = screen.getByPlaceholderText("Edd");
  userEvent.type(firstName, "Craig");
  const lastName = screen.getByPlaceholderText("Burke");
  userEvent.type(lastName, "Gerhardstein");
  const email = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  userEvent.type(email, "cgerhardstein@live.com");
  const message = screen.getByLabelText("Message");
  userEvent.type(message, "Hey!");
  const button = screen.getByRole("button");
  userEvent.click(button);
  const messageSubmission = await screen.findByTestId("messageDisplay");
  const firstNameSubmission = await screen.findByTestId("firstnameDisplay");
  const lastNameSubmission = await screen.findByTestId("lastnameDisplay");
  const emailSubmission = await screen.findByTestId("emailDisplay");

  expect(messageSubmission).toBeInTheDocument();
  expect(firstNameSubmission).toBeInTheDocument();
  expect(lastNameSubmission).toBeInTheDocument();
  expect(emailSubmission).toBeInTheDocument();
    
});