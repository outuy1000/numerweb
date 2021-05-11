import React from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import { falsepositioncal } from '../Compute'
import './root.css';

import apis from '../API/index'
import ModalExample from './modalexample'

class FalsePosition extends React.Component{
    state = {
        Equation: '',
        XL: '',
        XR: '',
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
                XL: this.state.apiData[index]["xl"],
                XR: this.state.apiData[index]["xr"],
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

    getXL = (e) => {
        this.setState({XL: e.target.value});
    };

    getXR = (e) => {
        this.setState({XR: e.target.value});
    };

    getERR = (e) => {
        this.setState({ERROR: e.target.value});
    };

    onClickcal = (e) =>{
        let equation = this.state.Equation;
        let xl = this.state.XL;
        let xr = this.state.XR;
        let error = this.state.ERROR;
        let x = falsepositioncal(equation,xl,xr,error);
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
                        False-Position
                    </div>
                    Equation: <Input className="set_input" onChange={this.getEquation} value={this.state.Equation} />
                    XL: <Input className="set_input" onChange={this.getXL} value={this.state.XL} />
                    XR: <Input className="set_input" onChange={this.getXR} value={this.state.XR} />
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

export default FalsePosition;