# Chat app
This repo is a simple chat application that includes these features below
- [x] Users can register and login.
- [ ] Users can view and edit their profile.
  - [x] View display name
  - [ ] Edit display name
  - [ ] View profile picture
  - [ ] Edit profile picture
  - [x] View profile color
  - [ ] Edit profile color (if the profile picture doesn't exist will display the profile color by default)
- [ ] Users can search user for chat messages.
- [ ] Users can chat messages to other users.
- [ ] Users can chat messages in groups.

## Tech stack
- Backend - NestJs (TypeScript)
- Frontend - NextJs (TypeScript)
- Database - Postgres + Prisma
- API Contract - Swagger
- CSS Styling - Tailwind + Mui
- Unit Test - Jest

## Require
- node 16.x
- yarn
- docker

## Installation

Install package
```bash
git clone https://github.com/vixtory09678/chat-app.git
```

```bash
cd chat-app
```

```bash
yarn install
```

Run database and message broker
```bash
yarn service:up
```

Run migration
```bash
yarn db:migrate
```

## Run

Run API service
```bash
yarn api:dev
```

Run web application
```bash
yarn web:dev
```