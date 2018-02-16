/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

export class Manifest {
    
    private _id: string = '';

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
}