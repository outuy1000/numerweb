import React from 'react'
import { Row, Col } from 'antd'
import {Input , Button} from 'antd'
import TableXY from './table_x_y'
import './interpolation.css'
import { newton_interpolation_cal , copyArray } from '../Compute'

import apis from '../API/index'
import ModalExampleInterpolation from './modal_example_interpolation'

class Newton_Interpolation extends React.Component{
    state = {
        n: 2,
        xy: [[],[]],
        point: [],
        x: '',
        result: '',
        isModalVisible: false,
        apiData: [],
        hasData: false
    }

    async getData(){
        let tempData = null
        await apis.getInterpolation().then(res => {tempData = res.data})
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
                point: [...this.state.apiData[index]["point"]],
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
        /* console.log(this.state.xy.toString()); */
    }

    ChangeX = e =>{
        this.setState({x: e.target.value})
    }

    ChangePoint = e =>{
        let index = []
            index = e.target.value
        
        this.setState({point: index.split(',')})
        /* console.log(this.state.point.toString()); */
    }

    RowAdd = e =>{
        if(this.state.n < 6){
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
        this.setState({result: newton_interpolation_cal(this.state.xy , this.state.point , this.state.x )})
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
                    <Col span={24} className="set_head">Newton's divided-differences</Col>
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
                        <TableXY n={this.state.n} onChange={this.ChangeXY} value={this.state.xy} />
                    </Col>
                    <Col className="set_margin_left">
                        <div className="set_margin_bottom">Input "X"</div>
                        <div><Input onChange={this.ChangeX} style={{width: "200px"}} value={this.state.x} /></div>
                    </Col>
                    <Col className="set_margin_left">
                        <div className="set_margin_bottom">Input "num"</div> 
                        <div><Input onChange={this.ChangePoint} style={{width: "200px"}} value={this.state.point} /></div>
                    </Col>
                    <Col>
                        <div><Button type="primary" className="set_cal_ex" onClick={this.Cal}>Calculate</Button></div>
                    </Col>
                </Row>
                <div className="set_margin_top">
                    {this.state.result}
                </div>
            </div>
        );
    }
}

export default Newton_Interpolation