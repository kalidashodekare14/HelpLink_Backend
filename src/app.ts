import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();


app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`
        <div>
          <h1>HelpLink Backend Running 🚀</h1>
            <p>🎉 Welcome to the HelpLink</p>
        </div>    
    `)
})

export default app;