import {skills1} from "../petku/skills";
export function my(my,you,skill) {
    var my=my
    var you=you
    var damage=0;
    damage=Math.round(skill.damage*my.maxmp)
    if ((you.hp-=damage)<=0){
        you.hp=0
        console.log('你胜利了')
        return [damage]
    }
    else {
        console.log(`你使用了普通攻击,造成了${damage}点伤害`)
    }
    return [my,you,damage]
}
export function you(my,you,skill) {
    var my=my
    var you=you
    var damage=0;
    damage=Math.round(skill.damage*you.maxmp)
    if ((my.hp-=damage)<=0){
        my.hp=0
        console.log('你死亡了')
        return [damage]
    }
    else {
        console.log(`敌方使用了普通攻击,造成了${damage}点伤害`)
    }
    return [my,you,damage]
}