import React,{Component} from "react"
import random from "../petku/randompve"
import {Pet} from "../petku/Pet"
import {my,you} from "../petku/Heat"
import 地下城 from "../images/地下城与勇士-游戏音乐.mp3"
import {skills1} from "../petku/skills";
export default class Heat extends Component {
    constructor(props){
        super(props)
        this.state={
            pve:{id:0,rank:1,rarity:"精英",maxhp:1000,hp:500,maxmp:800,mp:800,heat:false,skill:[0,1]},
            bout:1,
            starttime:3,
            timer:true,
            visibility:true,
            imagesource:null, //技能图片
            damage:0,         //技能伤害值
            skillmusic:null    //技能释放的音乐
        }
    }
    componentDidMount(){
        var div=document.getElementsByClassName('headPortrait-wrap')[0]
        var p1=div.getElementsByTagName('p')[0]
        var p4=div.getElementsByTagName('p')[3]
        switch (this.props.comments.pet[0].rarity){
            case "普通":
                p1.style.color="black"
                break;
            case "优秀":
                p1.style.color="#0C4"
                break;
            case "精英":
                p1.style.color="deepskyblue"
                break;
            case "卓越":
                p1.style.color="#10E"
                break;
            case "超凡":
                p1.style.color="#703"
                break;
            case "入圣":
                p1.style.color="#f00"
                break;
            default:
                break;
        }
        //随机生成怪物属性
        this.setState({
            pve:random(this.props.comments.pet[0].rank)
        })
        //开始游戏进程
        function openstart() {
            var time=this.state.starttime
            var that=this
            var t1
            //判断定时器是否已有，如果有，不再生成
            if(this.state.timer){
                that.setState({
                    timer:false
                })
                //生成定时器，三秒后开始战斗
                t1= window.setInterval(function a(){
                    time--
                    that.setState({
                        starttime:time
                    })
                    //三秒结束，开始战斗
                    if(time==1){
                        window.clearInterval(t1)
                        //让战斗三秒开始的提示框消失
                        let startheat= document.getElementsByClassName('startheat')[0]
                        //递归进行战斗，直到一方死亡
                        function heat() {
                           window.setTimeout(()=>{
                               startheat.style.display="none"
                               //我方回合
                               if(that.state.bout%2==1){


                   //---------------------------生成技能，加载技能-----------------------
                                   var i=0;//用于计算技能特效图片总数
                                   var youskill=document.getElementsByClassName('youskill')[0]
                                   youskill.style.display="block"
                                   var j=that.props.comments.pet[0].skill[Math.round(Math.random()*(that.props.comments.pet[0].skill.length-1))];//用于生成随机技能

                                   var imgtime=window.setInterval(()=>{
                                       that.setState({
                                           imagesource:skills1[j].img[i]
                                       })
                                       i++
                                       if(i==skills1[j].img.length){
                                           that.setState({
                                               imagesource:null
                                           })
                                           youskill.style.display="none"
                                           window.clearInterval(imgtime)
                                       }
                                   },100)
                    //---------------------------生成技能，加载技能完毕-----------------------

                     //---------------------------进行伤害计算-----------------------
                                   var arr=my(that.props.comments.pet[0],that.state.pve,skills1[j])  //进行伤害判定
                                   var mydamage=document.getElementsByClassName('shanghai')[1]
                                   mydamage.style.display="block"
                                   that.setState({
                                       skillmusic:skills1[j].music,
                                       damage:arr[arr.length-1]
                                   })
                                   setTimeout(()=>{mydamage.style.display="none"},1000)
                                   if(arr.length==1){
                                       //胜利
                                       var endheat=document.getElementsByClassName("success")[0]
                                       endheat.style.display="block"
                                       setTimeout(()=>{
                                           endheat.style.display="none"
                                           var pet=that.props.comments.pet[0]
                                           //-------------------------战斗结算，提升经验值--------------------------------------
                                           var upexe=function () {
                                               var exe=20
                                               for(var j=0;j<that.props.comments.pet[0].rank;j++){
                                                   exe=Math.round(exe*1.09)
                                               }
                                                pet.exe+=exe;
                                               if(pet.exe>=pet.maxexe){
                                                   console.log('升级')
                                                   pet.exe-=pet.maxexe
                                                   pet={id:6,rank:pet.rank+=1,rarity:"入圣",
                                                       maxhp:pet.maxhp=Math.round(pet.maxhp*=1.1),
                                                       hp:pet.hp=pet.maxhp,
                                                       maxmp:pet.maxmp=Math.round(pet.maxmp*=1.1),
                                                       mp:pet.mp=pet.maxmp,
                                                       heat:false,onlyid:10001,
                                                       skill:[0,1],maxexe:pet.maxexe=Math.round(pet.maxexe*=1.1),
                                                       exe:pet.exe}
                                                       console.log(that.props.comments.pet[0])
                                               }
                                           }
                                           upexe()
                                           //-------------------------战斗结算，提升经验值完毕--------------------------------------
                                           that.props.comments.updatemusic(地下城)
                                           that.props.comments.updatescene("Pettop")
                                       },4000)


                                   }
                                   else {
                                       if (arr[1].hp==0){
                                           that.props.comments.updatemusic(地下城)
                                           that.props.comments.updatescene("Pettop")
                                       }
                                       else {
                                           heat()
                                       }
                                   }
                                   that.setState({
                                       // pve,
                                       visibility:false,
                                       bout:that.state.bout+1
                                   })
                     //---------------------------进行伤害计算完毕-----------------------
                               }
                               //敌方回合
                               else {
                                   //---------------------------生成技能，加载技能-----------------------
                                   var i=0;//用于计算技能特效图片总数
                                   var myskill=document.getElementsByClassName('myskill')[0]
                                   myskill.style.display="block"
                                   var j= that.state.pve.skill[Math.round(Math.random()*(that.state.pve.skill.length-1))];//用于生成随机技能
                                   var imgtime=window.setInterval(()=>{
                                       that.setState({
                                           imagesource:skills1[j].img[i]
                                       })
                                       i++
                                       if(i==skills1[0].img.length){
                                           that.setState({
                                               imagesource:null
                                           })
                                           myskill.style.display="none"
                                           window.clearInterval(imgtime)
                                       }
                                   },100)
                                   //---------------------------生成技能，加载技能完毕-----------------------
                                   //---------------------------进行伤害计算-----------------------
                                   var arr=you(that.props.comments.pet[0],that.state.pve,skills1[j])
                                   var youdamage=document.getElementsByClassName('shanghai')[0]
                                   youdamage.style.display="block"
                                   console.log(youdamage)
                                   that.setState({
                                       skillmusic:skills1[j].music,
                                     damage:arr[arr.length-1]
                                   })
                                   setTimeout(()=>{youdamage.style.display="none"},1000)
                                   if(arr.length==1){
                                       //失败
                                       var failed=document.getElementsByClassName("failed")[0]
                                       failed.style.display="block"
                                       setTimeout(()=>{
                                           that.props.comments.updatemusic(地下城)
                                           that.props.comments.updatescene("Pettop")
                                       },2000)

                                   }
                                   else {
                                       if (arr[0].hp==0){
                                           that.props.comments.updatemusic(地下城)
                                           that.props.comments.updatescene("Pettop")
                                       }
                                       else {
                                           heat()
                                       }
                                   }
                                   that.setState({
                                       visibility:false,
                                       bout:that.state.bout+1
                                   })
                                   //---------------------------进行伤害计算完毕-----------------------
                               }
                           },3000)
                        }
                        heat()
                    }
                },1000)

            }
        }
        openstart.bind(this)()
    }
    render(){

        return(
            <div className="map heat" style={ {display:this.props.comments.scnen=="Heat"?"block":"none"}}>
                <div className="headPortrait-wrap">
                    <div className="mypve">
                        <img src={this.state.imagesource} alt="" style={{display:"none"}} className="myskill"></img>
                        <img src={Pet[this.props.comments.pet[0].id].source} alt=""  className="headPortrait"></img>
                        <span className="shanghai">{this.state.damage}</span>
                        <div className="wrap">
                            <p className="name"><span>{Pet[this.props.comments.pet[0].id].race} · </span>{Pet[this.props.comments.pet[0].id].name}<span>[{this.props.comments.pet[0].rarity}]</span><span> {this.props.comments.pet[0].rank}级</span></p>
                            <p className="hp">{this.props.comments.pet[0].hp}/{this.props.comments.pet[0].maxhp   }</p>
                            <p className="mp">{this.props.comments.pet[0].mp}/{this.props.comments.pet[0].maxmp}</p>
                            <p></p>
                            <p style={{width:200*(this.props.comments.pet[0].hp/this.props.comments.pet[0].maxhp)+"px"}}></p>
                            <p style={{width:200*(this.props.comments.pet[0].mp/this.props.comments.pet[0].maxmp)+"px"}}></p>
                        </div>
                    </div>
                    <div className="pve">
                        <img src={this.state.imagesource} alt="" style={{display:"none"}} className="youskill"></img>
                        <img src={Pet[this.state.pve.id].source} alt=""  className="headPortrait" ></img>
                        <span className="shanghai">{this.state.damage}</span>
                        <div className="wrap">
                            <p className="name"><span>{Pet[this.state.pve.id].race} · </span>{Pet[this.state.pve.id].name}<span>[未知]</span></p>
                            <p className="hp">?/?</p>
                            <p className="mp">?/?</p>
                            <p></p>
                            <p style={{width:200*(this.state.pve.hp/this.state.pve.maxhp)+"px"}}></p>
                            <p style={{width:200*(this.state.pve.mp/this.state.pve.maxmp)+"px"}}></p>
                        </div>
                    </div>
                </div>
                <p className="startheat">即将开始战斗<span>{this.state.starttime}</span></p>
                <p className="endheat success">恭喜您赢得胜利</p>
                <p className="endheat failed">胜败乃兵家常事，请继续来过</p>
                <audio src={this.state.skillmusic} autoPlay="autoPlay"></audio>
            </div>

        )
    }
}