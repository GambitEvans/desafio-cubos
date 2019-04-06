import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const adapter:FileSync = new FileSync('./src/db.json');
const database:lowdb = lowdb(adapter);

database.defaults({ sequence_scheduling: 0, scheduling: []}).write()

export default database;