import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AuthRoutes } from './modules/auth/routes';
import { receiverRoutes } from './modules/receiver_portal/routes';
import { donorRoutes } from './modules/donor_portal/routes';
import { userRoutes } from './modules/users/routes';

const app = express();


app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`
        <div>
          <h1>HelpLink Backend Running 🚀</h1>
            <p>🎉 Welcome to the HelpLink</p>
        </div>    
    `)
})


// API routes version
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/profile", userRoutes);
app.use("/api/v1/receiver", receiverRoutes);
app.use("/api/v1/donor", donorRoutes);

export default app;