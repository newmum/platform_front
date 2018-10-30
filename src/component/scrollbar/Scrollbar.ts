import { Component, Prop } from 'vue-property-decorator'
import './scrollbar.less'
import {BaseView} from "../../core/base/BaseView";

@Component({
  template: require('./scrollbar.html')
})
export default class Scrollbar extends BaseView {

    @Prop({
        type: Number,
        default: 20
    })
    speed: number;

    @Prop({
        type: Object,
        default () {
            return {};
        }
    })
    scrollXStyle: any;

    @Prop({
        type: Object,
        default () {
            return {};
        }
    })
    scrollYStyle: any;

    @Prop({
        type: Boolean,
        default: false
    })
    disScrollX: boolean;

    @Prop({
        type: Boolean,
        default: false
    })
    disScrollY: boolean;

    @Prop({
        type: String,
        default: 'cover'
    })
    scrollXType: string;

    @Prop({
        type: String,
        default: 'cover'
    })
    scrollYType: string;

    @Prop({
        type: Boolean,
        default: false
    })
    showAll: boolean;

    prefix: 'vue-scroller-bars';
    scrollOffsetX = 0;
    scrollOffsetY = 0;
    contentSize = {
        width: 0,
        height: 0
    };
    wraperSize = {
        width: 0,
        height: 0
    };
    initY = 0;
    initOffsetY = 0;
    initX = 0;
    initOffsetX = 0;
    wraperClasses () {
        return [
            this.prefix+`-wraper`,
            this.showAll ? '' : 'show-when-hover'
        ];
    }
    contentStyles () {
        return {
            transform: `translate3d(-${this.scrollOffsetX}px, -${this.scrollOffsetY}px, 0px)`,
            width: this.disScrollX ? '100%' : 'auto',
            height: this.disScrollY ? '100%' : 'auto'
        };
    }
    percentY () {
        return this.wraperSize.height / this.contentSize.height;
    }
    scrollYStyles () {
        return Object.assign(this.scrollYStyle, {
            height: this.percentX() < 1 ? 'calc(100% - 14px)' : '100%'
        });
    }
    scrollBarYHeight () {
        return this.percentY() * (this.wraperSize.height - 2);
    }
    scrollBarYStyles () {
        let height:number = this.scrollBarYHeight();
        return {
            transform: `translate3d(0px, ${this.scrollOffsetY * (height / this.wraperSize.height)}px, 0px)`,
            height: `${height}px`
        };
    }
    scrollYClasses () {
        return [
            this.prefix+`-scroll`,
            this.prefix+`-scroll-y`,
            this.scrollYType === 'cover' ? 'scroll-y-cover' : ''
        ];
    }
    gapY () {
        return this.contentSize.height - this.wraperSize.height;
    }
    percentX () {
        return this.wraperSize.width / this.contentSize.width;
    }
    scrollXStyles () {
        return Object.assign(this.scrollXStyle, {
            width: this.percentY() < 1 ? 'calc(100% - 14px)' : '100%'
        });
    }
    scrollBarXWidth () {
        return this.percentX() * (this.wraperSize.width - 2);
    }
    scrollBarXStyles () {
        let width:number = this.scrollBarXWidth();
        return {
            transform: `translate3d(${this.scrollOffsetX * (width / this.wraperSize.width)}px, 0px, 0px)`,
            width: `${width}px`
        };
    }
    scrollXClasses () {
        return [
            this.prefix+`-scroll`,
            this.prefix+`-scroll-x`,
            this.scrollXType === 'cover' ? 'scroll-x-cover' : ''
        ];
    }
    gapX () {
        return this.contentSize.width - this.wraperSize.width;
    }

