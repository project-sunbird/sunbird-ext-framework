export class PageAssembleFilter {
    subject: string;
    medium: string;
    grade: string;
}


export class PageAssembleCriteria {
    name: string;
    source: string;
    filters: PageAssembleFilter;
}