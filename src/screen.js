import { Layout, Menu } from 'antd';
import React from 'react';
import './App.css';

//Root of Equation
import Bisection from './Root/bisection';
import FalsePosition from './Root/falseposition';
import OnePoint from './Root/onepoint';
import Newton_Raphson from './Root/newton_raphson';
import Secant from './Root/secant';

//Matrix
import Cramer from './Matrix/cramer';
import Gauss_Elimination from './Matrix/gauss_elimination';
import Gauss_Jordan from './Matrix/gauss_jordan'
import LU_Decomposition from './Matrix/lu_decomposition'
import Jacobi from './Matrix/jacobi'
import Gauss_Seidel from './Matrix/gauss_seidel'
import Conjugate from './Matrix/conjugate'

//Interpolation
import Newton_Interpolation from './Interpolation/newton_interpolation'
import Lagrange from './Interpolation/lagrange'
import Spline from './Interpolation/spline'

//Regression
import Linear from './Regression/linear'
import Polynomial from './Regression/polynomial'
import Multiple from './Regression/multiple'

import Swagger from './API/swagger'

import { Route } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content , Sider } = Layout;

class Screen extends React.Component {
    render() {
        return (
            <HashRouter>
            <Layout>
                <Header className="header">
                <div className='set_head'>
                        NUMERICAL METHOD
                    </div>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" title="Root of equation">
                                    <Menu.Item key="1"><Link to='/Bisection'>Bisection</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to='/FalsePosition'>False-Position</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to='/OnePoint'>One-Point Iteration</Link></Menu.Item>
                                    <Menu.Item key="4"><Link to='/Newton_Raphson'>Newton-Raphson</Link></Menu.Item>
                                    <Menu.Item key="5"><Link to='/Secant'>Secant</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title="Matrix">
                                    <Menu.Item key="6"><Link to='/Cramer'>Cramer's Rule</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to='/Gauss_Elimination'>Gauss Elimination</Link></Menu.Item>
                                    <Menu.Item key="8"><Link to='/Gauss_Jordan'>Gauss-Jordan</Link></Menu.Item>
                                    <Menu.Item key="9"><Link to='/LU_Decomposition'>LU Decomposition</Link></Menu.Item>
                                    <Menu.Item key="10"><Link to='/Jacobi'>Jacobi Iteration</Link></Menu.Item>
                                    <Menu.Item key="11"><Link to='/Gauss_Seidel'>Gauss-Seidel Iteration</Link></Menu.Item>
                                    <Menu.Item key="12"><Link to='/Conjugate'>Conjugate Gradient</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title="Interpolation">
                                    <Menu.Item key="13"><Link to='/Newton_Interpolation'>Newtons's divided-differences</Link></Menu.Item>
                                    <Menu.Item key="14"><Link to='/Lagrange'>Lagrange polynomials</Link></Menu.Item>
                                    <Menu.Item key="15"><Link to='/Spline'>Spline interpolation</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" title="Regression">
                                    <Menu.Item key="16"><Link to='/Linear'>Linear Regression</Link></Menu.Item>
                                    <Menu.Item key="17"><Link to='/Polynomial'>Polynomial Regression</Link></Menu.Item>
                                    <Menu.Item key="18"><Link to='/Multiple'>Multiple Linear Regression</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub5" title="Swagger">
                                    <Menu.Item key="19"><Link to='/Swagger'>Swagger</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 720 }}>
                            <Redirect exact from="/" to="/Bisection"/>
                            <Route path='/Bisection' component={Bisection}></Route>
                            <Route path='/FalsePosition' component={FalsePosition}></Route>
                            <Route path='/OnePoint' component={OnePoint}></Route>
                            <Route path='/Newton_Raphson' component={Newton_Raphson}></Route>
                            <Route path='/Secant' component={Secant}></Route>
                            <Route path='/Cramer' component={Cramer}></Route>
                            <Route path='/Gauss_Elimination' component={Gauss_Elimination}></Route>
                            <Route path='/Gauss_Jordan' component={Gauss_Jordan}></Route>
                            <Route path='/LU_Decomposition' component={LU_Decomposition}></Route>
                            <Route path='/Jacobi' component={Jacobi}></Route>
                            <Route path='/Gauss_Seidel' component={Gauss_Seidel}></Route>
                            <Route path='/Conjugate' component={Conjugate}></Route>
                            <Route path='/Newton_Interpolation' component={Newton_Interpolation}></Route>
                            <Route path='/Lagrange' component={Lagrange}></Route>
                            <Route path='/Spline' component={Spline}></Route>
                            <Route path='/Linear' component={Linear}></Route>
                            <Route path='/Polynomial' component={Polynomial}></Route>
                            <Route path='/Multiple' component={Multiple}></Route>
                            <Route path='/Swagger' component={Swagger}></Route>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            </HashRouter>
        );
    }
}

export default Screen;