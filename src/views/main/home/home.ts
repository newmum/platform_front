import { Component, Watch, Vue } from 'vue-property-decorator'
import './home.less'
import home from "./home"


@Component({
  template: require('./home.html'),
})
export default class Home extends Vue {



}