/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */
import * as shortHash from 'short-hash';

export class Util {
    static hash(text: string) {
        return shortHash(text);
    }
} 