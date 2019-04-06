import database from '../settings/database';

export default class BaseDAO {
    db: any;
    
    constructor() {
        this.db = database; 
    }

    getEntity(nameEntity: string){
        return this.db.get(nameEntity);      
    }
}