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

// const carray = async(jsonArrays) => {

//     let arrayData = [];
//         let ss = [];

//        Promise.all(
//             jsonArrays.map(jsonArray => {
//                 let njson = [];
//                for(let y in jsonArray) {
//                 njson.push(jsonArray[y]);
//                }

//                 ss.push(njson);
//             })
//         );

//         arrayData.push(ss);
//         return arrayData;
// }


exports.uploadCsv = async(req,res)=>{
 

        const jsonArrays=await csv().fromFile(csvFilePath);

        ///////////////////////////////////////////////////
        ////// convert json object to array //////////////

        // const arrayData = await carray(jsonArrays);
        // console.log(arrayData);

        const arrayData = [jsonArrays.map(jsonArray => [jsonArray.LastName, jsonArray.FirstName, jsonArray.Address, jsonArray.City])];
        console.log(arrayData);

        const sqlqry = "INSERT INTO test_table (LastName, FirstName, Address, City) VALUES ?";

        connection.query(sqlqry, arrayData, function (error, results, fields) {
            if (error) throw error;

            res.status(200).send({ status : true, message: "data insertrd.", data : results});

        });

}