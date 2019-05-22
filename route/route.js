
module.exports=(app)=>{

const usersCollection =require('../controllers/users')
const applyCollection =require('../controllers/apply')
const jobsCollection =require('../controllers/jobs')
const chatCollection =require('../controllers/chat')
app.get('/users', usersCollection.getAllUsers)

//----------get user by id-----------------
app.get('/users/:id', usersCollection.getUserByID)

//---------------Login ------------
app.post('/login',usersCollection.checkUser)
   

//----------post user----------------
app.post('/signUp', usersCollection.postUser)

//----------update user-----------------
app.put('/users/:id', usersCollection.updateUser)
//----------delete user-----------------

app.delete('/users/:id', usersCollection.deleteUser)

//--------add jobs------------------
app.post('/jobs', jobsCollection.addJobs)

//------------Update Jobs---------
app.put('/jobs/', jobsCollection.updateJobs)

//------------get all jobs---------getAllJobs2
app.get('/jobs', jobsCollection.getAllJobs)
app.get('/jobs2/:page', jobsCollection.getAllJobs2) //----------Pagination--------

//------------company list job ------------
app.get('/jobs/:name',jobsCollection.companyJobs)
app.get('/jobs2/:name',jobsCollection.companyJobs2)

//----------apply job----------
app.post('/apply',applyCollection.applyJob )

//----------applied jobs of candidate--------------
app.post('/applied',applyCollection.appliedJobs)

//---------applied job of company ----------
app.post('/appliedUsers', applyCollection.getAplied)

//----------change job status----------
app.put('/apply', applyCollection.changeStatus)

//------------message-----------------
app.post('/message',chatCollection.getMessage)

}
 