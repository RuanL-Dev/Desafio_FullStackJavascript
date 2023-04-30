# Full Stack JavaScript Test

## About the project

To get started:

- Install dependencies in each of the following directories: `./`, `./frontend`, `./backend`, `./payment-api`.
- Run `npm start` in the project's root directory will start all components of the application. But we do need to one more step below:
- Run `npm build` and `npm serve` in the frontend project

If there are any errors you may need to change `./.env` to pick unused ports.

## Project Structure

Initially, there was a need to install other dependencies to be able to start and perform the tasks needed in this trial.
You may see some libs added and changes made but I did an effort to don't moving files or changes unnecessarily to allow an easier review.
As asked before, the focus here was in performing the tasks.Thus, I don't change the user interface. If it would be something to add, I would try to a new Frontend project starting with ReactJs + NextJS.

The `./.env` (dotenv) file controls the port each component runs on. You may need to change this if the ports are already in use on your computer.

### frontend

`./frontend` contains a React application. 

The frontend consists of two pages:

- The main page displays a simple, tabular view of current payments.
- A form page creates a new payment.

### backend

`./backend` contains an Express server to act as a backend for the frontend. It will auto-reload when files change.

The `frontend` proxies requests for `/api/*` to the `backend` (see ./frontend/src/setupProxy.js) so the `backend` is available on the same URL.

The `backend`'s `/api/*` is responsible for making the `payment-api` available from the `frontend`.

### payment-api

`./payment-api` contains a simple Express server to simulate an internal API. It will auto-reload when files change.

The payment API consists of two endpoints:

- GET /api/payments - returns a list of existing payments
- POST /api/payments - creates a new payment

The payment data are stored in memory. So you will need to creat new payment data to see the changes.

