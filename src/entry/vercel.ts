import app from '../app';
import { connectdb } from '../config/db';
import { VercelRequest, VercelResponse } from "@vercel/node"





export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    await connectdb();
    return app(req, res);
}