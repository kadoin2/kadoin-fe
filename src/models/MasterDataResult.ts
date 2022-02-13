
import BaseModel from './BaseModel';
export default class MasterDataResult<T extends BaseModel>
{
    totalData:number = 0;
    page:number = 0;
    perPage:number = 10;
    items:T[] = []
}