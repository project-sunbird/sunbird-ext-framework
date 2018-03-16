import { CorrelationData } from "../telemetry/bean";

export declare class ContentDetailRequest {
  contentId: string;
  attachFeedback: boolean;
  attachContentAccess: boolean;
  refreshContentDetails: boolean;
}

export declare class ContentListingCriteria {
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

export declare class FilterValue {
  name: string;
  count: number;
  apply: boolean;
}

export declare class ContentSearchFilter {
  name: string;
  values: Array<FilterValue>;
}

export enum SearchType {
  SEARCH = "search",
  FILTER = "filter",
}

export declare class ContentSearchCriteria {
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

export declare class ContentImport {
  isChildContent: boolean;
  destinationFolder: string;
  contentId: string;
  correlationData: Array<CorrelationData>;
}

export declare class ContentImportRequest {
  contentImportMap: { [index: string]: ContentImport };
  contentStatusArray: Array<string>;
}

export declare class ContentSortCriteria {
  sortAttribute: String;
  sortOrder: SortOrder;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}