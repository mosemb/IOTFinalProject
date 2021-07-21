const nodemailer = require("nodemailer");

        var transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: "mose_unige@outlook.com",
              pass: "mercyme21",
            },
          });
  
          var mailOptions = {
            from: "mose_unige@outlook.com",
            to: "mosejava@gmail.com",
            subject: "Sending Email using Node.js",
            text: "That was easy!",
          };
  
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });