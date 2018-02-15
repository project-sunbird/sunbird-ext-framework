import * as db from './db';
import * as api from './api';

class Framework {
	static initialize(config: object) {

	}
}

export const framework = {
	db: db.db,
	api: api
}