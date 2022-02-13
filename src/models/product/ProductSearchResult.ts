    
import SearchResultItem from './SearchResultItem';

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


export default class ProductSearchResult
{
    
    queries: Queries;
    items: SearchResultItem[]
}