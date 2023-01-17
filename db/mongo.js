const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser   : true,
    dbName            : 'zd-treasurehunt-db'
};

console.log(process.env.URL_MONGO)
exports.initClientDbConnection = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}
