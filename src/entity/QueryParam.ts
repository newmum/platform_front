
/**
 * @Description: 查询入参对象
 * @author： zhengchao
 * @date： 2018年7月6日
 */
export class QueryParam{
    /**
     * 当前页数
     */
    private _page:number;
    set page(page:number){
        this._page = page;
    }
    get page(){
        if(this._page)
            return this._page;
        else
            return 1;
    }

    /**
     * 每页记录数
     */
    private _pageSize:number;
    set pageSize(pageSize:number){
        this._pageSize = pageSize;
    }
    get pageSize(){
        if(this._pageSize)
            return this._pageSize;
        else
            return 10;
    }

    /**
     * 是否需要分页
     */
    private _needPage:boolean=true;
    set needPage(needPage:boolean){
        this._needPage = needPage;
    }
    get needPage(){
        return this._needPage;
    }

    /**
     * 是否有总记录数
     */
    private _needTotal:boolean=false;
    set needTotal(needTotal:boolean){
        this._needTotal = needTotal;
    }
    get needTotal(){
        return this._needTotal;
    }

    /**
     * 条件集合
     */
    private _list:Array<IQueryCondition>;
    set list(list:Array<IQueryCondition>){
        this._list = list;
    }
    get list(){
        if(this._list)
            return this._list;
        else
            return new Array();
    }

    append(condition:IQueryCondition):any{
        if(!this._list){
            this._list = new Array()
        }
        this._list.push(condition)
        return true
    }

    clear(){
        this._list = [];
    }

    constructor() {

    }

    toString(){
        return {
            'page':this.page,
            'pageSize':this.pageSize,
            'needPage':this.needPage,
            'needTotal':this.needTotal,
            'list':this.list
        }
    }
}
interface IQueryParam {
    page:number,
    pageSize:number,
    needPage:boolean,
    needTotal:boolean,
    list:Array<string>
}
export interface IQueryCondition {
    attrName:string,
    attrType?:string,
    condition:string,
    value?:string|number,
    relation?:string
}
