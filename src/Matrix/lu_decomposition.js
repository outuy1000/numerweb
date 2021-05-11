import React from 'react'
import { Row, Col } from 'antd'
import {Input , Button} from 'antd'
import MatrixA from './matrixA'
import MatrixB from './matrixB'
import { LU_Decomposition_cal , copyArray } from '../Compute'

import ModalExampleMatrix from './modal_example_matrix'

import apis from '../API/index'

class LU_Decomposition extends React.Component{
    state = {
        n: 2,
        matrix_A: [[],[]],
        matrix_B: [],
        result: '',
        isModalVisible: false,
        apiData: [],
        hasData: false
    }

    async getData(){
        let tempData = null
        await apis.getMatrix().then(res => {tempData = res.data})
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
                matrix_A: copyArray(this.state.apiData[index]["n"], this.state.apiData[index]["matrixA"]),
                matrix_B: [...this.state.apiData[index]["matrixB"]],
                /* matrix_B: this.state.apiData[index]["matrixB"], */
                isModalVisible: false
            })
    }

    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible: true})
    }

    ChangeMatrixA = e =>{
        let arrA = this.state.matrix_A
        let index = e.target.name.split('_')
        arrA[parseInt(index[1])][parseInt(index[2])] = e.target.value
        /* console.log(e.target.value) */
        this.setState({matrix_A: arrA})
    }

    ChangeMatrixB = e =>{
        let arrB = this.state.matrix_B
        let index = e.target.name.split('_')
        arrB[parseInt(index[1])] = e.target.value
        /* console.log(e.target.value) */
        this.setState({matrix_B: arrB})
    }

    MatrixAdd = e =>{
        if(this.state.n < 6){
            this.setState({n: this.state.n + 1})
            this.state.matrix_A.push([])
        }
    }

    MatrixReduce = e =>{
        if(this.state.n > 2){
            this.setState({n: this.state.n - 1})
            this.state.matrix_A.pop([])
        }
    }

    Cal = e =>{
        this.setState({result: LU_Decomposition_cal(this.state.n , this.state.matrix_A , this.state.matrix_B)})
    }


    render(){
        return(
            <div>
                <ModalExampleMatrix
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
                <Row>
                    <Col span={24} className="set_head">LU Decomposition</Col>
                </Row>
                <Row className="set_margin">
                    <Col>
                        <Button className="set_button" onClick={this.MatrixReduce}>-</Button>
                    </Col>
                    <Col>
                        <Input className="set_center" disabled="disabled" value={this.state.n.toString() + ' x ' + this.state.n.toString()}/>
                    </Col>
                    <Col>
                        <Button className="set_button" onClick={this.MatrixAdd}>+</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} className="set_margin_matrix">Matrix A</Col>
                    <Col span={4} className="set_margin_matrix">Matrix B</Col>
                </Row>
                <Row>
                    <Col span={18}>
                        <MatrixA n={this.state.n} onChange={this.ChangeMatrixA} value={this.state.matrix_A}/>
                    </Col>
                    <Col span={4}>
                        <MatrixB n={this.state.n} onChange={this.ChangeMatrixB} value={this.state.matrix_B}/>
                    </Col>
                </Row>
                <div className="set_center set_margin_div">
                    <Button className="set_cal_ex" onClick={this.onClickExample}>Example</Button>
                    <Button type="primary" className="set_cal_ex" onClick={this.Cal}>Calculate</Button>
                </div>
                {this.state.result}
            </div>
        );
    }
}

export default LU_Decomposition