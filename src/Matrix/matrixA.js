import React from 'react'
import { Input } from 'antd'
import './matrix.css'

class MatrixA extends React.Component{
    CreateMatrixA(){
        let arrA = []
        for(let i = 0 ; i < this.props.n ; i++){
            for(let j = 0 ; j < this.props.n ; j++){
                arrA.push(<Input className="set_width" name={'matrixA_' + i.toString() + '_' + j} placeholder={i.toString() + j} onChange={this.props.onChange} value={this.props.value[i][j]} />)
            }
            arrA.push(<div></div>)
        }
        return arrA
    }

    render(){
        return(
            <div>
                {this.CreateMatrixA()}
            </div>
        );
    }
}

export default MatrixA