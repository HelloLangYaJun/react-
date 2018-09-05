

export default function pet(state=[],action) {
    switch (action.type){
        case "UPDATEPET":
            return action.text
        case 'RESTOR':
            var arr=[...state]
            arr[0].hp=action.text
            console.log('回血成功')
            return arr
        default:
            return state;
    }
}