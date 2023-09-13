const csv = require("csvtojson");
const csvFilePath='./file.csv';
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    dateStrings:true,
    database: 'test'
});

exports.uploadCsv = async(req,res)=>{
 

        const jsonArrays=await csv().fromFile(csvFilePath);
///////////////////////////////////////////////////
////// convert json object to array //////////////

        const arrayData = [jsonArrays.map(jsonArray => [jsonArray.LastName, jsonArray.FirstName, jsonArray.Address, jsonArray.City])];
        console.log(arrayData);

        const sqlqry = "INSERT INTO test_table (LastName, FirstName, Address, City) VALUES ?";

        connection.query(sqlqry, arrayData, function (error, results, fields) {
            if (error) throw error;

            res.status(200).send({ status : true, message: "data insertrd.", data : results});

        });

}