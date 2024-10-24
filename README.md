# Financial Dashboard

A Financial Dashboard built with Next.js, utilizing Typescript, Chakra UI, and Chart.js for data visualization, along with NextAuth for authentication. This dashboard provides a comprehensive platform for financial data visualization and management.


![Powered by Vercel](https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg)

## Screenshot

### Dashboard

https://next-finantial-dash.vercel.app

[<img alt="Dashboard" height="278" src="https://github.com/user-attachments/assets/989044b0-bf3f-466e-b581-f9536cc9240d" />](https://next-finantial-dash.vercel.app)

| Mobile (collapsed)                                                                                                                                                                        | Mobile (expand)                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |


| [<img alt="Dashboard" height="278" src="https://github.com/user-attachments/assets/6293dd2b-b305-4734-b634-01e63b2677fc" />](https://next-finantial-dash.vercel.app) | [<img alt="Dashboard" height="278" src="https://github.com/user-attachments/assets/d35c3aa6-1731-44fe-bcb0-0bb5e2664a0a" />](https://next-finantial-dash.vercel.app) |

### Login

https://financial-dashboard.vercel.app/login


[<img alt="Login" width="400" src="https://github.com/user-attachments/assets/61bb1705-c3a2-48e5-9fa3-0a368e61493c" />](https://next-finantial-dash.vercel.app/login)

## Getting Started

### Prerequisites

- **Node.js v20**
- **npm**

### Steps to initiate the repo:

1. Clone the repository:

```bash
git clone https://github.com/swttpch/next-finantial-dash
```

2. Navigate to the project folder:

```bash
cd financial-dashboard
```

3. Copy the contents from .env.example to a new file named .env:

```bash
cp .env.example .env
```

4. Generate a JWT secret:

```bash
openssl rand -base64 32
```

5. Copy the generated hash and set it in the .env file for the JWT_SECRET variable.

6. For local login during development, update the following environment variables:
```env
AUTH_EMAIL='admin'
AUTH_PASSWORD='admin'
```
Then use this credentials to login in the application.

7. Install the dependencies:

```bash
npm install
```

7. Run the development server:

```bash
npm run dev
```

8. Open http://localhost:3000 in your browser to view the app.
