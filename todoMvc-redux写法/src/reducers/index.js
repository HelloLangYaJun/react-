import {combineReducers} from "redux"
import pet from "./pet"
import scene from "./scene"
import music from "./music"
const reducer = combineReducers({
    pet,
    scene,
    music
})
export default reducer;