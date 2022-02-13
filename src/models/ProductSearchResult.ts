    

class Query
{
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    searchType: string
}
class Queries
{
    request: Query[];
    nextPage: Query[];
}
class SearchItem
{
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    mime: string;
    fileFormat: string;
    image:SearchImage;
}
class SearchImage
{
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
}
export default class ProductSearchResult
{
    
    queries: Queries;
    items: SearchItem[]
}