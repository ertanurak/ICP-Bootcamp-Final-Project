# Final Project - Motoko Implementation for Internet Computer (ICP)

## Description

This project is an implementation for the Internet Computer (ICP) using the Motoko programming language. The main purpose of this project is to create a decentralized registry system where users can register themselves for various purposes and seek help if needed. The back-end is implemented in Motoko, providing functionalities to register users, manage requests for assistance, and facilitate the interaction between users and the system.

## Back-end Functionality
The back-end of the project, implemented in Motoko, serves as the core functionality provider. It includes the following key features:

## Registry Actor
The Registry actor manages the registration process and maintains the database of registered persons and their requests for assistance.

## Registration Process
Users can register themselves by providing their personal information such as name, surname, TC No (Turkish Identity Number), and reason for registration.

## Request Management
Users can submit requests for assistance, which are stored along with their personal information. Each request includes details about the person and whether it is opened or closed.

## Listing Registered Persons
The system allows for listing all registered persons, providing transparency and accessibility to the registered user database.

## Listing Helped Persons
Users can also view the list of persons who have been helped, along with their respective details.

## Sending Help
The system enables users to send help to registered persons in need, updating the request status accordingly.

## Usage
To use this project, follow the provided instructions below:

**1- Start the Internet Computer Environment:**
    dfx start --clean

**2- Create Canisters:**
    dfx canister create --all
  
**3- Build the Project:**
    dfx build

**4- Install Canisters:**
    dfx canister install --all

**5- Install Required Packages:**
    npm install @mui/material @emotion/react @emotion/styled

**6- Start the Application:**
    npm start
  
Once the environment is set up and the commands are executed, users can access the front-end application, register themselves, view registered persons and their requests, and provide assistance as needed.

By leveraging Motoko and the Internet Computer, this project aims to create a decentralized and transparent system for managing registrations and assistance requests, promoting community engagement and support.
