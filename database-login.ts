import mysql from 'mysql';
import options from './password';

const connection = mysql.createConnection(options);

connection.connect((err) => {
    if (err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS `products` (\n' +
        ' `id` int(6) NOT NULL,\n' +
        ' `name` varchar(200) DEFAULT NULL,\n' +
        ' `pln` int(10) DEFAULT NULL,\n' +
        ' `gr` int(10) DEFAULT NULL,\n' +
        ' `promotion` varchar(300) DEFAULT NULL,\n' +
        ' `shop` varchar(100) DEFAULT NULL,\n' +
        ' PRIMARY KEY (`id`)\n' +
        ' );');
    console.log('connected to db');
});




export default connection;