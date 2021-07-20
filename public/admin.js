

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
   
      document.getElementById(
        "counters"
      ).innerHTML = `${new Date()}`;
   

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








