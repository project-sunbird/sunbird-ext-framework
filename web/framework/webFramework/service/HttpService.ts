import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import moment from 'moment-es6';
import { UUID } from 'angular2-uuid';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { urlConfig } from './url.config';
export interface RequestParam {
    url: string;
    param?: object;
    header?: object;
    data?: object;
}
@Injectable()
export class HttpService {
    headers: object = {};
    rootOrgId = '';
    httpOptions: any = {};
    constructor(private http: HttpClient) { }
    getBaseUrl(): string {
        return urlConfig.URLS.LEARNER_PREFIX;
    }
    _call(url: string, httpOptions: object, type: string): Observable<any> {
        let instance = this;
        switch (type) {
            case "GET":
                return instance.http.get(url, httpOptions);
            case "POST":
                return instance.http.post(url, httpOptions);
            case "PUT":
                return instance.http.put(url, httpOptions);
            case "DELETE":
                return instance.http.delete(url, httpOptions);
        }
    }
    get(requestParam: RequestParam): Observable<any> {
        return this._call(this.getBaseUrl() + requestParam.url, this.getHttpOption(requestParam), "GET");
    }
    post(requestParam: RequestParam): Observable<any> {
        return this._call(this.getBaseUrl() + requestParam.url, this.getHttpOption(requestParam), "POST");
    }
    put(requestParam: RequestParam): Observable<any> {
        return this._call(this.getBaseUrl() + requestParam.url, this.getHttpOption(requestParam), "PUT");
    }
    delete(requestParam: RequestParam): Observable<any> {
        return this._call(this.getBaseUrl() + requestParam.url, this.getHttpOption(requestParam), "DELETE");
    }
    getHttpOption(requestParam: RequestParam): object {
        const httpOptions = {
            headers: this.getHeader(),
            params: (<any>requestParam.param)
        };
        return httpOptions;
    }
    getHeader(): any {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Consumer-ID': 'X-Consumer-ID',
            'X-Device-ID': 'X-Device-ID',
            'X-Org-code': this.rootOrgId,
            'X-Source': 'web',
            'ts': moment().format(),
            'X-msgid': UUID.UUID()
        };
    }
}
