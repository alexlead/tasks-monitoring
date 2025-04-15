# TASK MONITORING APP

## Technologies
- Node.js
- Express.js
- React
- Typescript
- PostgreSQL

## Installation 

Create file `.env` in main folder
Fill the files with the following variables

```
POSTGRES_DB=your-db-name
POSTGRES_USER=your-db-root
POSTGRES_PASSWORD=your-pass
POSTGRES_PORT=your-db-port-number
APP_PORT_HOST=port-number
```

Build the app with following command
`docker-compose up --build`
## Uninstallation
Uninstall the app with the command
`docker-compose down`

## Run App
Below is a command for running the app
`docker-compose up`

### Work with the app through a Browser 
The port-number you set in `.env` file, please use it for below URL:
`http://localhost:${port-number}`


## Description
