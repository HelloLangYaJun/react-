
//修改游戏场景
export function updatescene(text) {
    return{
        type:"UPDATESCENE",
        text
    }
}
//修改音乐
export function updatemusic(text) {
    return{
        type:"UPDATEMUSIC",
        text
    }
}
//修改宠物属性
export function updatepet(text) {
    return{
        type:"UPDATEPET",
        text
    }
}
//回复血量
export function restor(text) {
    return{
        type:"RESTOR",
        text
    }
}