/**
 * @ClassName: Map
 * @Description: MAP集合组件
 * @author： zhengchao
 * @date： 2018年7月10日
 */
export class Map {
    private static map:any = {};
    static put (key:string, value:string) {
        this.map[key] = value;
    };
    static remove (key:string) {
        if (this.map.hasOwnProperty(key)) {
            delete this.map[key];
        }
    };
    static get (key:string) {
        if (this.map.hasOwnProperty(key)) {
            return this.map[key];
        }
        return null;
    };
    static getKeys () {
        let keys = [];
        for (let k in this.map) {
            keys.push(k);
        }
        return keys;
    };

    static each (fn:Function) {
        for (let key in this.map) {
            fn(key, this.map[key]);
        }
    };
    static toString () {
        let str = "{";
        for (let k in this.map) {
            str += "\"" + k + "\" : \"" + this.map[k] + "\",";
        }
        str = str.substring(0, str.length - 1);
        str += "}";
        return str;
    }
}