import React, { Component } from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../actions/pet"
import Pettop from "../components/Pettop";
import Heat from "../components/Heat";

// import 地下城 from "../images/地下城与勇士-游戏音乐.mp3"
// import 剑三 from "../images/游戏原声-仗剑(仙三、王魁山战斗音乐).mp3"
class App extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
           <section className="todoapp">
               <div className="map">
                   {this.props.scnen=="Pettop"? <Pettop comments={this.props}/>:null}
                   {this.props.scnen=="Heat"? <Heat comments={this.props}/>:null}
                   <audio src={this.props.music} autoPlay="autoPlay" loop="loop" > </audio>
                   {/*autoPlay="autoPlay"*/}
               </div>
           </section>

        );
    }
}
// 定义mapStateToProps
function mapStateToProps(state) {
    return{
        pet:state.pet,
        scnen:state.scene,
        music:state.music
    }
}
// 定义mapDispatchToProps
function mapDispatchToProps(dispath) {
    return bindActionCreators(actions,dispath)
}

// 将Counter变成容器组件并导出
export default connect(mapStateToProps,mapDispatchToProps)(App);

