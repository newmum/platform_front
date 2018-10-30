
interface IData {
    CrmUser ?: any,
    Page ?: any,
    attrList ?: any,
    headList?:Array<any>,
    menuList?:Array<IMenu>,
    userList?:any
    user?:any
}

interface IPage {
    page:number,//当前页数
    pageSize:number,//
    total:number,//总记录数
    list:Array<any>//数据集合
}

interface IMenu {
    id:number,
    url:string,
    icon:string,
    title:string,
    sort:number,
    path:string,
    method:string
}