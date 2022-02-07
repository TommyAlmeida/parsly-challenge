# Parsly Challenge

Somewhat missing better UI features like pagination, table header filtering and better dynamic charts but here it goes!

FYI: There's a folder called "parsly-extra-yet-cool" which is not part of the challenge but since I'm doing a monitoring Rest/UI challenge I might as well include some cool Prometheus and Grafana metrics.

#### Tech Used:

- NestJS
- Gatsby
- Typescript
- Postgres
- React
- Docker

## Installation

The challenge requires [Node.js](https://nodejs.org/) v14+ to run.

### 1st: Run the rest-api

- Go to the parsly-rest-api folder
- Run the following commands by its order:
  - `docker-compose -f docker-compose.dev.yml up -d`
  - `npm run install --force ; npx prisma generate ; npx prisma migrate dev ; npm run start:dev`
- Api docs on http://localhost:3000/api/docs
- Rest api on http://localhost:3000/

### 2nd: Run the frontend

- Go to the parsly-monitoring-ui folder
- Run the following commands by its order:
  - `npm run install --force ; npm run develop`
- Navigate to http://localhost:8000

### 3rd: In case you want to see the beauty of prometheus and grafana:

- Go to the parsly-extra-yet-cool folder
- Run the following commands by its order:
  - `docker-compose -f docker-compose.yml up -d`
- Navigate to http://localhost:80
- Default login
  - User: admin
  - Pw: admin
- Go to dashboards and import the postgres-dashboard.json located on "parsly-extra-yet-cool\grafana\provisioning\dashboards\postgresql-database.json"

# Enjoy :)
