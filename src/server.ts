import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () =>
        console.log(`Server running on port ${config.port}`)
    );
}

process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1);
});

main();
