# Parsly Challenge

Somewhat missing better UI features like pagination, table header filtering and better dynamic charts but here it goes!

FYI: There's a folder called "parsly-extra-yet-cool" which is not part of the challenge but since I'm doing a monitoring Rest/UI challenge I might as well include some cool Prometheus and Grafana metrics.

#### Tech Stack Used:

- NestJS - Backend web framework
- Typescript - Superset of JS for typings
- Postgres - Database
- Prisma - Database ORM
- Gatsby - Frontend framework
- React - UI Library
- Docker - Deployment

#### Extra Tech Stack

- Prometheus - Time series database
- Grafana - open-source dashboard

## Installation

The challenge requires [Node.js](https://nodejs.org/) v14+ to run.

### 1st: Run the rest-api

- Go to the parsly-rest-api folder
- Run the following commands by its order:
  - `docker-compose -f docker-compose.dev.yml up -d`
  - `npm i ; npx prisma generate ; npx prisma migrate dev ; npm run seed ; npm run start:dev`
- Demo user in case you dont wanna create one:
  - Email: demo@foobar.com
  - Pw: secret42
- Api docs on http://localhost:3000/api/docs
- Rest api on http://localhost:3000/

### 2nd: Run the frontend

- Go to the parsly-monitoring-ui folder
- Run the following commands by its order:
  - `npm i ; npm run develop`
- Navigate to http://localhost:8000

### 3rd: In case you want to see the beauty of prometheus and grafana:

- Go to the parsly-extra-yet-cool folder
- Run the following commands by its order:
  - `docker-compose -f docker-compose.yml up -d`
- Navigate to http://localhost:80 for grafana or http://localhost:9090 for prometheus
- Default login
  - User: admin
  - Pw: admin
- Go to dashboards / manage and select one of the available dashboards

# Enjoy :)
