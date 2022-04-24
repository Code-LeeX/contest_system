import {createStore} from 'redux';
import reducer from './reducer';
 
// 第二个参数用来配置chrome中的redux扩展
const store = createStore(reducer);
 
export default store;