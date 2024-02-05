const base_response = require("./base-response").response;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// const { getConnection } = require("../_helpers/db");
// const tablename = "forgot_password_token";
// const usedStrings = new Set();
// const ApiResponse = require('../utils/ApiResponse');


module.exports = {

  async datetime(type, datetime = "") {
    const moment = require('moment-timezone');
    const desiredTimeZone = 'Asia/Kolkata';

    var formatted = moment().tz(desiredTimeZone)

    if (datetime) {
      formatted = moment.tz(datetime, desiredTimeZone);
    }
    else {
      formatted = moment().tz(desiredTimeZone)
    }
      
    formatted = formatted.format('YYYY-MM-DD HH:mm:ss');

    // if (type == "db") {
    //   formatted = formatted.format('YYYY-MM-DD HH:mm:ss');
    // }
    //  else if (type == "show") {
    //   formatted = formatted.format('YYYY-MM-DD hh:mm:ss A');
    // }

    return new Promise((resolve, reject) => {
      return resolve(formatted);
    });


  },

  async passendep(password, type = "") {
    return new Promise((resolve, reject) => {
      const algorithm = "aes-192-cbc";
      const password_key = "RPjzxZrP1y18zMU6sbP8FbPO6N1LLg";
      const key = crypto.scryptSync(password_key, "GfG", 24);
      const iv = Buffer.alloc(16, 0);
      if (type == "en") {
        var cipher = crypto.createCipheriv(algorithm, key, iv);
      } else {
        var cipher = crypto.createDecipheriv(algorithm, key, iv);
      }

      let result_output = "";
      if (type == "en") {
        cipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            result_output += chunk.toString("base64");
          }
        });
      } else {
        cipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            result_output += chunk.toString("utf8");
          }
        });
      }

      // Handling end event
      cipher.on("end", () => {
        // console.log(result_output,'old');
        return resolve(result_output);
      });
      // Writing data
      if (type == "en") {
        cipher.write(password);
      } else {
        cipher.write(password, "base64");
      }
      cipher.end();
    });
  },


  async generatejwttoken(data, res) {
    const secret = process.env.JWT_SECRET;
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          data: data,
        },
        secret,
        { expiresIn: "30 days" },
        (err, token) => {
          if (err) {
            return resolve(
              res
                .status(200)
                .json(base_response(400, {}, "Token not generated"))
            );
          }
          return resolve(token);
        }
      );
    });
  },

  async validateToken(req, res, next) {
    try {
      const secret = process.env.JWT_SECRET;
      const { authorization } = req.headers;
      const tokenArray = authorization.split(" ");
      jwt.verify(tokenArray[1], secret, (err, data) => {
        if (err) {
          res.status(403).json(base_response(403, {}, "Unauthorized"));
        } else {
          
          req.login = {
            user_id: data.data.user_id,
            user_name: data.data.user_name,
            login_type: data.data.login_type,
            role:data.data.login_type
          }
          console.log(req.login);
          next();
        }
      });
    } catch (error) {
      res.status(402).json(base_response(403, {}, "Wrong Bearer Token"));
    }
  },

//   async validateQueryToken(req, res, next) {
//     try {
//       // console.log(req)
//       const secret = process.env.JWT_SECRET;
//       const { authorization } = req.query;
//       const tokenArray = authorization.split(" ");
//       jwt.verify(tokenArray[1], secret, (err, data) => {
//         if (err) {
//           res.status(403).json(base_response(403, {}, "Unauthorized"));
//         } else {
//           req.body.user_id = data.data.user_id;
//           req.body.user_name = data.data.user_name;
//           const checkkey = "login_type" in data.data;
//           if (checkkey) {
//             // console.log('key exits',data.data)
//             req.body.login_type = data.data.login_type;
//           } else {
//             // console.log('The key does not exist.',data.data);
//           }
//           next();
//         }
//       });
//     } catch (error) {
//       res.status(402).json(base_response(403, {}, "Wrong Bearer Token"));
//     }
//   },

//   async CheckLoginType(data, login_tp, res) {
//     // console.log(login_tp)
//     const login_type = "login_type" in data;
//     const wrong_message = "Wrong Bearer Token or token not valid for this service";
//     let data_r = {
//       data: data,
//       login_tp: login_tp
//     }
//     // console.log(login_type)

