/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

export class Manifest {
    
    private _id: string = '';
    private name: string = '';
    private version: string = '';
    private author: string = '';
    private description: string = '';

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
}