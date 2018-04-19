import { CorrelationData } from "../telemetry/bean";

export class ContentDetailRequest {
  contentId: string;
  attachFeedback?: boolean = false;
  attachContentAccess?: boolean = false;
  refreshContentDetails?: boolean = false;
}

export class ContentListingCriteria {
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

export class FilterValue {
  name: string;
  count: number;
  apply: boolean;
}

export class ContentSearchFilter {
  name: string;
  values: Array<FilterValue>;
}

export enum SearchType {
  SEARCH = "search",
  FILTER = "filter",
}

export class ContentSearchCriteria {
  query?: string;
  limit?: number;
  mode?: string;
  age?: number;
  grade?: Array<string>;
  medium?: Array<string>;
  board?: Array<string>;
  createdBy?: Array<string>;
  audience?: Array<string>;
  channel?: Array<string>;
  pragma?: Array<string>;
  exclPragma?: Array<string>;
  contentStatusArray?: Array<string>;
  facets?: Array<string>;
  contentTypes?: Array<string>;
  keywords?: Array<string>;
  dialCodes?: Array<string>;
  facetFilters?: Array<ContentSearchFilter>;
  impliedFilters?: Array<ContentSearchFilter>;
  sortCriteria?: Array<ContentSearchFilter>;
  // 1 - indicates search, 2 - filter
  searchType?: SearchType;
  offlineSearch?: boolean;
}

export class ContentImport {
  isChildContent: boolean;
  destinationFolder: string;
  contentId: string;
  correlationData: Array<CorrelationData>;
}

export class ContentImportRequest {
  contentImportMap: { [index: string]: ContentImport };
  contentStatusArray?: Array<string>;
}

export class ContentSortCriteria {
  sortAttribute: String;
  sortOrder: SortOrder;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export class ContentFilterCriteria {
  uid?: String;
  contentTypes?: String[];
  audience?: String[];
  pragma?: String[];
  attachFeedback?: Boolean;
  attachContentAccess?: Boolean;
  sortCriteria?: Array<ContentSortCriteria>;
}

export class HierarchyInfo {
  identifier: String;
  contentType: String;
}

export class ChildContentRequest {
  contentId: String;
  hierarchyInfo?: Array<HierarchyInfo>;
  level?: Number;
}

export class ContentDeleteRequest {
  contentDeleteList: Array<ContentDelete>;
}

export class ContentDelete {
  contentId: String;
  isChildContent: Boolean
}

export class ContentExportRequest {
  contentIds?: Array<String>;
  destinationFolder: String;
}

export enum DownloadAction {
  RESUME = 0,
  PAUSE = 1,
}