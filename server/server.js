import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import Sequelize instance + models
import { sequelize } from "./models/index.js";

// Import Routes
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());

// Static images (if you later upload product images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("OvenOracle API is running...");
});


app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(" MySQL Connected Successfully");

    // Sync all models to DB
    await sequelize.sync({ alter: true });
    console.log(" Database Synced");

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

startServer();
