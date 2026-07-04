import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { logger } from './utils/logger.js';
import db from './database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables from the backend folder
dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Validate Environment Variables
    if (!process.env.JWT_SECRET) {
      throw new Error('FATAL: JWT_SECRET environment variable is missing from the configuration.');
    }

    logger.info('Testing database connectivity...');
    // Attempt database verification select
    await db.raw('SELECT 1+1 AS result');
    logger.info('MySQL Connection established and pooled successfully.');

    app.listen(PORT, () => {
      logger.info(`HRMS Backend REST API running in [${process.env.NODE_ENV || 'development'}] mode on port ${PORT}`);
    });
  } catch (err) {
    logger.error('FATAL: Failed to start the server environment:', err);
    // Graceful exit
    process.exit(1);
  }
};

startServer();
