/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import * as shortHash from 'short-hash';

export class Util {
    static hash(text: string) {
        return shortHash(text);
    }
}

/*
export interface ErrorSubclass extends Error {
}

export class ErrorSubclass {

    public name: string;
    public message: string;
    public stack: string;

    constructor( message: string ) {

        this.name = "ErrorSubclass";
        this.message = message;
        this.stack = ( new Error( message ) ).stack;
    }
}

ErrorSubclass.prototype = <any>Object.create( Error.prototype );

export interface FrameworkErrorOptions {
    message: string;
    detail?: string;
    extendedInfo?: string;
    code?: string;
    rootError?: any;
}

export class FrameworkError extends ErrorSubclass {

    public name: string;
    public detail: string;
    public extendedInfo: string;
    public code: string;
    public rootError: any;

    constructor( options: FrameworkErrorOptions ) {

        super( options.message );
        this.name = "FrameworkError";
        this.detail = ( options.detail || "" );
        this.extendedInfo = ( options.extendedInfo || "" );
        this.code = ( options.code || "" );
        this.rootError = ( options.rootError || null );

    }

    public print() : string {

        return( "FrameworkError:: " + this.code + " | " + this.message );

    }

}
*/