export default function scene(state="Pettop",action) {
    switch (action.type){
        case "UPDATESCENE":
            return action.text
        default:
            console.log('进错对象啦2')
            return state;
    }
}