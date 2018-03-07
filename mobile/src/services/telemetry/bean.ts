export interface SyncStat {
  syncedEventCount: Number;
  syncTime: Number;
  syncedFileSize: String;
}

export interface Actor {
   // readonly TYPE_SYSTEM = "System";
   // readonly TYPE_USER = "User";
  id: string;
  type: string;
}

export interface Audit {
  env: string;
  props: Array<string>;
  currentState: string;
  prevState: string;
  actorType: string;
}

export interface Context {
  channel: string;
  pdata: ProducerData;
  env: string;
  sid: string;
  did: string;
  cdata: Array<CorrelationData>;
}

export interface DeviceSpecification {
  os: string ;
  make: string ;
  id: string ;
  mem: number ;
  idisk: number ;
  edisk: number ;
  scrn: number ;
  camera: string;
  cpu: string ;
  sims: number ;
  cap: Array<String> ;
}

export interface End {
  env: string;
  type: string;
  mode: string;
  duration: number;
  pageId: string;
  objId: string;
  objType: string;
  objVer: string;
  rollup: Rollup;
  summaryList: Array<{ [index: string]: any }>;
}

export interface Error {
  errorCode: string;
  errorType: string;
  stacktrace: string;
  pageId: string;
  env: string;
}

export interface Etags {
  app: Array<string>;
  partner: Array<string>;
  dims: Array<string>;
}

export interface ExData {
  type: string;
  data: string;

}

export interface Feedback {
  env: string;
  rating: number;
  comments: string;
  id: string;
  version: string;
  type: string;
}

export interface GameData {
  id: string;
  ver: string;
}

export interface CorrelationData {
  id: string;
  type: string;
}

export interface Rollup {
  l1: string;
  l2: string;
  l3: string;
  l4: string;
}

export interface Visit {
  objid: string;
  objtype: string;
  objver: string;
  section: string;
  index: number;
}

export interface Impression {
  type: string;
  pageId: string;
  subType: string;
  uri: string;
  objectId: string;
  correlationData: Array<CorrelationData>;
  objectType: string;
  objectVersion: string;
  rollup?: Rollup
}


export interface Interact {
  env: string;
  type: string;
  subType: string;
  id: string;
  pageId: string;
  pos: Array<{ [index: string]: string }> ;
  values: Array<{ [index: string]: any }> ;
  valueMap: { [index: string]: any };
  correlationData: Array<CorrelationData>;
  objId: string;
  objType: string;
  objVer: string;
  rollup: Rollup;
}

export interface Interrupt {
  env: string;
  type: string;
  pageId: string;
}

export interface Log {
  env: string;
  type: string;
  level: string;
  message: string;
  pageId: string;
  params: Array<{ [index: string]: any }>;
  actorType: string;
}

export interface ProducerData {
  id: string;
  pid: string;
  ver: string;
}

export interface Search {
  type: string;
  query: string;
  filters: { [index: string]: any };
  sort: { [index: string]: any };
  correlationid: string;
  size: number;
}

export interface Share {
  env: string;
  direction: string;
  dataType: string;
  items: Array<{ [index: string]: any }>;

}

export interface Start {
  env: string;
  type: string;
  deviceSpecification: DeviceSpecification;
  loc: string;
  mode: string;
  duration: number;
  pageId: string;
  objId: string;
  objType: string;
  objVer: string;
  rollup: Rollup;
}

export interface TelemetryObject {
  id: string;
  type: string;
  version: string;
  rollup: Rollup;
}
