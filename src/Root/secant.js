import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import './root.css';

import { secantcal } from '../Compute';

import apis from '../API/index'
import ModalExample from './modalexample'

class Secant extends React.Component{
    state = {
        Equation: '',
        X0: '',
        X1: '',
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
                X0: this.state.apiData[index]["xl"],
                X1: this.state.apiData[index]["xr"],
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
        this.setState({Equation: e.target.value });
    };

    getX0 = (e) => {
        this.setState({X0: e.target.value});
    };

    getX1 = (e) => {
        this.setState({X1: e.target.value});
    };

    getERR = (e) => {
        this.setState({ERROR: e.target.value});
    };

    onClickcal = (e) =>{
        let equation = this.state.Equation;
        let x0 = this.state.X0;
        let x1 = this.state.X1;
        let error = this.state.ERROR;
        let x = secantcal(equation,x0,x1,error);
        this.setState({result: x});
    }

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
                        Secant
                    </div>
                    Equation: <Input className="set_input" onChange={this.getEquation} value={this.state.Equation} />
                    X0: <Input className="set_input" onChange={this.getX0} value={this.state.X0} />
                    X1: <Input className="set_input" onChange={this.getX1} value={this.state.X1} />
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

export default Secant