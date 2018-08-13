export interface ITelemetry {
  'pdata': IProducerData;
  'env': string;
  'apislug': string;
  'channel': string;
  'uid': string;
  'endpoint': string;
  'did'?: string;
  'authtoken'?: string;
  'sid'?: string;
  'batchsize'?: Number;
  'runningEnv'?: string;
  'mode'?: string;
  'host'?: string;
  'tags'?: Array<string>;
  'cdata'?: Array<{}>;
  'dispatcher'?: "http" | "console";
}

export interface IProducerData {
  'id': string;
  'ver': string;
  'pid': string;
}

export interface IDeviceSpec {
  "os"?: string; // OS name and version
  "make"?: string; // device make and model
  "id"?: string; // physical device id if available from OS
  "mem"?: number; // total mem in MB, -1 if unknown
  "idisk"?: number; // total internal disk in GB, -1 if unknown
  "edisk"?: number; // total external disk (card) in GB, -1 if unknown
  "scrn"?: number; // screen size in inches, -1 if unknown
  "camera"?: string; // primary and secondary camera specs
  "cpu"?: string; // processor name
  "sims"?: number; // number of sim cards, -1 if unknown
  "cap"?: Array<any>;
}

export interface IStartEventData {
  'type': string;
  'pageid'?: string;
  'mode'?: string;
  'dspec'?: IDeviceSpec;
  'uaspec'?: Object;
  'loc'?: string;
  'duration'?: Number;
}


export interface IErrorEventData {
  'err': string;
  'errtype': string;
  'stacktrace': string;
}
export interface IEndEventData {
  'pageid'?: string;
  'duration'?: string;
  'type': string;
  'mode'?: string;
  'summary'?: Array<{ [index: string]: string }>;
}
export interface ILogEventData {
  'type': string;
  'level': string;
  'message': string;
  'pageid'?: string;
  'params'?: Array<{}>;
}

export interface ITelemetryEvent {
  'edata': IStartEventData | IErrorEventData | IEndEventData | ILogEventData | IShareEventData | IAuditEventData | ISearchEventData;
  'contentId'?: string;
  'contentVer'?: string;
  'options': TelemetryEventOptions;
}

export interface IAuditEventData {
  "props": Array<string>;
  "state"?: string;
  "prevstate"?: string;
}

export interface ITelemetryContextData {
  'channel': string;
  'uid': string;
  'env': string;
  'pdata'?: {};
  'sid'?: string;
  'did'?: string;
  'cdata'?: Array<{}>;
  'rollup'?: {};
}
export interface TelemetryObject {
  'id': string;
  'type': string;
  'ver'?: string;
  'rollup': {};
}
export interface TelemetryEventOptions {
  'context'?: ITelemetryContextData;
  'object'?: TelemetryObject;
  'actor'?: {
    'id': string;
    'type': string;
  };
  'tags'?: Array<string>;
}

export interface IShareEventData {
  'type': string;
  'dir': string;
  'items': Array<{}>;
}

export interface ISearchEventData {
  "type": string,
  "query": string, // Required. Search query string 
  "filters"?: {}, // Optional. Additional filters (see the API spec)
  "sort"?: {}, // Optional. Additional sort parameters
  "correlationid"?: string, // Optional. Server generated correlation id (for mobile app's telemetry)
  "size": number, // Required. Number of search results
  "topn": Array<{}> // Required. top N (configurable) results with their score
}

export interface IEventData {
  'context': {
    'env': string;
    'cdata'?: Array<{}>;
  };
  'actor'?: {
    'id': string;
    'type': string;
  };
  'object'?: {
    'id': string;
    'type': string;
    'ver'?: string;
    'rollup'?: {};
  };
  'tags'?: Array<string>;
  'edata': IEndEventData | IErrorEventData | ILogEventData | IShareEventData | IStartEventData | IAuditEventData | ISearchEventData;
}