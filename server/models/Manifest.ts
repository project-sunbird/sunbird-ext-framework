/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

export class Manifest {

    private _id: string = '';
    private _name: string = '';
    private _version: string = '';
    private _author: string = '';
    private _description: string = '';

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get version(): string {
        return this._version;
    }

    public set version(version: string) {
        this._version = version;
    }

    public get author(): string {
        return this._author;
    }

    public set author(author: string) {
        this._author = author;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }
}