//     return new Promise((resolve, reject) => {
//       if (login_type) {
//         if (Array.isArray(login_tp)) {
//           var match_status = false;
//           for (var i = 0; i < login_tp.length; i++) {
//             if (data.login_type == login_tp[i]) {
//               match_status = true
//               break;
//             }
//           }
//           if (match_status == true) {
//             return resolve(true);
//           } else {
//             res
//               .status(402)
//               .json(
//                 base_response(
//                   403,
//                   data_r,
//                   wrong_message
//                 )
//               );
//           }

//         } else {
//           if (data.login_type == login_tp) {
//             return resolve(true);
//           } else {
//             res
//               .status(402)
//               .json(
//                 base_response(
//                   403,
//                   data_r,
//                   wrong_message + '.'
//                 )
//               );
//           }
//         }

//       } else {
//         return resolve(true);
//       }
//     });
//   },

//   async configuremail() {
//     nodemailer = require("nodemailer");
//     let smtpAuth;
//     smtpAuth = {
//       user: "info@conqt.com",
//       pass: "Conqt@123",
//     };
//     let smtpConfig = {
//       host: "smtp.mail.us-east-1.awsapps.com",
//       port: 465,
//       secure: true, // true for 465, false for other ports
//       auth: smtpAuth,
//     };
//     return new Promise((resolve, reject) => {
//       let transporter = nodemailer.createTransport(smtpConfig);

//       transporter.verify(function (error, success) {
//         if (error) {
//           ////console.log(error);
//         } else {
//           console.log("Server is ready to take our messages");
//         }
//       });
//       return resolve(transporter);
//     });
//   },

