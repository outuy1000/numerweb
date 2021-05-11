import React from 'react'
import { Row, Col } from 'antd'
import {Input , Button} from 'antd'
import TableMultiX from './table_multiple_x'
import '../Interpolation/interpolation.css'
import { multiple_cal , copyArray } from '../Compute'

import apis from '../API/index'
import ModalExampleInterpolation from '../Interpolation/modal_example_interpolation'

class Multiple extends React.Component{
    state = {
        n: 2,
        xy: [[],[]],
        x1: '',
        x2: '',
        x3: '',
        result: '',
        isModalVisible: false,
        apiData: [],
        hasData: false
    }

    async getData(){
        let tempData = null
        await apis.getRegression().then(res => {tempData = res.data})
        this.setState({apiData: tempData})
        this.setState({hasData: true})
    }

    onClickOk = e => {
        this.setState({ isModalVisible: false })
    }

    onClickInsert = e =>{
        let index = e.currentTarget.getAttribute('name').split('_')
            index = parseInt(index[1])
            this.setState({
                n: this.state.apiData[index]["n"],
                xy: copyArray(this.state.apiData[index]["n"], this.state.apiData[index]["matrixA"]),
                x1: this.state.apiData[index]["x1"],
                x2: this.state.apiData[index]["x2"],
                x3: this.state.apiData[index]["x3"],
                isModalVisible: false
            })
    }

    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible: true})
    }

    ChangeXY = e =>{
        let arrXY = this.state.xy
        let index = e.target.name.split("_")
        arrXY[parseInt(index[0])][parseInt(index[1])] = e.target.value
        this.setState({xy: arrXY})
    }

    ChangeX1 = e =>{
        this.setState({x1: e.target.value})
    }

    ChangeX2 = e =>{
        this.setState({x2: e.target.value})
    }

    ChangeX3 = e =>{
        this.setState({x3: e.target.value})
    }

    RowAdd = e =>{
        if(this.state.n < 10){
            this.setState({n: this.state.n + 1})
            this.state.xy.push([])
        }
    }

    RowReduce = e =>{
        if(this.state.n > 2){
            this.setState({n: this.state.n - 1})
            this.state.xy.pop([])
        }
    }

    Cal = e =>{
        this.setState({result: multiple_cal(this.state.n , this.state.xy , this.state.x1 , this.state.x2 , this.state.x3)})
    }


    render(){
        return(
            <div>
                <ModalExampleInterpolation
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
                <Row>
                    <Col span={24} className="set_head">Multiple Linear Regression</Col>
                </Row>
                <Row className="set_margin">
                    <Col>
                        <Button className="set_button" onClick={this.RowReduce}>ลดขนาด</Button>
                    </Col>
                    <Col>
                        <Button className="set_button" onClick={this.RowAdd}>เพิ่มขนาด</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="set_margin_bottom set_center">TableXY</div>
                        <div className="set_display_x">x1</div>
                        <div className="set_display_x">x2</div>
                        <div className="set_display_x">x3</div>
                        <div className="set_display_x">y</div>
                        <TableMultiX n={this.state.n} onChange={this.ChangeXY} value={this.state.xy}/>
                    </Col>
                    <Col className="set_margin_left_regression">
                        <div className="set_margin_bottom">Input "X1"</div>
                        <div><Input onChange={this.ChangeX1} style={{width: "200px"}} value={this.state.x1}/></div>
                    </Col>
                    <Col className="set_margin_left_regression">
                        <div className="set_margin_bottom">Input "X2"</div>
                        <div><Input onChange={this.ChangeX2} style={{width: "200px"}} value={this.state.x2}/></div>
                    </Col>
                    <Col className="set_margin_left_regression">
                        <div className="set_margin_bottom">Input "X3"</div>
                        <div><Input onChange={this.ChangeX3} style={{width: "200px"}} value={this.state.x3}/></div>
                    </Col>
                </Row>
                <div className="set_center">
                    <Button type="primary" className="set_cal_ex_multi set_margin_left_regression" onClick={this.Cal}>Calculate</Button>
                </div>
                <div className="set_margin_top">
                    {this.state.result}
                </div>
            </div>
        );
    }
}

export default Multiple