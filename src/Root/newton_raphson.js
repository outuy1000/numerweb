import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { newton_raphsoncal} from '../Compute';
import './root.css';

import apis from '../API/index'
import ModalExample from './modalexample'

class Newton_Raphson extends React.Component{
    state = {
        Equation: '',
        X: '',
        ERROR: '',
        result: '',
        isModalVisible: false,
        apiData: [],
        hasData: false
    };

    async getData(){
        let tempData = null
        await apis.getRoot().then(res => {tempData = res.data})
        this.setState({apiData: tempData})
        this.setState({hasData: true})
    }

    onClickOk = e =>{
        this.setState({isModalVisible: false})
    }

    onClickInsert = e =>{
        let index = e.currentTarget.getAttribute('name').split('_')
            index = parseInt(index[1])
            this.setState({
                Equation: this.state.apiData[index]["equation"],
                X: this.state.apiData[index]["initial_x"],
                ERROR: this.state.apiData[index]["error"],
                isModalVisible: false
            })
    }

    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible: true})
    }

    getEquation = (e) => {
        this.setState({Equation: e.target.value});
    };

    getX = (e) => {
        this.setState({X: e.target.value});
    };

    getERR = (e) => {
        this.setState({ERROR: e.target.value});
    };

    onClickcal = () => {
        let equation = this.state.Equation;
        let x = this.state.X;
        let error = this.state.ERROR;
        let ans = newton_raphsoncal(equation,x,error);
        this.setState({result: ans});
    };
    
    render(){
        return(
            <div>
                <ModalExample 
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
                <div>
                    <div className='set_head'>
                        Newton-Raphson
                    </div>
                    Equation: <Input className="set_input" onChange={this.getEquation} value={this.state.Equation} />
                    X: <Input className="set_input" onChange={this.getX} value={this.state.X} />
                    Error: <Input className="set_input" onChange={this.getERR} value={this.state.ERROR} />
                </div>
                <div className="set_center">
                    <Button onClick={this.onClickExample} className="set">Example</Button>
                    <Button type="primary" onClick={this.onClickcal} className="set set_margin_left">Calculate</Button>
                </div>
                {this.state.result}
            </div>
        );
    }
}

export default Newton_Raphson;