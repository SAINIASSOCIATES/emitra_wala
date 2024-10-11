import express from 'express';
import path from 'path';
import { join } from 'path';
import router from './src/routes/formRoutes.js';
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(process.cwd(),"/public")));
app.use("/", router)



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
