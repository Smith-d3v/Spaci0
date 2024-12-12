/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Spacio_owner:GogaMBVc15EH@ep-raspy-snowflake-a22zsl9v.eu-central-1.aws.neon.tech/Spacio?sslmode=require',
    }
  };