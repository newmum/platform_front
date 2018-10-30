
/**
 * @Description: 统一请求参数对象
 * @author： zhengchao
 * @date： 2018年6月1日
 */
export class treeMag {
    data:any = []; //数据
    groups:any = {}; //分组
    init(pid:any) {
        this.group();
        var data = this.getData(this.groups[pid]);
        return data;
    }
    group () {
        for(var i=0; i<this.data.length; i++){
            if(this.groups[this.data[i].pId]){
                this.groups[this.data[i].pId].push(this.data[i]);
            }else{
                this.groups[this.data[i].pId]=[];
                this.groups[this.data[i].pId].push(this.data[i]);
            }
        }
    }
    getData (info:any) { 
        if (!info) return;
        var children = [];
        for (var i = 0; i < info.length; i++) {
            var item = info[i];
            item.children = item['children'].concat(this.getData(this.groups[item.id]));
            if(typeof(item.children[0])=="undefined"){
                item.children=[]
            }    
            children.push(item);
           
        }

        return children;
    }

   constructor(){

 
   }
}
