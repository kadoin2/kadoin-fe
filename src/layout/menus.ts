import Menu from "../models/Menu";
export const getMenus = () => allMenus;
export const allMenus:Menu[] = [
    {
        code:'home',
        name:'Home', 
        url:'/home',
        aliasUrl:['/'],
        authorized:false
    },
   
];