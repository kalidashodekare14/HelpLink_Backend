import app from './app';
import { connectdb } from './config/db';
import { config } from './config/env';


connectdb();


const isLocal = process.env.NODE_ENV !== "production";
if (isLocal) {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`)
    })
}


