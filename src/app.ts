import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { roleVerify } from "./middlewares/roleVerify";
import { adminRoutes } from "./modules/admin_portal/routes";
import { AuthRoutes } from "./modules/auth/routes";
import { donorRoutes } from "./modules/donor_portal/routes";
import { publicRoutes } from "./modules/public/routes";
import { receiverRoutes } from "./modules/receiver_portal/routes";
import { userRoutes } from "./modules/users/routes";
import { volunteerRoutes } from "./modules/volunteer_portal/routes";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://helplink-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <div>
          <h1>HelpLink Backend Running 🚀</h1>
            <p>🎉 Welcome to the HelpLink</p>
        </div>    
    `);
});

// API routes version
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/profile", userRoutes);
app.use("/api/v1/receiver", roleVerify("receiver"), receiverRoutes);
app.use("/api/v1/donor", roleVerify("donor"), donorRoutes);
app.use("/api/v1/volunteer", roleVerify("volunteer"), volunteerRoutes);
app.use("/api/v1/admin", roleVerify("admin"), adminRoutes);

export default app;
