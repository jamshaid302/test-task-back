const app = require('./server/app');
const connectDB = require('./utility/conn');
require('dotenv').config();

const port = process.env.PORT || 2022;

const runServer = async () => {
    if(process.env.NODE_ENV != "development"){
        await connectDB();
        app.listen(port,function () {
            console.log("Listening at port",port);
        });
    } else {
        await connectDB(process.env.DB_URI);
    }
}
app.listen(port,function () {
    console.log("Listening at port",port);
});
runServer();
module.exports = app;