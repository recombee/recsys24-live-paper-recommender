# RecSys 2024 Live Paper Recommender

Next.js application demonstrating [Recombee](https://www.recombee.com) recommendation capabilities by showcasing research papers from previous RecSys conferences. Created for [RecSys '24](https://recsys.acm.org/recsys24/), this project illustrates how Recombee can be used to build a full-featured recommendation system without additional backend services.

## Features

- Browse and discover RecSys conference papers
- Personalized paper recommendations
- Paper bookmarking functionality
- Similar papers recommendations
- All powered by Recombee's API

## Prerequisites

Before running the application, you'll need:

1. Docker
2. Recombee account and database
   - Sign up at [admin.recombee.com](https://admin.recombee.com/sign-up)
   - Create a new database in your desired region
   - Note down your database ID and private token

## Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/recombee/explore-papers-demo.git
cd explore-papers-demo
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Fill in your Recombee credentials in the `.env` file:

```
RECOMBEE_DB_NAME=your-database-id
RECOMBEE_DB_PRIVATE_TOKEN=your-private-token
RECOMBEE_DB_REGION=your-database-region
```

## Running the Application

### Using Docker

1. Build the Docker image:

```bash
docker build -t explore-papers-demo .
```

2. Run the container:

```bash
docker run -p 3000:3000 explore-papers-demo
```

The application will be available at `http://localhost:3000`

### Development Mode

If you prefer to run the application locally for development:

1. Install dependencies:

```bash
pnpm i --frozen-lockfile
```

2. Start the development server:

```bash
pnpm dev
```