    resize () {
        let self = this;
        this.$nextTick(() => {
            let wraperRect = self.$refs.wraper.getBoundingClientRect();
            let contentRect = self.$refs.content.getBoundingClientRect();
            self.contentSize = {
                width: contentRect.width,
                height: contentRect.height
            };
            let percentXLowerThanOne = (wraperRect.width / contentRect.width) < 1;
            let percentYLowerThanOne = (wraperRect.height / contentRect.height) < 1;
            let gap = percentXLowerThanOne && percentYLowerThanOne ? 14 : 0;
            this.wraperSize = {
                width: wraperRect.width - gap,
                height: wraperRect.height - gap
            };
            if (self.contentSize.height <= this.wraperSize.height) { // if content's height shorter than wraper's height
                self.scrollOffsetY = 0;
            };
            if ((wraperRect.bottom > contentRect.bottom) && (self.scrollOffsetY > 0)) { // if content's bottom upper wraper's bottom
                self.scrollOffsetY += contentRect.bottom - wraperRect.bottom;
            };
        });
    }
    handleMouseWheel (e:any) {
        this.scrollOffsetY += this.percentY() < 1 ? e.deltaY : 0;
        this.scrollOffsetX += this.percentX() < 1 ? e.deltaX : 0;
        if (this.percentY() < 1) {
            if (this.scrollOffsetY >= this.gapY()) {
                this.scrollOffsetY = Math.min(this.gapY(), this.scrollOffsetY);
            } else if (this.scrollOffsetY <= 0) {
                this.scrollOffsetY = Math.max(this.scrollOffsetY, 0);
            }
        }
        if (this.percentX() < 1) {
            if (this.scrollOffsetX >= this.gapX()) {
                this.scrollOffsetX = Math.min(this.gapX(), this.scrollOffsetX);
            } else if (this.scrollOffsetX <= 0) {
                this.scrollOffsetX = Math.max(this.scrollOffsetX, 0);
            }
        }
    }
    handleDOMMouseWheel (e:any) {
        this.scrollOffsetY += e.detail * 16;
        if (this.scrollOffsetY >= this.gapY()) {
            this.scrollOffsetY = Math.min(this.gapY(), this.scrollOffsetY);
        } else if (this.scrollOffsetY <= 0) {
            this.scrollOffsetY = Math.max(this.scrollOffsetY, 0);
        }
    }
    handleMousemoveY (e:any) {
        let offset = e.pageY - this.initY;
        this.scrollOffsetY = this.initOffsetY + offset / ((this.wraperSize.height - 2 - this.scrollBarYHeight()) / (this.contentSize.height - this.wraperSize.height));
        if (this.scrollOffsetY >= this.gapY()) {
            this.scrollOffsetY = Math.min(this.gapY(), this.scrollOffsetY);
        } else if (this.scrollOffsetY <= 0) {
            this.scrollOffsetY = Math.max(this.scrollOffsetY, 0);
        }
        e.preventDefault();
    }
    handleMousedownScrollBarY (e:any) {
        this.initY = e.pageY;
        this.initOffsetY = this.scrollOffsetY;
        document.addEventListener('mousemove', this.handleMousemoveY);
        document.addEventListener('mouseup', this.handleMouseup);
    }
    handleMousemoveX (e:any) {
        let offset = e.pageX - this.initX;
        this.scrollOffsetX = this.initOffsetX + offset / ((this.wraperSize.width - 2 - this.scrollBarXWidth()) / (this.contentSize.width - this.wraperSize.width));
        if (this.scrollOffsetX >= this.gapX()) {
            this.scrollOffsetX = Math.min(this.gapX(), this.scrollOffsetX);
        } else if (this.scrollOffsetX <= 0) {
            this.scrollOffsetX = Math.max(this.scrollOffsetX, 0);
        }
        e.preventDefault();
    }
    handleMousedownScrollBarX (e:any) {
        this.initX = e.pageX;
        this.initOffsetX = this.scrollOffsetX;
        document.addEventListener('mousemove', this.handleMousemoveX);
        document.addEventListener('mouseup', this.handleMouseup);
    }
    handleMouseup (e:any) {
        document.removeEventListener('mousemove', this.handleMousemoveY);
        document.removeEventListener('mousemove', this.handleMousemoveX);
        document.removeEventListener('mousemove', this.handleMouseup);
    }
    mounted () {
        this.resize();
    }
}
