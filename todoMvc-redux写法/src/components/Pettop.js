import React,{Component} from "react"
import 剑三 from "../images/fightbgm.mp3"
import start from "../images/start.png"
import {Pet} from "../petku/Pet"
import {skills1} from "../petku/skills";
export default class Pettop extends Component {
    constructor(props){
        super(props)
        this.state={
            visibility:true,
            doted:"·",
            mycolor:"black",
            pvecolor:"black"
        }
    }
   componentDidMount(){
        var div=document.getElementsByClassName('headPortrait-wrap')[0]
        var p1=div.getElementsByTagName('p')[0]
       var color="black"
       switch (this.props.comments.pet[0].rarity){
           case "普通":
               color="black"
               break;
           case "优秀":
               color="#0C4"
               break;
           case "精英":
               color="deepskyblue"
               break;
           case "卓越":
               color="#10E"
               break;
           case "超凡":
               color="#703"
               break;
           case "入圣":
               color="#f00"
               break;
           default:
              break;
       }
       this.setState({
           mycolor:color
       })



   }
   start() {
       if(t){window.clearInterval(t)}
       this.setState({
           visibility: false
       })
       var a="·"
       var random=0;
      var t= setInterval(() =>{
          a=a+"·"
          if(a=="·····"){
              a="·"
          }
          this.setState({
              doted:a
          })
          random=Math.random()*100
          if(random>90){
              var audio=document.getElementsByTagName("audio")[0]
              window.clearInterval(t)
              this.setState({
                  visibility: true
              })
              this.props.comments.updatemusic(剑三)
              this.props.comments.updatescene("Heat")
          }
       }, 500)
   }
   //打开宠物信息
   openpet(){
         var petinform=document.getElementsByClassName('petinform')[0]
         petinform.style.display=="block"?petinform.style.display="none":petinform.style.display="block"
   }
   //开始休息回血
   openrestor(){
         var that=this;
         let t=window.setInterval(()=>{
            var num= Math.round(that.props.comments.pet[0].maxhp/100)+that.props.comments.pet[0].hp
             if(num>that.props.comments.pet[0].maxhp){
                 that.props.comments.restor(that.props.comments.pet[0].maxhp)
                 window.clearInterval(t)
             }
             else {
                 that.props.comments.restor(num)
                 // console.log(that.props.comments)
             }

         },1000)
   }
   openskill(){

   }
    render(){
        return(
            <div className="headPortrait-wrap" >
                 <img src={Pet[this.props.comments.pet[0].id].source} alt=""  className="headPortrait"></img>
                 <p className="inform shuxing" onClick={this.openpet.bind(this)}>属性</p><p className="inform xiuxi" onClick={this.openrestor.bind(this)}>休息</p>
                <div className="wrap">
                    <p className="name" style={{color:this.state.mycolor}}><span>{Pet[this.props.comments.pet[0].id].race} · </span>{Pet[this.props.comments.pet[0].id].name}<span>[{this.props.comments.pet[0].rarity}]</span><span> {this.props.comments.pet[0].rank}级</span></p>
                    <p className="hp">{this.props.comments.pet[0].hp}/{this.props.comments.pet[0].maxhp}</p>
                    <p className="mp">{this.props.comments.pet[0].mp}/{this.props.comments.pet[0].maxmp}</p>
                    <p></p>
                    <p style={{width:200*(this.props.comments.pet[0].hp/this.props.comments.pet[0].maxhp)+"px"}}></p>
                    <p style={{width:200*(this.props.comments.pet[0].mp/this.props.comments.pet[0].maxmp)+"px"}}></p>
                </div>
                <div className="findheat">
                    <p style={{display:this.state.visibility==true?"none":"block"}}>正在搜寻对手{this.state.doted}</p>
                    <img src={start} alt="" onClick={this.start.bind(this)} style={{display:this.state.visibility==false?"none":"block"}}></img>
                </div>
                {/*{id:6,rank:1,rarity:"入圣",maxhp:2400,hp:2400,maxmp:900,mp:800,heat:false,onlyid:10001,skill:[0,1],maxexe:20,exe:0}*/}
                {/*//宠物基本信息*/}
                <div className="petinform"><p><span>种族：{Pet[this.props.comments.pet[0].id].race}</span></p>
                    <p >名字：<span style={{color:this.state.mycolor}}>{Pet[this.props.comments.pet[0].id].name}</span></p>
                    <p >资质：<span style={{color:this.state.mycolor}}>{this.props.comments.pet[0].rarity} </span><p>*注（资质会影响宠物升级的加成，同样高资质会有更高几率领悟高级技能。）</p></p>
                    <div className="skillicon">
                        {this.props.comments.pet[0].skill.map(item=>{ return<img src={skills1[item].icon} key={skills1[item].id}onMouseOver={this.openskill.bind(this)}></img>})}
                    </div>
                    <div className="maxexe"><div className='exe' style={{width:250*(this.props.comments.pet[0].exe/this.props.comments.pet[0].maxexe)+"px"}}></div></div>
                </div>
                {/*//宠物基本信息结束*/}

            </div>
        )
    }
}