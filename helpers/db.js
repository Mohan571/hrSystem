
// const mysql2=require('mysql');
// const express = require('express');


// const router = express.Router();

// const util = require('util');
 
// module.exports = {

//     getConnection,

//     GetDB,

// };

// const mysql = require("mysql");
 
// function getConnection() {

//    // console.log('connection call')

//     if(process.env.NODE_ENV === 'production'){

//       if(process.env.SERVER === 'P'){

//         var conobj = {

//           host: process.env.DB_HOST,

//           user: process.env.USER_NAME,

//           password: process.env.PASSWORD,

//           database: process.env.DB,

//           charset: process.env.CHARSET

//         };

//       //console.log('production db')

//       }else{

//         var conobj = {

//           host: process.env.DB_HOST,

//           user: process.env.USER_NAME,

//           password: process.env.PASSWORD,

//           database: process.env.DEV_DB,

//           charset: process.env.CHARSET

//         };

//        // console.log('dev db')

//       }

//     const con = mysql.createConnection(conobj);

//     return con;

//     }else{

//       //console.log('lcl db')

//       const con = mysql.createConnection({

//         host: "localhost",

//         user: "root",

//         password: "",

//         database: "connect",

//       });

//       return con;

//     }


//   }
 
//   function GetDB() {

//     if(process.env.NODE_ENV === 'production'){

//       if(process.env.SERVER === 'P'){

//         var config = {

//           host: process.env.DB_HOST,

//           user: process.env.USER_NAME,

//           password: process.env.PASSWORD,

//           database: process.env.DB,

//           charset: process.env.CHARSET

//         };

//         //console.log('production db async')

//       }else{

//         var config = {

//           host: process.env.DB_HOST,

//           user: process.env.USER_NAME,

//           password: process.env.PASSWORD,

//           database: process.env.DEV_DB,

//           charset: process.env.CHARSET

//         };

//         //console.log('dev db asyn')

//       }

//     }else{
 
//       var config = {

//         host: "localhost",

//         user: "root",

//         password: "",

//         database:process.env.LOCAL_DB,

//       };

//       console.log('lcl db async')
//       // console.log(process.env.LOCAL_DB)

//     }

//     const connection = mysql.createConnection( config );

//     return {

//       query( sql, args ) {

//         //console.log('query function call from model ')

//         return util.promisify( connection.query )

//           .call( connection, sql, args );

//       },

//       close() {

//         return util.promisify( connection.end ).call( connection );

//       }

//     };

//   }

const mongoose=require('mongoose')

async function connectToDatabase() {
  try {
      await mongoose.connect('mongodb://localhost:27017/HRMS', {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit the process on connection error
  }
}

module.exports = { connectToDatabase };