var myChart = null;
var myChart1 = null;
var myChart2 = null;
var myChart3 = null;

setInterval(function () {
  fetch("http://localhost:5000/finduserdata", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (d) {
      
      if (myChart !== null) {
        myChart.destroy();
      }
      var ctx = document.getElementById("myChart").getContext("2d");
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["", "", "No. Of People", "", ""],
          datasets: [
            {
              label: "Number of People in the room this hour",
              data: [0, 0, d.count, 0, 0],
              backgroundColor: ["rgba(255, 99, 132, 1)"],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      var colorChangeValue = 15; //Change of color
      var dataset = myChart.data.datasets[0].data;
      for (var i = 0; i < dataset.length; i++) {
        if (dataset[i] > colorChangeValue) {
          
          myChart.data.datasets[0].backgroundColor[i] = "rgb(255, 99, 132)";
          myChart.data.datasets[0].borderColor[i] = "rgba(255, 159, 64, 1)";
        } else {
          myChart.data.datasets[0].backgroundColor[i] =
            "rgba(75, 192, 192, 0.2)";
          myChart.data.datasets[0].borderColor[i] = "rgba(54, 162, 235, 1)";
        }
      }
      myChart.update();
      
    }

    
    
    
    )
    .catch(function (error) {
      console.log(error);
    });
}, 300);


setInterval(function () {
  fetch("http://localhost:5000/finduserdatahrs", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (d) {
      
      if (myChart1 !== null) {
        myChart1.destroy();
      }
      var ctx = document.getElementById("myChart1").getContext("2d");
      myChart1 = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["", "", "No. Of People", "", ""],
          datasets: [
            {
              label: "Number of People in the room this hour",
              data: [0, 0, d.count, 0, 0],
              backgroundColor: ["rgba(255, 99, 132, 1)"],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      var colorChangeValue = 15; // Change of Color
      var dataset = myChart1.data.datasets[0].data;
      for (var i = 0; i < dataset.length; i++) {
        if (dataset[i] > colorChangeValue) {
          
          myChart1.data.datasets[0].backgroundColor[i] = "rgb(255, 99, 132)";
          myChart1.data.datasets[0].borderColor[i] = "rgba(255, 159, 64, 1)";
        } else {
          myChart1.data.datasets[0].backgroundColor[i] =
            "rgba(75, 192, 192, 0.2)";
          myChart1.data.datasets[0].borderColor[i] = "rgba(54, 162, 235, 1)";
        }
      }
      myChart1.update();
      
    }
    )
    .catch(function (error) {
      console.log(error);
    });
}, 300);


setInterval(function () {
  fetch("http://localhost:5000/timestatistics", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (d) {
      console.log(d.count)
      
      Labels = []
      Count = []
      for(var i =0; i<d.count.length; i++){
        console.log(d.count[i]._id)
        Labels.push(d.count[i]._id)
        
        Count.push(d.count[i].count)
      }

      console.log(Labels)
      console.log(Count)

  

     if (myChart2 !== null) {
        myChart2.destroy();
      }
      var ctx = document.getElementById("myChart2").getContext("2d");
      myChart2 = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Labels,
          datasets: [
            {
              label: "Historical Hourly Number of People in the Room",
              data: Count,
              backgroundColor: ["rgba(255, 99, 132, 1)"],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      var colorChangeValue = 15; //Change of color
      var dataset = myChart2.data.datasets[0].data;
      for (var i = 0; i < dataset.length; i++) {
        if (dataset[i] > colorChangeValue) {
          
          myChart2.data.datasets[0].backgroundColor[i] = "rgb(255, 99, 132)";
          myChart2.data.datasets[0].borderColor[i] = "rgba(255, 159, 64, 1)";
        } else {
          myChart2.data.datasets[0].backgroundColor[i] =
            "rgba(75, 192, 192, 0.2)";
          myChart2.data.datasets[0].borderColor[i] = "rgba(54, 162, 235, 1)";
        }
      }
      myChart2.update();
      
    }
    )
    .catch(function (error) {
      console.log(error);
    });
}, 800);



setInterval(function () {
  fetch("http://localhost:5000/timestatistics", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (d) {
      console.log(d.count)
      
      Labels = []
      Count = []
      for(var i =0; i<d.count.length; i++){
        console.log(d.count[i]._id)
        Labels.push(d.count[i]._id)
        
        Count.push(d.count[i].count)
      }

      console.log(Labels)
      console.log(Count)

  

     if (myChart3 !== null) {
        myChart3.destroy();
      }
      var ctx = document.getElementById("myChart3").getContext("2d");
      myChart3 = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Labels,
          datasets: [
            {
              label: "Historical Hourly Number of People in the Room",
              data: Count,
              backgroundColor: ["rgba(255, 99, 132, 1)"],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      var colorChangeValue = 15; //Change of color
      var dataset = myChart3.data.datasets[0].data;
      for (var i = 0; i < dataset.length; i++) {
        if (dataset[i] >= colorChangeValue) {
          
          myChart3.data.datasets[0].backgroundColor[i] = "rgb(255, 99, 132)";
          myChart3.data.datasets[0].borderColor[i] = "rgba(255, 159, 64, 1)";
        } else {
          myChart3.data.datasets[0].backgroundColor[i] =
            "rgba(75, 192, 192, 0.2)";
          myChart3.data.datasets[0].borderColor[i] = "rgba(54, 162, 235, 1)";
        }
      }
      myChart3.update();
      
    }
    )
    .catch(function (error) {
      console.log(error);
    });
}, 800); 







