
/**
 * @ClassName: TipConst
 * @Description: 系统提示常量类
 * @author： zhengchao
 * @date： 2018年7月10日
 */
class TipConst{
    login_success = "登录成功，为您跳转到首页..."
    operate_success  = "操作成功"

    id_null = "更新时id为null"
    resource_no_exist  = "资源不存在"
    resource_no_found = "资源对象路径有误"
    perfect_email_validate_error = "完善资料邮箱验证错误"
    perfect_mobile_validate_null = "完善资料手机验证为空"
    perfect_mobile_validate_error  = "完善资料手机验证错误"
    illegal_user = "非法用户"
    user_no_login = "用户未登录"
    type_no_exist = "操作的类型不存在"
    template_no_exist  = "模板不存在"
    user_no_exist = "用户不存在"
    mobile_email_null = "手机 邮箱为空"
    password_update_failed = "密码更新失败"
    password_input_null  = "密码输入为空"
    passwordOld_input_null = "旧密码输入为空"
    passwordNew_input_null = "新密码输入为空"
    passwordnew_no_equals = "两次新密码不相同"
    password_error = "密码错误"
    validate_input_null  = "验证码输入为空"
    validate_null = "验证码错误"
    validate_error = "验证码错误"
    logout_failed = "注销失败"
    register_success = "注册成功，请登录"
    register_error  = "注册失败"
    mobile_no_exist = "手机不存在"
    mobile_has_exist  = "手机已存在"
    mobile_format_error = "手机格式错误"
    email_format_error  = "邮箱格式错误"
    email_has_exist = "邮箱已存在"
    email_no_exist = "邮箱不存在"
    email_send_error = "邮件发送失败"
    sms_send_error  = "短信发送失败"
    account_format_3to20 = "账号格式错误"
    operate_failed = "操作失败"
    no_login = "请登录"
    no_power = "没有权限"
    data_null = "data为空"
    param_null = "param为空"
    json_format_error  = "json格式错误"
    class_not_found = "类没找到"

    name_has_exist="文件已经存在"
    jdbc_field_has_exist="字段名称已存在"
    resource_table_name_null="resource表格名称为空"
    resource_name_null="resource名称为空"
    table_name_has_exist="表格名称已存在"
    table_name_null="表格名称为空"
    category_module_name_null="栏目模型名称为空"
    groupid_null="分组id为空"
    userIds_null="用户id集合为空"
    id_no_exist="id不存在"
    null_pointer="空指针"

    system_field_not_delete="系统字段不能删除"



    ui_componet_prop_has_exist = "组件属性已存在"
    ui_componet_prop_all = "组件属性已都添加"

    create_table_resPropList_null="创建表格时,字段集合为空"
    validate_image_input_null="图形验证码输入为空"
    validate_image_get="请获取图形验证码"



}
export class Tips {
    private static map:any = new TipConst();
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
        return '';
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
