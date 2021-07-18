const { MongoClient } = require("mongodb");
const moment = require("moment");

const timeStats = async function findUserData(usarry) {
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
           { 'token.user':  usarry[0].user}

        ]
       }  
       
       }, 

     {
      $group: {
         _id: 
               '$hour'
               //token:'$token.token'
               ,

        count: {
           $sum: 1
         } 
       } 

     },
     {
$sort : { _id: 1 }
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



module.exports = timeStats


