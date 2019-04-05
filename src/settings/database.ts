import lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('src/db.json');

const Database = {
  initialize: () => 
    lowdb(adapter)
      .then(db => db.defaults({ schedules: [] }).write())
  ,
  getConnection: () => lowdb(adapter)
};

export default Database;