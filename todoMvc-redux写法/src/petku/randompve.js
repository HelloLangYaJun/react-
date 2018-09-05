import {Pet} from "../petku/Pet"
export  default function  randompve(rank) {
    var rarity="普通"
    var idnum=0
    function pve() {
        var raritynum= Math.round(Math.random()*1000)
        if (raritynum<930){
            if(raritynum>500&&raritynum<800){
                rarity="优秀"
            }
            else if (raritynum>800){
                rarity="精英"
            }
        }
        else if (raritynum<980){
            rarity="卓越"
        }
        else if(raritynum<995){
            rarity="超凡"
        }
        else {
            rarity="入圣"
        }
        // if (idnum<930){
        //     if(raritynum>500&&raritynum<800){
        //         id=1
        //     }
        //     else if (raritynum>800){
        //         id=2
        //     }
        // }
        // else if (raritynum<980){
        //     id=3
        // }
        // else if(raritynum<995){
        //     id=4
        // }
        // else {
        //     id=5
        // }
        for(var id=0;id<Pet.length;id++){
            if(Math.random()>0.5){
                idnum++
            }
            else {
                break;
            }
        }
    }
    pve()
    return {id:idnum,rank,rarity,maxhp:Pet[idnum].maxhp,hp:Pet[idnum].maxhp,maxmp:9,mp:Pet[idnum].maxmp,heat:false,skill:[0,1]}
}