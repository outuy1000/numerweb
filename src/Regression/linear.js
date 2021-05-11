import React from 'react'
import { Row, Col } from 'antd'
import {Input , Button} from 'antd'
import TableXY from '../Interpolation/table_x_y'
import '../Interpolation/interpolation.css'
import { linear_cal , copyArray } from '../Compute'

import apis from '../API/index'
import ModalExampleInterpolation from '../Interpolation/modal_example_interpolation'

class Linear extends React.Component{
    state = {
        n: 2,
        xy: [[],[]],
        x: '',
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
                x: this.state.apiData[index]["x"],
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

    ChangeX = e =>{
        this.setState({x: e.target.value})
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
        this.setState({result: linear_cal(this.state.xy , this.state.x , this.state.n)})
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
                    <Col span={24} className="set_head">Linear Regression</Col>
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
                        <div className="set_display_x">x</div>
                        <div className="set_display_x">f(x)</div>
                        <TableXY n={this.state.n} onChange={this.ChangeXY} value={this.state.xy}/>
                    </Col>
                    <Col className="set_margin_left">
                        <div className="set_margin_bottom">Input "X"</div>
                        <div><Input onChange={this.ChangeX} style={{width: "200px"}} value={this.state.x}/></div>
                    </Col>
                    <Col>                    
                        <div><Button type="primary" className="set_cal_ex_spline" onClick={this.Cal}>Calculate</Button></div>
                    </Col>
                </Row>
                <div className="set_margin_top">
                    {this.state.result}
                </div>
            </div>
        );
    }
}

export default Linear