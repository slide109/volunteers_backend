## Description

Volunteers project backend build on [NestJS](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

## Configuration

Create `.env` file from `.env.example`

```env
# Application port
APP_PORT=3000

# Twilio credentials
TWILIO_ACCOUNT_SID='***'
TWILIO_AUTH_TOKEN='***'
TWILIO_NUMBER='***'
TWILIO_PHONE_NUMBER_SID='***'
TWILIO_SMS_SERVICE_SID='***'

# Database credentials
MONGO_DB_URI='***'
MONGO_DB_USER='***'
MONGO_DB_PASSWORD='***'

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)
