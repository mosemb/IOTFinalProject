const { MongoClient } = require("mongodb");
const moment = require("moment");

const findUser = async function findUserData(usarry) {
  const results = {};
  const uri =
    "mongodb+srv://IOTProject:g7fGHthZqV2cz8E@cluster0.wzs74.mongodb.net/IOTProjectDB?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

      const cursor = await client
      .db("IOTProjectDB")
      .collection("ScanResultsReal")
      .find({
        $and: [
          { dateonly: moment(new Date()).format("DD/MM/YYYY") },
          { hour: parseInt(moment(new Date()).format("HH")) },
          {'token.user': usarry[0].user},
          {'token.token':usarry[0].token}
        ],
      })
      .count()

    results['count'] = cursor
    //console.log(results);
  } catch (e) {
    console.error;
  } finally {
    await client.close();
  }

   return results

};



module.exports = findUser
