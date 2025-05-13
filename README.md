# Smart Sensor Backend - NestJS

This is the backend server for the Smart Sensor System. It listens to MQTT sensor data, logs actions into PostgreSQL, and communicates with the frontend via WebSocket.

## ⚙️ Features

- 📥 MQTT message listener (`sensor/data` topic)
- 🧾 PostgreSQL logging with TypeORM
- 🌐 REST API for admin log access
- 🧠 WebSocket gateway for pushing live updates
- 🔐 JWT-based user authentication
- 🛡️ Admin-only log access
- 🔎 Log analysis with most frequent actions

## 🧰 Technologies Used

- NestJS
- TypeORM
- PostgreSQL
- MQTT
- WebSocket (Socket.io)
- JWT Auth

## ▶️ How to Run

```bash
cd patrion-backend
npm install
npm run start:dev

```
