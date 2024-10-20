import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors({
  origin: 'https://movie-frontend-zeta.vercel.app'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', async (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Page</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background-color: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 500px;
          width: 90%;
        }
        header {
          background-color: #6e8efb;
          color: white;
          padding: 20px;
          font-size: 28px;
          border-radius: 10px;
        }
        h1 {
          font-size: 36px;
          color: #333;
        }
        p {
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }
        .btn {
          background-color: #6e8efb;
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .btn:hover {
          background-color: #5a75e0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>Welcome to My Beautiful Page</header>
        <main>
          <h1>Hello, World!</h1>
          <p>This page is designed to look modern and clean, with smooth gradients and easy-to-read typography.</p>
          <button class="btn">Explore More</button>
        </main>
      </div>
    </body>
    </html>
  `);
});
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

//test