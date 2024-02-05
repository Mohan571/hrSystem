require('dotenv').config();
const express = require('express');
const app = express();
const mongoConnection=require('./helpers/db')
const path=require('path')



mongoConnection.connectToDatabase()

const ManagementRoutes=require('./routes/managementRoutes')
const authRoutes=require('./routes/authRoutes')
const jobPostingRoutes=require('./routes/jobPostingRoutes')
const hrRoutes=require('./routes/hrRoutes')
const employerRoutes=require('./routes/employerRoutes')
const candidateRoutes=require('./routes/candidateRoutes')


app.use(express.json());

app.use(express.urlencoded({extended:false}))



app.use('/api/auth',authRoutes)
app.use('/api',ManagementRoutes)
app.use('/api',jobPostingRoutes)
app.use('/api',employerRoutes)
app.use('/api',candidateRoutes)
app.use('/api',hrRoutes)






const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

   