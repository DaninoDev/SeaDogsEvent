let { connect, set, Promise, connection } = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4
        }; 
        connect('mongodb+srv://Daninogamer:1sv5QX0OCKduzvWj@seadogsevents.8r0ji.mongodb.net/Data', dbOptions);
        Promise = global.Promise;

        connection.on('connected', () => {
            console.log('Conessione al DataBase "SeaDogsEvents" avvenuta con successo! ✅');
        });

        connection.on('err', err => {
            console.error(`Conessione al DataBase "SeaDogsEvents" non riuscita! ❌: \n${err.message}`);
        });

        connection.on('disconnected', () => {
            console.warn('Conessione al DataBase "SeaDogsEvents" persa! ❌');
        });
    }
};