import React from 'react';
import { Row , Col } from 'antd';
import { Button } from 'antd';
import { Modal } from 'antd';

class ModalExampleMatrix extends React.Component{
    SetExample(n , matrix){
        let arr_row = []
        for(let i = 0 ; i < n ; i++){
            let arr_col = []
            for(let j = 0 ; j < n ; j++){
                arr_col.push(<span>{matrix[i][j].toString() + " "}</span>)
            }
            arr_col.push(<div></div>)
            arr_row.push(arr_col)
        }
        return arr_row
    }

    render() {
        return (
            <div>
                <Modal
                    title = 'ตัวอย่าง'
                    visible = {this.props.visible}
                    onOk = {this.props.onOk}
                    onCancel = {this.props.onOk}
                    footer = {[
                        <Button type = 'primary' onClick={this.props.onOk}>
                            Ok
                        </Button>
                    ]}
                >
                    {this.props.hasData ?
                        this.props.apiData.map((x,i) => (
                            <Row>
                                <Col span={12}>{this.SetExample(x["n"] , x["matrixA"])}</Col>
                                <Col span={12}>
                                    <Button type='primary' name={'insert_' + i} onClick={this.props.onClick}>Insert</Button>
                                </Col>
                                <hr/>
                            </Row>
                        ))
                        : <span style={{fontSize: "25px" , textAlign: "center"}}>กำลังโหลดข้อมูล</span>
                    }
                </Modal>
            </div>
        )
    }
}

export default ModalExampleMatrix