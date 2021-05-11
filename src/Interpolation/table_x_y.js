import React from 'react'
import {Row,Col,Input} from 'antd'
import './interpolation.css'

class TableXY extends React.Component{
    CreateTableXY(){
        let arr_row = []
        for(let i = 0 ; i < this.props.n ; i++){
            let arr_col = []
            for(let j = 0 ; j < 2 ; j++){
                arr_col.push(<Col><Input className="set_width_input" value={this.props.value[i][j]} name={i.toString() + '_' + j.toString()} onChange={this.props.onChange}/></Col>)
            }
            arr_row.push(<Row>{arr_col}</Row>)
        }
        return arr_row
    }

    render(){
        return(
            <div>
                {this.CreateTableXY()}
            </div>
        );
    }
}

export default TableXY