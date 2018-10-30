
/**
 * @ClassName: UserAgentUtil
 * @Description: 用户代理组件
 * @author： zhengchao
 * @date： 2018年5月31日
 */
export class UserAgentUtil{

    static isMobile(){
        let ismb = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return ismb;
    }
}
