import {RxHR, CoreOptions, RequestResponse, RxHttpRequestResponse} from "@akanass/rx-http-request";
import { Observable } from 'rxjs/Observable';

export interface HTTPResponse extends RxHttpRequestResponse {

}

export class HTTPService {

    public static get(url: string, options?: CoreOptions): Observable<HTTPResponse> {
        return RxHR.get(url, options);
    }

    public static put(url: string, options?: CoreOptions): Observable<HTTPResponse> {
        return RxHR.put(url, options);
    };

    public static post(url: string, options?: CoreOptions): Observable<HTTPResponse> {
        return RxHR.post(url, options);
    }

    public static patch(url: string, options?: CoreOptions): Observable<HTTPResponse> {
        return RxHR.patch(url, options);
    }

    public static delete(url: string, options?: CoreOptions): Observable<HTTPResponse> {
        return RxHR.delete(url, options);
    }
}