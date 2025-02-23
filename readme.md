# Classify - Course Management System

Welcome to **Classify**! This is a course management system designed to provide an intuitive way to manage and sell online courses.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nicolasgcode/dsw-tp-backend
cd dsw-tp-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file by copying the example provided in the root directory of the project:

```bash
cp .env.example .env
```

Set up Stripe Private Key

To connect the app with Stripe, you’ll need to obtain a private API key for Stripe.

1. If you don’t have a Stripe account, [sign up here](https://dashboard.stripe.com/register) 
2. Once you’re logged in, go to your Stripe Dashboard and find the API keys section under Developers → API keys.
3. Use the Secret Key and paste it into the .env file:

```
STRIPE_PRIVATE_KEY=your_stripe_private_key
```
Generate the JWT Secret

Run the following command to generate a JWT secret and store it in the .env file:

```bash
npm run secret
```

This will automatically generate the JWT_SECRET in the .env file.

Replace any other placeholder values in the .env file with the appropriate values.

### 4. Install Stripe CLI
To handle Stripe events (like payments), you need to install the Stripe CLI.

1. Follow the Stripe CLI installation guide [Stripe CLI Installation Guide](https://docs.stripe.com/stripe-cli?install-method=homebrew)

2. After installation, authenticate the Stripe CLI by running:
   
```bash
stripe login
```

Once logged in, you can start listening for Stripe events by running the following command, replacing your_server_url and port with your local server details:

```bash
stripe listen --forward-to http://your_server_url:port/api/webhook
```

Use the Webhook Secret provided after the above command, and add it to your .env file:

```bash
STRIPE_WH_SECRET=your_stripe_wh_secret
```

### 5. Run the App

```bash
npm run dev
```
