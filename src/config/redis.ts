import { createClient } from "redis";

export const client = createClient({
    username: 'default',
    password: process.env.redisPassword!,
    socket: {
        host: process.env.redisHost,
        port: 12071
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();