//   async sendMail(transporter, subject, template = "", email) {
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(
//         {
//           from: {
//             name: "ConQT",
//             address: "info@conqt.com",
//           },
//           to: email,
//           subject: subject,
//           html: template ? template : `welcome to VMS`,
//         },
//         (err, info) => {
//           if (err) {
//             console.log(err);
//             return resolve(err);
//           } else {
//             //console.log(info);
//             return resolve(info);
//           }
//         }
//       );
//     });
//   },

//   // generate unique string
//   async generateUniqueString(length) {
//     return new Promise((resolve, reject) => {
//       const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//       let uniqueString = '';

//       do {
//         for (let i = 0; i < length; i++) {
//           uniqueString += characters.charAt(Math.floor(Math.random() * characters.length));
//         }
//       } while (usedStrings.has(uniqueString));

//       usedStrings.add(uniqueString);
//       resolve(uniqueString);
//     });
//   },

//   //Reset Password functions

//   async InsertOtpp(data) {
//     const conn = getConnection();
//     let sql = `INSERT INTO ${tablename} SET ?`;
//     let result = await conn.query(sql, data).catch((err) => {
//       if (err) {
//         console.log(err)
//         return false;
//       }
//     });
//     return result;
//   },

//   async UpdateOtp(data, where_cls) {
//     const conn = getConnection();
//     try {
//       let sql = `UPDATE ${tablename} SET ? WHERE ?`;
//       var result = await conn.query(sql, [data, where_cls]);
//       return result;
//     } catch (err) {
//       await logmodel.Insert(where_cls, err);
//       return false;
//     } finally {
//       await conn.close();
//     }
//   },

//   async InsertToken(data) {
//     const conn = getConnection();
//     let sql = `INSERT INTO ${tablename} SET ?`;
//     let result = await conn.query(sql, data).catch((err) => {
//       if (err) {
//         console.log(err);
//         return false;
//       }
//     });
//     return result;
//   },

//   async checkUserOTpforgot(where_cls1, where_cls2) {
//     const conn = getConnection();
//     let sql = `SELECT * FROM ${tablename} where ? AND ? AND status=0 `;
//     let result = await conn
//       .query(sql, [where_cls1, where_cls2])
//       .catch((err) => {
//         if (err) {
//           // console.log(err)
//           return false;
//         }
//       });
//     return result;
//   },
//   async checkUserReset(where_cls1) {
//     const conn = getConnection();
//     let sql = `SELECT * FROM ${tablename} where ? AND status=0 `;

//     let result = await conn.query(sql, [where_cls1]).catch((err) => {
//       if (err) {
//         // console.log(err)
//         return false;
//       }
//     });
//     return result;
//   },

//   async checkUserForResend(where_cls1) {
//     const conn = getConnection();
//     let sql = `SELECT * FROM ${tablename} where ? AND status=0 ORDER BY id DESC LIMIT 1`;

//     let result = await conn.query(sql, [where_cls1]).catch((err) => {
//       if (err) {
//         // console.log(err)
//         return false;
//       }
//     });
//     return result;
//   },

//   async checkVerifyOTpforgot(where_cls1, where_cls2) {
//     const conn = getConnection();
//     let sql = `SELECT * FROM ${tablename} where ? AND ? AND status=1 `;
//     let result = await conn
//       .query(sql, [where_cls1, where_cls2])
//       .catch((err) => {
//         if (err) {
//           // console.log(err)
//           return false;
//         }
//       });
//     return result;
//   },

//   async Updateotpforgotpassword(data, where_cls1, where_cls2) {
//     const conn = getConnection();
//     let sql = `UPDATE ${tablename} SET ? WHERE ? AND ?`;
//     let result = await conn
//       .query(sql, [data, where_cls1, where_cls2])
//       .catch((err) => {
//         if (err) {
//           console.log(err);
//           return false;
//         }
//       });
//     return result;
//   },

//   async error(res) {
//     return new Promise((resolve, reject) => {
//       res.status(402).json(base_response(403, {}, "Something went Wrong"));
//     });
//   },

//   async serverError(res) {
//     return new Promise((resolve, reject) => {
//       res.status(500).json(base_response(500, {}, "Unable To Process The Request, Try After Some Time"));
//     });
//   },

//   async handleServererror(res, error) {
//     console.log(error);
//     ApiResponse.serverIssueResponse(res, error);
//   },

//   async getFilterObject(req, filterObj = {}) {
//     filterObj.status = 1;
//     // If User Is Not SuperAdmin Then Filter Data By Organization
//     if (req.login.role != "SuperAdmin") {
//       filterObj.organizationId = req.login.organizationId;
//     }
//     console.log(filterObj);
//     return filterObj;
//   },

//   async generateRandomNumber(digits) {
//     const min = 10 ** (digits - 1);
//     const max = 10 ** digits - 1;
//     return Math.floor(min + Math.random() * (max - min + 1));
//   },

//   async generateUniqueNo() {
//     const currentDate = new Date();

//     const year = String(currentDate.getFullYear()).slice(-2);
//     const month = String(currentDate.getMonth() + 1);
//     const day = String(currentDate.getDate());

//     const timestamp = Date.now();
//     const lastFourDigits = String(timestamp).slice(-4);


//     return `${year}${month}${day}-${lastFourDigits}${await this.generateRandomNumber(3)}`;
//   },

//   async generateNextNumber(lastNumber) {
//     let lastDigits = Number(lastNumber.slice(-3));
//     console.log(lastDigits);

//     if (lastDigits == 999) {
//       let lastCap = lastNumber.charAt(3);
//       if (lastCap == 'Z') {
//         let firstCap = lastNumber.charCodeAt(2);
//         firstCap = String.fromCharCode(firstCap + 1);
//         lastNumber = lastNumber.substring(0, 2) + firstCap + "A" + "001";
//         return lastNumber;
//       }
//       else {
//         let secondCap = lastNumber.charCodeAt(3);
//         secondCap = String.fromCharCode(secondCap + 1);
//         lastNumber = lastNumber.substring(0, 3) + secondCap + "001";
//         return lastNumber;
//       }
//     }
//     else {
//       lastDigits = String(lastDigits + 1);
//       if (lastDigits.length != 3) {
//         lastDigits.length == 2
//           ? lastDigits = "0" + lastDigits
//           : lastDigits = "00" + lastDigits;
//       }
//       lastNumber = lastNumber.substring(0, 4) + lastDigits;
//       return lastNumber;
//     }
//   }

};
