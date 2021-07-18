/*
const button = document.getElementById("StartScan");
button.addEventListener("click", function (e) {
  console.log("button was clicked");

  fetch("http://localhost:5000/scanners", { method: "GET" })
    .then(function (response) {
      if (response.ok) {
        console.log("click was recorded");
        return;
      }

      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
}); */

/*
const button2 = document.getElementById("StopScan");
button2.addEventListener("click", function (e) {
  console.log("button was clicked");

  fetch("http://localhost:5000/scanners_stop", { method: "GET" })
    .then(function (response) {
      if (response.ok) {
        console.log("click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
}); */

setInterval(function () {
  fetch("http://localhost:5000/finduserdata", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (data) {
      //console.log(data)
      document.getElementById(
        "counter"
      ).innerHTML = `${new Date()}`;
      //var str = `Danger!!! people in room are ${data.count} and this is not safe.`
      //console.log(data)

      /*
     var str = ""
     
      if(data.count>=12){
        str = `Safety Status:-Danger!!! ${data.count} are in the room, its not safe.`
      }else{

        str = `Safety Status:-Safe!!! ${data.count} people have entered the room this hour so far.`
      } 

      document.getElementById(
        "message"
      ).innerHTML = str; 
      */

      //console.log(str)

    })
    .catch(function (error) {
      console.log(error);
    });
}, 50);



setInterval(function () {
  fetch("http://localhost:5000/finduserdatahrs", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (data) {
      //console.log(data)
      document.getElementById(
        "counters"
      ).innerHTML = `${new Date()}`;
      //var str = `Danger!!! people in room are ${data.count} and this is not safe.`
      //console.log(data)

     var str = ""
     
      if(data.count>=12){
        str = `Safety Status:-Danger!!! people in room are ${data.count} and this is not safe.`
      }else{

        str = `Safety Status:-Safe, number of people in the room is ${data.count} and this is safe.`
      } 

      document.getElementById(
        "messages"
      ).innerHTML = str;

      //console.log(str)

    })
    .catch(function (error) {
      console.log(error);
    });
}, 50);








