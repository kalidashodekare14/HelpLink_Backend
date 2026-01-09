import { config } from "../config/env";
import { connectdb } from "../config/db";
import app from '../app';



const startServer = async () => {
    await connectdb();
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`)
    })
}


startServer();