import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT as string,
  database_url: process.env.DATABASE_URL as string,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
