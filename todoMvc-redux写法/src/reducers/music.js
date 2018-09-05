import 地下城 from "../images/地下城与勇士-游戏音乐.mp3"
import 剑三 from "../images/游戏原声-仗剑(仙三、王魁山战斗音乐).mp3"
export default function music(state=地下城,action) {
    switch (action.type){
        case "UPDATEMUSIC":
            return action.text
        default:
            console.log('进错对象啦3')
            return state;
    }
}