const { MongoClient } = require("mongodb");
const moment = require("moment");

const getAllusers = async function findUserData() {
  const results = {};
  const uri =
    "mongodb+srv://IOTProject:g7fGHthZqV2cz8E@cluster0.wzs74.mongodb.net/IOTProjectDB?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

      const cursor = await client
      .db("IOTProjectDB")
      .collection("ScanResultsReal")
      .aggregate([

   { $match: {
        $and:[

           { dateonly: moment(new Date()).format("DD/MM/YYYY") },
           { 'hour': {"$gte":parseInt(moment(new Date (new Date().getTime()-(1000*60*60))).format("HH")), "$lte":parseInt(moment(new Date()).format("HH"))}}

        ]
       }  
       
       }, 

     {
      $group: {
         _id: 
               '$token.user'
               ,

        count: {
           $sum: 1
         } 
       } 

     }
    
] ).toArray()





    results['count'] = cursor
  } catch (e) {
    console.error;
  } finally {
    await client.close();
  }

   return results 


};


module.exports = getAllusers 


