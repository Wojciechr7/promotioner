import db from '../database-login';



const Time = {
    get: (callback: any) => {
        return db.query("Select time from timer limit 1", callback);
    },
    add: (serverTime: Date, callback: any) => {
        return db.query("Insert into timer values(1, ?)", serverTime, callback);
    },
    update: (serverTime: Date, callback: any) => {
        return db.query("update timer set time=? where id=1", serverTime, callback);
    }
};

export default Time;