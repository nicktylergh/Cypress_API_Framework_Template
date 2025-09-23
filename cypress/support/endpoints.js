// ***********************************************************
// Centralized API Endpoints
// ***********************************************************
//
// Define all base URLs and endpoints here.
// Use Cypress.env() so they can switch between QA/Prod easily.
// ***********************************************************

// Example base URL (set in cypress.env.json)
export const BASE_URL = Cypress.env("BASE_URL") || "https://api.example.com";

// Example service APIs
export const USER_API_URL = `${BASE_URL}/users/v1`;
export const ORDERS_API_URL = `${BASE_URL}/orders/v1`;
export const PAYMENTS_API_URL = `${BASE_URL}/payments/v1`;

// Example endpoints
export const CREATE_USER_ENDPOINT = `${USER_API_URL}/create`;
export const GET_USER_ENDPOINT = (userId) => `${USER_API_URL}/${userId}`;

export const CREATE_ORDER_ENDPOINT = `${ORDERS_API_URL}/create`;
export const GET_ORDER_ENDPOINT = (orderId) => `${ORDERS_API_URL}/${orderId}`;

export const PROCESS_PAYMENT_ENDPOINT = `${PAYMENTS_API_URL}/process`;
