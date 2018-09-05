import 地下城 from "../images/地下城与勇士-游戏音乐.mp3"
import 剑三 from "../images/游戏原声-仗剑(仙三、王魁山战斗音乐).mp3"

import {createStore,applyMiddleware} from "redux"
import reducer from "../reducers/index"

const state = {
    pet:[
        // {id:0,rank:1,rarity:"垃圾",ATK:823,maxhp:2400,hp:2400,maxmp:900,mp:800,heat:false,onlyid:10001},
        {id:6,rank:1,rarity:"入圣",maxhp:2400,hp:2400,maxmp:9,mp:9,heat:false,onlyid:10001,skill:[1,2],maxexe:100,exe:0},
    ],
    scene:"Pettop",
    music:地下城
}
const store=createStore(reducer,state);
export default store;