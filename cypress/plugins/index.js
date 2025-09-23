/// <reference types="cypress" />
// ***********************************************************
// Plugins file for Cypress
// ***********************************************************
//
// Example tasks you can hook into Cypress:
// - Connect to SQL DB
// - Query MongoDB
// - Upload files to AWS S3
//
// These are placeholders — replace with your own project logic.
// ***********************************************************

const sql = require("mssql");
const { MongoClient } = require("mongodb");
const AWS = require("aws-sdk");
const XLSX = require("xlsx");

// --- Example MSSQL query ---
function queryTestDb(query, config) {
  const sqlConfig = {
    user: config.env.MSSQL_USERNAME || "your-username",
    password: config.env.MSSQL_PASSWORD || "your-password",
    server: config.env.MSSQL_SERVER || "localhost",
    port: 1433,
    database: config.env.MSSQL_DATABASE || "your-database",
    trustServerCertificate: true,
  };

  return sql.connect(sqlConfig).then((pool) => pool.request().query(query));
}

// --- Example MongoDB client ---
async function initializeMongoClient(config) {
  const uri = config.env.MONGO_DB_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client;
}

// --- Example MongoDB query ---
async function findDocuments({ documents, dbName, collectionName, config }) {
  const client = await initializeMongoClient(config);
  try {
    const db = client.db(dbName || "testDB");
    return await db.collection(collectionName || "testCollection").find(documents).toArray();
  } finally {
    await client.close();
  }
}

// --- Example AWS S3 upload ---
async function uploadToS3({ documents, currentDateWithTime, config }) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(documents || []);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const fileName = `sample-upload-${currentDateWithTime || Date.now()}.xlsx`;
  const fileBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const s3 = new AWS.S3({
    accessKeyId: config.env.AWS_ACCESS_KEY_ID || "your-access-key",
    secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY || "your-secret-key",
    region: config.env.AWS_REGION || "us-west-2",
  });

  const params = {
    Bucket: config.env.S3_BUCKET_NAME || "your-bucket",
    Key: fileName,
    Body: Buffer.from(fileBuffer),
    ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };

  return s3.putObject(params).promise();
}

module.exports = (on, config) => {
  on("task", {
    queryDb: (query) => queryTestDb(query, config),
    findDocuments: (args) => findDocuments({ ...args, config }),
    uploadToS3: (args) => uploadToS3({ ...args, config }),
  });
};
