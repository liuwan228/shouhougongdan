import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import 'lib-flexible'

//引入组件
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Field,Form  } from 'vant';
import { Uploader } from 'vant';
import { Checkbox} from 'vant';
import { Button } from 'vant';
import { Divider } from 'vant';
import { Step, Steps } from 'vant';
import { Image as VanImage } from 'vant';
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);
Vue.use(VanImage);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Divider);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Uploader);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Form);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
