import React from 'react'
import { Input } from 'antd'
import './matrix.css'

class MatrixB extends React.Component{
    CreateMatrixB(){
        let arrB = []
        for(let i = 0 ; i < this.props.n ; i++){
            arrB.push(<Input className="set_width" name={'matrixB_' + i} placeholder={i.toString()} onChange={this.props.onChange} value={this.props.value[i]} />)
            arrB.push(<div></div>)
        }
        return arrB
    }
    
    render(){
        return(
            <div>
                {this.CreateMatrixB()}
            </div>
        );
    }
}

export default MatrixB