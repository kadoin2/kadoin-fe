
import UserRole from './../constants/UserRole';
import BaseModel from './BaseModel';
export default class User extends BaseModel
{
    name:string;
    displayName:string;
    role:UserRole;
    phoneNumber:string;
    email: string;

}