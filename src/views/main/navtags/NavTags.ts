import {Component, Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'
import './navtags.less'
import {LocalStorage} from "../../../core/storage/LocalStorage";
import {StorageConst} from "../../../constant/StorageConst";
import {BaseView} from "../../../core/base/BaseView";
import MainAction from "../MainAction";
import {UIRouter} from "../UIRouter";

@Component({
  template: require('./navtags.html')
})
export default class NavTags extends BaseView {
    tagBodyLeft = 0
    refsTag: Array<any> = []

    @Prop({ default:[] })
    tagsList: Array<any>;

    @Prop()
    currentRouter:UIRouter;

  // @Prop({
  //   default: '',
  //   validator: (item) => {
  //     return true
  //   }
  // })
  // beforePush: Function

  handlescroll(e: any) {
    var type = e.type;
    let delta = 0;
    if (type === 'DOMMouseScroll' || type === 'mousewheel') {
      delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
    }
    let left = 0;
    if (delta > 0) {
      left = Math.min(0, this.tagBodyLeft + delta);
    } else {
      let refs: any = this.$refs;
      if (refs.scrollCon.offsetWidth - 100 < refs.scrollBody.offsetWidth) {
        if (this.tagBodyLeft < -(refs.scrollBody.offsetWidth - refs.scrollCon.offsetWidth + 100)) {
          left = this.tagBodyLeft;
        } else {
          left = Math.max(this.tagBodyLeft + delta, refs.scrollCon.offsetWidth - refs.scrollBody.offsetWidth - 100);
        }
      } else {
        this.tagBodyLeft = 0;
      }
    }
    this.tagBodyLeft = left;
  }

  moveToView(tag: any) {
    let refs: any = this.$refs;
    if (tag.offsetLeft < -this.tagBodyLeft) {
      // 标签在可视区域左侧
      this.tagBodyLeft = -tag.offsetLeft + 10;
    } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + refs.scrollCon.offsetWidth - 100) {
      // 标签在可视区域
      this.tagBodyLeft = Math.min(0, refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20);
    } else {
      // 标签在可视区域右侧
      this.tagBodyLeft = -(tag.offsetLeft - (refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
    }
  }

    /**
     * 导航下拉操作
     */
    handleTagsOption(type: any) {
        if (type === 'clearAll') {
            MainAction.addBreadcrumb(this, MainAction.mainRouter);
            this.$store.state.app.tagsList = [MainAction.mainRouter];
            LocalStorage.set(StorageConst.TAGS_LIST, [MainAction.mainRouter]);
            this.$router.push({
                name: 'main'
            });
        } else {
            this.$store.state.app.tagsList = [];
            LocalStorage.set(StorageConst.TAGS_LIST, []);
            MainAction.addTags(this, this.currentRouter.id);
        }
        this.tagBodyLeft = 0;
    }

    /**
     * 关闭单个标签
     */
    closePage(item:any) {
        let lastPageObj = this.tagsList[0];
        if (this.currentRouter.id === item.id) {
            let len = this.tagsList.length;
            for (let i = 1; i < len; i++) {
                if (this.tagsList[i].name === item.name) {
                    if (i < (len - 1)) {
                        lastPageObj = this.tagsList[i + 1];
                    } else {
                        lastPageObj = this.tagsList[i - 1];
                    }
                    break;
                }
            }
        } else {
            //let tagWidth = event.target.parentNode.offsetWidth;
            //this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0);
        }
        this.tagsList.map((tags:any, index:number) => {
            if (tags.name === item.name) {
                this.tagsList.splice(index, 1);
            }
        });
        localStorage.tagsList = JSON.stringify(this.tagsList);
        if (this.currentRouter.id === item.id) {
            this.linkTo(lastPageObj);
        }
    }

    /**
     * 点击导航标签
     */
    linkTo(item: any) {
        if(item.name != this.currentRouter.name){
            let routerObj: any = {};
            routerObj.name = item.name;
            if (item.argu) {
                routerObj.params = item.argu;
            }
            if (item.query) {
                routerObj.query = item.query;
            }
            this.$router.push(routerObj);
            MainAction.addBreadcrumb(this, item);
        }
    }

    mounted() {
        // let refs: any = this.$refs;
        // this.refsTag = refs.tagsPageOpened
        // setTimeout(() => {
          //   refs.forEach((item: any, index: any) => {
          //   if (this.$route.name === item.name) {
          //     let tag = refs[index].$el;
          //     this.moveToView(tag);
          //   }
          // });
        // }, 1); // 这里不设定时器就会有偏移bug
    }

    @Watch('$route')
    router (to: any) {
        // this.$nextTick(() => {
        //     this.refsTag.forEach((item: any, index: any) => {
        //         if (to.name === item.name) {
        //             let tag = this.refsTag[index].$el;
        //             this.moveToView(tag);
        //         }
        //     });
        // });
    }

}
