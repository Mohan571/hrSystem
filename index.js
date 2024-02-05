require('dotenv').config();
const express = require('express');
const app = express();
const mongoConnection=require('./helpers/db')
const path=require('path')



mongoConnection.connectToDatabase()

const ManagementRoutes=require('./routes/managementRoutes')
const authRoutes=require('./routes/authRoutes')
const jobPostingRoutes=require('./routes/jobPostingRoutes')



app.use(express.json());

app.use(express.urlencoded({extended:false}))



app.use(authRoutes)
app.use(ManagementRoutes)
app.use(jobPostingRoutes)






const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

   