const BeaconScanner = require("node-beacon-scanner"); // Used for scanning
const dbcreation = require("./db/dbconnection"); // Db connection
const date = require("date-and-time"); // Utc date convertions
const findRecords = require("./db/findRecords"); // DB connections
const path = require("path"); // Used to get the folder path on the system
const moment = require("moment");
const findCount = require("./db/findCount");
const { restart } = require("nodemon"); // Keeps server running
const UserDataReal = require("./db/mongoonseReal"); //Mangoose Data
const express = require("express"); // This is the webserver
const jwt = require("jsonwebtoken");
const ejs = require("ejs") 
const authenticateUser = require("./middleware/authenticateUser")
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const groupUsers = require('./db/groupUsers')
const findUserData = require('./db/finduserData')
const findUserData2hr = require('./db/findUserData2hr')
const timeStatistics = require('./db/timestatistics')

const app = express();





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
const publicDirPath = path.join(__dirname, "./public");



app.use(express.static(publicDirPath)); // Serves the static files from the public folder
app.set("view engine", "hbs");
app.set("view engine", "ejs")
//app.use(UserRoutes); // Pick up the user Routes
app.use(express.json()); //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);  //Cookie Session


app.get("/register", (req, res) => {
  res.render("register");
})

app.get("/login", (req, res) => {
  res.render("login");
})


/*
app.get("/userdatareal" , authenticateUser, async (req, res) => { 
 try {
    const user = await UserDataReal.find({});

    for(let i =0; i<user.length; i++){
    }

    res.send(user);
  } catch (e) {
    res.send(500).send(e);
  } 

  }); */

//logout
app.get("/logout",authenticateUser, (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});



dict2 = {};
app.post("/register", async (req, res) => {
  const user = new UserDataReal(req.body);

  try {
    await user.save();
      const token = jwt.sign({ _id: user._id }, "iotproject")
      user.tokens.push({ token });
      user.save()
      return res.redirect('/login');

  } catch (e) {
    res.send("An Error Occured We could not Register you")
  }

});

const usarry = []
app.post("/register/login", async (req, res) => {
  try {
    const user = await UserDataReal.verifyLogin(
      req.body.email,
      req.body.password
    );
    // Verify the user and login details
    const token = jwt.sign({ _id: user._id }, "iotproject");
    user.tokens.push({ token });
   
    user.save();
    

    req.session.user = {user:user.email};
    console.log(req.session.user.user)
    
    if(usarry.length>0){
      while(usarry.length>0){
        usarry.pop()
      }
      usarry.push({user:user.email,token})
      
    }else{

      usarry.push({user:user.email,token})
    }

    res.render("index",{user:user.email})  
  
  } catch (e) {
    res.send("Not Logged in Please enter Valid Credentials")
  }
});



const counted = findCount().catch(console.error);
counted.then((result) => {
  //console.log(result);

  app.get("/dashboard", (req, res) => {
    res.render("dashboard", { result });
  });
});


/*
app.get("/dash", async (req, res) => {
  try {
    const counted = await findCount().catch(console.error);
    res.send(counted);
  } catch (e) {
    res.status(e).send(e);
  }
});*/


app.get('/groupdata', authenticateUser,async(req,res)=>{
  try{
    const groupdata = await groupUsers().catch(console.error)
    
    res.send(groupdata)

  }catch(e){

    res.status(e).send(e);

  }
})

app.get('/finduserdata',authenticateUser, async(req, res)=>{
  try{
    const finduser = await findUserData(usarry).catch(console.error)
    res.send(finduser)
  }catch(e){
    res.status(e).send(e)
  }
});


app.get('/finduserdatahrs',authenticateUser, async(req,res)=>{
  try{
    const finduserdata2hrs = await findUserData2hr(usarry).catch(console.error)
    res.send(finduserdata2hrs)
  }catch(e){
    res.status(e).send(e)
  }
}); 


app.get('/timestatistics', authenticateUser,async(req,res)=>{

  try {
    const timestats = await timeStatistics(usarry).catch(console.error)
    res.send(timestats)
  }catch(e){
    res.status(e).send(e)
  }

});


app.get("/dashboardreal",authenticateUser, async (req,res)=>{
  res.render("dashboardreal");
});

app.get("/admin", authenticateUser,async( req, res)=>{
    res.render('admin');
});

app.get("/indexreal", async(req,res)=>{
  res.render("home")
})


const scanner = new BeaconScanner();
scanner.onadvertisement = async (ad) => {
    var count = 0;
    console.log(JSON.stringify(ad, null, " "));
    try {
      if (dict2.hasOwnProperty(ad.id)) {

        return;
        
      } else {
        dict2[ad.id] = ad.address;
        const b = findRecords(ad.id).catch(console.error);

        dbcreation({
          id: ad.id,
          address: ad.address,
          BeaconType: ad.beaconType,
          rssi: ad.rssi,
          txtPower: ad.iBeacon.txPower,
          created_date_utc: new Date(),
          time: moment(new Date()).format("HH:mm:ss"),
          counts: Object.keys(dict2).length,
          hour: parseInt(moment(new Date()).format("HH")),
          minutes: parseInt(moment(new Date()).format("mm")),
          dateonly: moment(new Date()).format("DD/MM/YYYY"),
          token:usarry

        });
      }
    } catch (error) {
      console.error;
    }
  }

const scan = async function(){
 const sc = await  scanner.startScan()
 console.log('Scanning')
 return sc
}



/* scanner
  .startScan()
  .then(() => {
    console.log("Started to scan.");
  })
  .catch((error) => {
    console.error(error);
  }); */

  

  
app.get("/scanner",authenticateUser, (res, req) => {
  try {
    const scan = scanner.startScan();
    scan()
    res.send("Scanning ");
  } catch (e) {
    res.send(e);
  }});

  app.get('/scanners', function (req, res) {
    try{
      scan()
      
    }catch(e){
      res.send(e)
    }
  })

const stop = async function(){
  const scanstop = await scanner.stopScan()
  return scanstop
}

app.get('/scanners_stop', function (req, res) {
  if(true){
    stop() 
    res.redirect("/dashboardreal");
  }
})








