const { MongoClient } = require("mongodb");
const moment = require("moment");



const findrecords = async function main(aid) {
  var hours = null;
  var results = null;
  const data = [];
  const filtered_results = {};

  const uri =
    "mongodb+srv://IOTProject:g7fGHthZqV2cz8E@cluster0.wzs74.mongodb.net/IOTProjectDB?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // await client.db("IOTProjectDB").collection(collection).insertOne(data);

    var cursor = await client
      .db("IOTProjectDB")
      .collection("ScanResultsReal")
      .find({ id: aid });

    results = await cursor.toArray();
    const arraylen = results.length;
    //console.log(results )
    //console.log(results[arraylen-1].created_date_utc)

    //console.log(moment(new Date()).format("DD/MM/YYYY"))
    if (results.length === 0) {
      return data;
    } else {
      const previousdate = results[arraylen - 1].created_date_utc;
      const time = new Date();
      //console.log(time)

      const now = time;
      const then = previousdate;

      // moment(new Date()).format("DD/MM/YYYY")
      const ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(
        moment(then, "DD/MM/YYYY HH:mm:ss")
      );
      const d = moment.duration(ms);
      hours = Math.floor(d.asHours()); // + moment.utc(ms).format(":mm:ss");
      data.push(hours);
      data.push(results);
      const dateonly_now = moment.utc(now).format("L");
      const dateonly_then = moment.utc(then).format("L");
      // console.log(dateonly_now)
      //console.log(dateonly_then)
      const testdate_equality = dateonly_now === dateonly_then;
      data.push(testdate_equality);
      data.push(arraylen);

      filtered_results["hours"] = hours;
      filtered_results["results"] = results;
      filtered_results["testdate_equality"] = testdate_equality;
      filtered_results["total_similar_ids"] = arraylen;

      //const now = moment()
      //now.format("hh:mm:ss K") // 1:00:00 PM
      //now.format("HH:mm:ss")
      moment(new Date()).format("HH:mm:ss");
    }

    //console.log(testdate)
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

  return filtered_results;
};



//'5fb9fc6387d8'

//const test = null
//const b = findrecords("46f61e277e9d").catch(console.error);
//b.then((result)=> { console.log(result)})




module.exports = findrecords
