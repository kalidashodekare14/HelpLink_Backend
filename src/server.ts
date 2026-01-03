import app from './app';
import { connectdb } from './config/db';
import { config } from './config/env';


connectdb();


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})
