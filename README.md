# Glossy wheels API

Welcome to the Glossy wheels API! This API lets you manage and interact with our glossy wheels project. You can use it to perform various operations related to car washing, such as creating services, managing services, and querying service details. Also, there is a slot system. Admin can generate slots for services.

## Technology

-   TypeScript
-   Express
-   Mongoose
-   Zod
-   Cors
-   JWT

## Base URL

The base URL for the API is: https://glossy-wheels-api.vercel.app/

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/RakibMojumder/car-wash-booking-system-L2-3.git
cd car-wash-booking-system-L2-3
```

Install the dependencies:

```bash
pnpm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

## Commands

Running in development:

```bash
pnpm start:dev
```

Running in production:

```bash
# build
pnpm build
# start
pnpm start:prod
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
PORT=
NODE_ENV=
BCRYPT_SALT_ROUNDS=
SERVER_URL=
CLIENT_URL=
MONGODB_URI=

JWT_ACCESS_TOKEN=
JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_TOKEN=
JWT_REFRESH_EXPIRES_IN=

# Cloudinary config
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=

# Payment gateway configuration
AMAR_PAY_BASE_URL=
AMAR_PAY_STORE_ID=
AMAR_PAY_SIGNATURE_Key=
```

## Project Structure

```

src\
 app\
 |--config\         # Environment variables and configuration
 |--modules\        # All modules for the project
 |--middlewares\    # Custom express middlewares
 |--errors\         # App error and other error configuration
 |-- routes         # Main entry points for all routes in the app
 |--utils\          # Utility classes and functions
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST api/v1/auth/create-user` - Signup\
`POST api/v1/auth/login` - Signin\
`POST api/v1/auth/refresh-tokens` - Refresh auth password email\

**User routes**:\
`GET api/v1/users` - Get all users\
`GET api/v1/users/login-user` - Get login user\
`PATCH api/v1/users` - Update user

**Bookings routes**:\
`POST api/v1/bookings` - Create a booking\
`GET api/v1/bookings/my-bookings` - Get all my bookings\
`POST api/v1/bookings` - Get all bookings

**Payment routes**:\
`POST api/v1/payment/success` - Payment success routes
`POST api/v1/payment/failed` - Payment failed routes

**Review routes**:\
`POST api/v1/reviews/add-review` - Add review routes\
`GET api/v1/reviews` - Get all reviews routes

**Service routes**:\
`POST api/v1/services` - Create services\
`POST api/v1/services/file-upload` - file upload route\
`GET api/v1/services` - Get all services\
`GET api/v1/services/:serviceName` - Get service by serviceName\
`GET api/v1/services/:id` - Update service\
`GET api/v1/services/:id` - Delete service

**Slot routes**:\
`POST api/v1/slots` - Add slot routes\
`GET api/v1/slots` - Get all slot\
`GET api/vq/slots/availability` - 'Get all available slots

## License

[MIT](LICENSE)
