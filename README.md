<h1>NestJS Kafka Microservice Tutorial</h1>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project demonstrates how to build a Kafka-based microservice architecture using [Nest](https://github.com/nestjs/nest). In this tutorial, we also utilize Kafdrop for better data investigation and Kafka topic monitoring.

## Prerequisites

Node.js (version 16.x or later) </br>
Docker installed and running on your system

## Getting Started

Step 1: Set up Kafdrop for Kafka Monitoring
Kafdrop is a web UI for viewing Kafka topics, consumer groups, messages, and brokers. Here's how you can set it up:

Clone the Kafdrop repository:

```bash
git clone https://github.com/obsidiandynamics/kafdrop.git
```

Navigate to the docker-compose folder in the cloned Kafdrop repository:

```bash
cd kafdrop/docker-compose/kafka-kafdrop
```

Start Kafdrop and Kafka:

```bash
docker-compose up
```
or
```bash
docker compose up
```

This will start Kafka on port 9092 and Kafdrop on port 9000.

Verify Kafdrop is running:
Open your browser and navigate to http://localhost:9000. You should see the Kafdrop UI loaded and ready for Kafka monitoring.

## Step 2: Set up the NestJS Kafka Microservice

Clone this repository:

```bash
git clone https://github.com/Dharmil1225/nest_kafka_microservice.git
```

Install dependencies: Navigate to the project directory and run the following command to install all necessary dependencies:

```bash
npm install
```

Create a .env file in the root directory of the project and configure it as per the example.env file provided in the repository.

Start the application in development mode:

```bash
npm run start:dev
```

Step 3: Verify the Setup
Once the microservice is running, you can monitor Kafka topics and data through Kafdrop by visiting http://localhost:9000 in your browser.

<h3>API Endpoints</h3>

User Service: http://localhost:{port}/user-service/ </br>
Order Service: http://localhost:{port}/order-service/ </br>
Billing Service: http://localhost:{port}/billing-service/ </br>

<h3>Additional Information</h3>
The Kafka server will be running on port 9092, and the Kafdrop UI can be accessed at http://localhost:9000 for inspecting Kafka topics, partitions, and consumer groups.


## Happy coding!
