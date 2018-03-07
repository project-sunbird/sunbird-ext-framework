import { CorrelationData } from "../telemetry/bean";

export interface ContentDetailRequest {

  contentId: string;
  attachFeedback: boolean;
  attachContentAccess: boolean;
  refreshContentDetails: boolean;
}

export interface ContentListingCriteria {

  contentListingId: string;
  uid: string;
  language: string;
  subject: string;
  age: number;
  grade: number;
  medium: string;
  board: string;
  did: string;
  audience: Array<string>;
  channel: Array<string>;
  facets: Array<string>;
}

export interface FilterValue {
  name: string;
  count: number;
  apply: boolean;
}

export interface ContentSearchFilter {
  name: string;
  values: Array<FilterValue>;
}

export enum SearchType {
  SEARCH = "search",
  FILTER = "filter",
}

export interface ContentSearchCriteria {

  query: string;
  limit: number;
  mode: number;
  age: number;
  grade: number;
  medium: string;
  board: string;
  createdBy: Array<string>;
  audience: Array<string>;
  channel: Array<string>;
  contentStatusArray: Array<string>;
  facets: Array<string>;
  contentTypes: Array<string>;
  facetFilters: Array<ContentSearchFilter>;
  impliedFilters: Array<ContentSearchFilter>;
  sortCriteria: Array<ContentSearchFilter>;
  // 1 - indicates search, 2 - filter
  searchType: SearchType;
}

export interface ContentImport {
  isChildContent: boolean;
  destinationFolder: string;
  contentId: string;
  correlationData: Array<CorrelationData>;
}


export interface ContentImportRequest {
  contentImportMap: { [index: string]: ContentImport };
  contentStatusArray: Array<string>;
}
