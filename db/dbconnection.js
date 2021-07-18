const { MongoClient } = require("mongodb");



const createrecords = async function main(data) {
    const uri =
  "mongodb+srv://IOTProject:g7fGHthZqV2cz8E@cluster0.wzs74.mongodb.net/IOTProjectDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    // Connect to the MongoDB cluster
    await client.connect();

   await client.db("IOTProjectDB").collection("ScanResultsReal").insertOne(data);
   //await findOneListingByName(client)

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};



module.exports = createrecords
