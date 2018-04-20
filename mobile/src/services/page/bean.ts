export class PageAssembleFilter {
    subject?: Array<string>;
    medium?: Array<string>;
    grade?: Array<string>;
    language?: Array<string>;
    concepts?: Array<string>;
    contentType?: Array<string>;
    ageGroup?: Array<string>;
    ownership?: Array<string>;
    status?: Array<string>;
 }


export class PageAssembleCriteria {
    name: string;
    source?: string;
    filters?: PageAssembleFilter;
}