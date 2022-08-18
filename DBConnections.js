const chalk=require('chalk');
const mongoose = require('mongoose');
const { mongoDBName } = require('./serverConfig');
const serverConfig=require('./serverConfig');

// Database Connection
const connectToMongoDB=async ()=>{
  try {
    const { mongoUser, mongoPwd, mongoUrl, mongoDBName }=serverConfig; 
    const mongoURL=`mongodb://${mongoUser? mongoUser+':' : ""}${mongoPwd? mongoPwd+"@" : ""}${mongoUrl}/${mongoDBName}`;
    await mongoose.connect( mongoURL, {   
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(()=>console.log(chalk.bgGreen.bold(`server connected to ${mongoDBName} database`)))
    .catch(error=>console.log(chalk.bgRed.bold(`Error in DB connection : ${error.message}`)));

    mongoose.connection.on("open", function () {
      console.log(chalk.bgGreen.bold(`Server connected to ${mongoDBName} database`));
    });
    mongoose.connection.on("error", function (err) {
      console.error(chalk.bgRed.bold(`Error in DB connection: ${err}`));
    });
    mongoose.connection.on("disconnected", function () {
      console.log(chalk.bgRed.bold('Server is disconnected from DB'));
    });
  } catch (error) {
      console.log(chalk.bgRed.bold(`Error in DB connection, terminating connection process : ${error.message}`));
      // Terminate DB Connection Process
      process.exit(1);
  }
}

module.exports=connectToMongoDB;