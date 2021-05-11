import React from 'react';
import './App.css'

const math = require("mathjs");
var regression = require('regression')
var interpolationQuadratic_Poly_linear = require('interpolating-polynomial')
const Spline = require('cubic-spline');

function checkX(equation){
    equation = equation.replaceAll('X' , 'x')
    return equation
}

export function copyArray(n,matrix1){
    let arr = []
     for(let i = 0;i < n ; i++){
         arr.push([])
         arr[i] = [].concat(matrix1[i])
     }
     return arr;
 
 }

export function bisectioncal( init_fx,init_xl, init_xr, init_error) {

    let fx = checkX(init_fx)
        fx = math.parse(fx).compile()
    let xl = math.bignumber(init_xl)
    let xr = math.bignumber(init_xr)
    let error = math.bignumber(init_error)
    let xm = math.divide(math.add(xl, xr), 2)
    let checkValue = math.multiply(fx.evaluate({ x: xm }), fx.evaluate({ x: xr }))
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newXm = 0
    let data = []
    let iteration = 1

    if (checkValue > 0) {
        xr = xm
    }
    else if (checkValue < 0) {
        xl = xm
    }

    data.push(
        <div className="set_center_by_app"> 
            <div className="set_head_result">{"Iteration"}</div>
            <div className="set_head_result">{"Xm"}</div>
            <div className="set_head_result">{"Error"}</div>
        </div>
        )
    while (math.larger(checkError, error)) {
        newXm = math.divide(math.add(xl, xr), 2)
        checkValue = math.multiply(fx.evaluate({ x: newXm }), fx.evaluate({ x: xr }))
        if (checkValue > 0) {
            xr = newXm
        }
        else if (checkValue < 0) {
            xl = newXm
        }
        checkError = math.abs(math.divide(math.subtract(newXm, xm), newXm))
        xm = newXm
        data.push(
            <div className="set_center_by_app">
                <div className="set_result_by_app">{iteration}</div>
                <div className="set_result_by_app">{xm.toFixed(15).toString()}</div>
                <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
            </div>
            )
        iteration = iteration + 1
    }
    return data
}

export function falsepositioncal(init_fx,init_xl, init_xr, init_error){
    
    let equation = checkX(init_fx)
        equation = math.parse(equation).compile()

    let xl = math.bignumber(init_xl)
    let xr = math.bignumber(init_xr)
    let error = math.bignumber(init_error)
    
    let arr = []

    let i = 1;
    
    
    let oldX1 = 0;

    let checkError = 9999

    arr.push(
        <div className="set_center_by_app"> 
            <div className="set_head_result">{"Iteration"}</div>
            <div className="set_head_result">{"X1"}</div>
            <div className="set_head_result">{"Error"}</div>
        </div>
        )

    while(checkError > error){

       let fXL  = equation.evaluate({x : xl})

       let fXR  = equation.evaluate({x : xr})
       
       let x1 = math.divide(math.subtract(math.multiply(xl , fXR) , math.multiply(xr , fXL)) , math.subtract(fXR , fXL))

       
       let fx1 = equation.evaluate({x : x1})

       let check = math.multiply(fx1,fXR)
      
       if( check >= 0){
           xr = x1
       }
       else{
           xl =x1
       }

       checkError =  math.abs((x1 - oldX1)/x1);

       oldX1 = x1

       arr.push(
        <div className="set_center_by_app">
            <div className="set_result_by_app">{i}</div>
            <div className="set_result_by_app">{x1.toFixed(15).toString()}</div>
            <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
        </div>
        )
       i++
       
    }
    return arr
}

export function onepointcal(init_fx , init_x , init_error) {

    let equation = checkX(init_fx)
        equation = math.parse(equation).compile()
     
     let X = math.bignumber(init_x)
     
     let error = math.bignumber(init_error)
     
     let arr = []

     let i = 1;
     
     
     let oldX = 0;

     let checkError = 9999
     let oldcheckError = 9999;

     arr.push(
        <div className="set_center_by_app"> 
            <div className="set_head_result">{"Iteration"}</div>
            <div className="set_head_result">{"X"}</div>
            <div className="set_head_result">{"Error"}</div>
        </div>
        )

     while(checkError > error){

        
         X  = equation.evaluate({x : X})

         checkError =  math.abs((X - oldX)/X);
         console.log(checkError);
         console.log(oldcheckError);
         if(checkError > oldcheckError){
            arr.push(
                <div className="set_center_by_app">
                    <div className="set_result_by_app">{i}</div>
                    <div className="set_result_by_app">{"ลู่ออก"}</div>
                    <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
                </div>
                )
            break;
        }
          oldcheckError = checkError;
        
         oldX = X
        
        arr.push(
            <div className="set_center_by_app">
                <div className="set_result_by_app">{i}</div>
                <div className="set_result_by_app">{X.toFixed(15).toString()}</div>
                <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
            </div>
            )
        i++
        
     }
     return arr
}

export function newton_raphsoncal(init_fx , init_x , init_error) {

    let equation = checkX(init_fx)
        equation = math.parse(equation)
    
    let X = math.bignumber(init_x)

    let fXprime = math.derivative(equation,'x').compile()
    
    let error = math.bignumber(init_error)

    

    let arr = []

    let i = 1;


    let oldX = X;

    let checkError = 9999
    let oldcheckError = 9999;

    arr.push(
        <div className="set_center_by_app"> 
            <div className="set_head_result">{"Iteration"}</div>
            <div className="set_head_result">{"X"}</div>
            <div className="set_head_result">{"Error"}</div>
        </div>
        )
    
    while (checkError > error) {

        let fXdiff = fXprime.evaluate({x : X})
        let fX = equation.evaluate({ x: X })
        X = math.subtract(X, math.divide(fX, fXdiff))



        checkError = math.abs((X - oldX) / X);
        if (checkError > oldcheckError) {
            arr.push(
                <div className="set_center_by_app">
                    <div className="set_result_by_app">{i}</div>
                    <div className="set_result_by_app">{"ลู่ออก"}</div>
                    <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
                </div>
                )
            break;
        }
        oldcheckError = checkError;

        oldX = X

        arr.push(
            <div className="set_center_by_app">
                <div className="set_result_by_app">{i}</div>
                <div className="set_result_by_app">{X.toFixed(15).toString()}</div>
                <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
            </div>
            )
        i++

    }
    return arr
}

export function secantcal(init_fx , init_x0 , init_x1 , init_error) {

    let equation = checkX(init_fx)
        equation = math.parse(equation).compile()
    let x0 = math.bignumber(init_x0)
    let x1 = math.bignumber(init_x1)


    let fx0 = equation.evaluate({x:x0})
    let fx1 = equation.evaluate({x:x1})

    let error = math.bignumber(init_error)

    

    let arr = []

    let i = 1;


    let oldX = 0;

    let checkError = 9999
    let oldcheckError = 9999;

    arr.push(
        <div className="set_center_by_app"> 
            <div className="set_head_result">{"Iteration"}</div>
            <div className="set_head_result">{"X"}</div>
            <div className="set_head_result">{"Error"}</div>
        </div>
        )
       
    while (checkError > error) {

    let    x = math.subtract(x1 , math.divide(math.multiply(fx1,math.subtract(x0 , x1) ), math.subtract(fx0 , fx1)));
            
            checkError = Math.abs((x - x1)/x);
            
            fx0 = fx1;
            x0 = x1;
            x1 = x;
            fx1 = equation.evaluate({x : x1})


       
        if (checkError > oldcheckError) {
            arr.push(
                <div className="set_center_by_app">
                    <div className="set_result_by_app">{i}</div>
                    <div className="set_result_by_app">{"ลู่ออก"}</div>
                    <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
                </div>
                )
            break;
        }
        oldcheckError = checkError;

        oldX = x

        arr.push(
            <div className="set_center_by_app">
                <div className="set_result_by_app">{i}</div>
                <div className="set_result_by_app">{x.toFixed(15).toString()}</div>
                <div className="set_result_by_app">{checkError.toFixed(15).toString()}</div>
            </div>
            )
        i++

    }
    return arr
}

export function cramercal(n, initialMatrix1, initialMatrix2) {

    let matrix1=math.bignumber(initialMatrix1)
    let matrix2=math.bignumber(initialMatrix2)
    let det_matrixA = math.det(matrix1)
    
    let temp_matrix1 = copyArray(n,matrix1)

    let arr = []

    let X = [];
    
    


        for (let i = 0; i < n; i++) { 

            for (let j = 0; j < n; j++) { 
                temp_matrix1[j][i] = matrix2[j]  
            }
            X[i] = math.divide(math.det(temp_matrix1) , det_matrixA).toFixed(15).toString()
            
            /* arr.push({key : i , x : 'X'+(i+1) ,valuex : X[i]}) */
            arr.push(<div>{'X' + (i+1) + ' = '} {X[i]}</div>)
            
            temp_matrix1 = copyArray(n,matrix1);
        }
        
    return arr
}

export function Gauss_Elimination_cal(n, initialMatrix1, initialMatrix2) {

    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    
    
    let arr = []
    let X = []
    
    for(let i = 0 ; i < n ; i++){
        matrix1[i].push(matrix2[i]) 
        X.push(1)
    }
    console.log(matrix1)
   
    for(let i = 1;i < n ; i++){
        for(let j = i ;j < n ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < n+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
                
            }
    
        }
         
    }

    for(let i = n-1 ;i >= 0 ; i--){
        let sum = 0;
        for(let j = 0 ; j < n ;j++){
            sum = sum + matrix1[i][j]*X[j];
        }
        sum = sum - matrix1[i][i]
        X[i] = ((matrix1[i][n] - sum)/matrix1[i][i])
        
    }
    /* X.map((x,i) => arr.push({key : i , x : 'X'+(i+1) , valuex : x.toFixed(5)})) */
    X.map((x,i) => arr.push(<div>{'X' + (i+1) + ' = '} {x.toFixed(5)}</div>))

        
    return arr
}

export function Gauss_Jordan_cal(n, initialMatrix1, initialMatrix2) {

    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    
    
    let arr = []
    let X = []
    
    for(let i = 0 ; i < n ; i++){
        matrix1[i].push(matrix2[i]) 
        X.push(1)
    }
    console.log(matrix1)
   
    for(let i = 1;i < n ; i++){
        for(let j = i ;j < n ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < n+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
              
            }
    
        }
         
    }
    for(let i = n-2;i >= 0 ; i--){
        for(let j = i ;j >= 0 ; j--){

            let divide = matrix1[i+1][i+1]
            let multi = matrix1[j][i+1]

            for(let k = n ; k >= i;k--){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i+1][k]/divide)*multi)
              
            }
    
        }
         
    }

    for(let i = 0 ;i < n ; i++){
        X[i] = ((matrix1[i][n] )/matrix1[i][i])
    }
       
      
        
    
    /* X.map((x,i) => arr.push({key : i , x : 'X'+(i+1) , valuex : x.toFixed(5)})) */
    X.map((x,i) => arr.push(<div>{'X' + (i+1) + ' = '} {x.toFixed(5)}</div>))
        
    return arr
}

export function LU_Decomposition_cal(n, initialMatrix1, initialMatrix2) {

    let A = initialMatrix1
    let B = initialMatrix2

   
   
    let arr = []
    let U = []
    let L = []
    let Y = []
    let X = []
    
    for (let i = 0; i < n; i++) {
            U.push([])
            L.push([])
            Y.push(1)
            X.push(1)
        for (let j = 0; j < n; j++) {
            L[i][j]=0
            if(i == j){
                U[i][j]= 1
            }
            else{
                
                U[i][j]=0
            }
               
               
           
           
            

        }
    }
    //  console.log(L.toString())
    //  console.log(U.toString())
    //  console.log(Y.toString())
    //  console.log(X.toString())
    
    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {

            let sum = 0

            for (let k = 0; k < n; k++) {


                if (k != j || i < j) {
                    sum += L[i][k] * U[k][j]
                }


            }
            if (i >= j) {
                sum = A[i][j] - sum;
                L[i][j] = sum;
            }
            else {
                sum = A[i][j] - sum;
                U[i][j] = sum / L[i][i];
            }
        }
    }
   
    
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {

            sum += L[i][j] * Y[j];
        }
        sum = sum - L[i][i] * Y[i];

        Y[i] = ((B[i] - sum) / L[i][i])
        
    }
    for (let i = n-1; i >= 0; i--) {
        let sum = 0;
        for (let j = 0; j < n; j++) {

            sum += U[i][j] * X[j];
        }
        sum = sum - U[i][i] * X[i];

        X[i] = ((Y[i] - sum) / U[i][i])

    }
    
  
    /* X.map((x, i) => arr.push({ key: i, x: 'X' + (i + 1), valuex: x.toFixed(5) })) */
    X.map((x,i) => arr.push(<div>{'X' + (i+1) + ' = '} {x.toFixed(5)}</div>))








    return arr
}

export function jacobi_cal(n, initialMatrix1, initialMatrix2,initialError) {

    let check = true;
    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    let error = initialError

  
    
    let arr = []
    
    let resultX = []
    let ansX = []
    
    let arr_Error = []
    for(let i = 0 ; i < n ;i++){
        resultX.push(0)
        
    }
    
    while(check){

       
        
        
        for(let i = 0;i <  n ;i++){
            let sum = matrix2[i]
            for(let j = 0;j < n;j++){
                if(i != j){
                    
                   
                    sum = (sum- (matrix1[i][j]*resultX[j]))
                    
                    
                    
                }
                
            }
            
            
            ansX[i] = sum/matrix1[i][i];
            
            
          
            arr_Error[i] = math.abs((ansX[i]-resultX[i])/ansX[i])
            
            console.log(arr_Error[i])
            
           
        }
        resultX = [...ansX]
        check = false
        for(let i = 0 ; i < n ; i++){
            if(arr_Error[i] > error){
               check = true
               break;
            }
          
            
        }
       
    
    }
    for(let i = 0 ; i < n ; i++){
        /* arr.push({key : i , x : 'X'+(i+1) , valuex : resultX[i].toFixed(5)}) */
        arr.push(<div>{'X' + (i+1) + ' = '} {resultX[i].toFixed(5)}</div>)
    }
     

        
    return arr
}

export function gauss_seidel_cal(n, initialMatrix1, initialMatrix2,initialError) {

    let check = true;
    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    let error = initialError

  
    
    let arr = []
    
    let resultX = []
    let ansX = []
    
    let arr_Error = []
    for(let i = 0 ; i < n ;i++){
        resultX.push(0)
        
    }
    
    while(check){

       
        
        
        for(let i = 0;i <  n ;i++){
            let sum = matrix2[i]
            for(let j = 0;j < n;j++){
                if(i != j){
                    
                   
                    sum = (sum- (matrix1[i][j]*resultX[j]))
                    
                    
                    
                }
                
            }
            
            
            ansX[i] = sum/matrix1[i][i];
            
            
          
            arr_Error[i] = math.abs((ansX[i]-resultX[i])/ansX[i])
            resultX[i] = ansX[i]
            console.log(arr_Error[i])
            
           
        }
        resultX = [...ansX]
        check = false
        for(let i = 0 ; i < n ; i++){
            if(arr_Error[i] > error){
               check = true
               break;
            }
          
            
        }
       
    
    }
    for(let i = 0 ; i < n ; i++){
        /* arr.push({key : i , x : 'X'+(i+1) , valuex : resultX[i].toFixed(5)}) */
        arr.push(<div>{'X' + (i+1) + ' = '} {resultX[i].toFixed(5)}</div>)
    }
     

        
    return arr
}

export function conjugate_cal(n, initialMatrix1, initialMatrix2,initialError) {

    
    let A = initialMatrix1

    let B = initialMatrix2
    
    let error = initialError

  
    
    let arr = []
    
    let X = []
    
    let K = 0;
    
    let checkError = 9999

    for(let i = 0 ; i < n ;i++){
       X.push(0)
        
    }
    
    let R = math.multiply(A,X);
    R = math.subtract(R,B);
    let D = math.multiply(R,-1);
    
    let lambda = null;

    let alpha = null; 

    while(checkError > error){

        lambda = math.transpose(D);
        let temp = lambda;
        lambda = math.multiply(lambda, R);
        temp = math.multiply(temp, A);
        temp = math.multiply(temp, D);

        lambda = lambda / temp;

        lambda = math.multiply(lambda, -1);

        temp = math.multiply(lambda, D);
        X = math.add(X, temp);

        temp = math.multiply(A, X);
        R = math.subtract(temp, B);

        temp = math.transpose(R);
        temp = math.multiply(temp, R);

        checkError = math.sqrt(temp);

        alpha = math.transpose(R);
        alpha = math.multiply(alpha, A);
        alpha = math.multiply(alpha, D);

        temp = math.transpose(D);
        temp = math.multiply(temp, A);
        temp = math.multiply(temp, D);

        alpha = alpha / temp;

        temp = math.multiply(alpha, D);
        D = math.multiply(R, -1);
        D = math.add(D, temp);

       K++;
         
        
        
        
      
    for(let i = 0 ; i < n ; i++){
        /* arr.push({key : i , x : 'X'+(i+1) , valuex : X[i].toFixed(5)}) */
        arr.push(<div>{'X' + (i+1) + ' = '} {X[i].toFixed(5)}</div>)
    }
     

        
    return arr
}
}

export function newton_interpolation_cal( initialMatrix1, initialPoint,initialX) {
    let A = initialMatrix1

    let P = initialPoint
   
    let X = initialX

    

    let arr = []
    let ans = []

   
   for(let i = 0 ; i < P.length ; i++){
           arr.push(A[parseInt(P[i])-1])
   }
  
   console.log(arr.toString())
   let findX = interpolationQuadratic_Poly_linear(arr)

   

    /* ans.push({key :  1 ,fx : 'f('+X+')' , valuex : findX(X) }) */
    ans.push(<div>{'f( '+X+' ) = '} {findX(X)}</div>)

   return ans
}

export function lagrange_cal(initialMatrix1,initialPoint,initialX){
    

    let A = initialMatrix1

    let P = initialPoint
   
    let X = initialX

    

    let arr = []
    let ans = []

   
   for(let i = 0 ; i < P.length ; i++){
           arr.push(A[parseInt(P[i])-1])
   }
   console.log(arr)

   //-----------------------------------------------------------//
   let xs = []
   let ys = []

	for(let i = 0 ; i < arr.length ; i++){

		for(let j = 0 ; j < arr.length ; j++){
				if(j == 0){
					xs.push(arr[i][j])
				}
				else if(j == 1){
					ys.push(arr[i][j])
				}
		}
			
	}
    console.log(xs.length)
    console.log(ys.length)
    //--------------------------------------------------------//
    let ws = [];
	let k = xs.length;
	let w;
	
	for (let j = 0; j < k; ++j) {
		w = 1;
		for (var i = 0; i < k; ++i) {
			if (i != j) {
				w *= xs[j] - xs[i];
			}
		}
		ws[j] = 1/w;
	}
 //-----------------------------------------------------------//
    let a = 0;
	let b = 0;
	let c = 0;

	for (let j = 0; j < xs.length; ++j) {
		
		if (X != xs[j]) {
			
			a = ws[j] / (X - xs[j]);
			b += a * ys[j];
			c += a;
		} else {
            /* ans.push({key :  1 ,fx : 'f('+X+')' , valuex : ys[j] }) */
            ans.push(<div>{'f( '+X+' ) = '} {ys[j]}</div>)
			return ans;
            
			
		}
	}
	


    /* ans.push({key :  1 ,fx : 'f('+X+')' , valuex : (b/c).toFixed(5) }) */
	ans.push(<div>{'f( '+X+' ) = '} {(b/c).toFixed(5)}</div>)

    return ans

}

export function spline_cal(initialMatrix1,initialX){
    

    let arr = initialMatrix1

   
   
    let X = initialX

    

    
    let ans = []

  

   //-----------------------------------------------------------//
   let xs = []
   let ys = []



	for(let i = 0 ; i < arr.length ; i++){

		for(let j = 0 ; j < arr.length ; j++){
				if(j == 0){
					xs.push(arr[i][j])
				}
				else if(j == 1){
					ys.push(arr[i][j])
				}
		}
			
	}

    const spline = new Spline(xs,ys)
    

    /* ans.push({key :  1 ,fx : 'f('+X+')' , valuex : spline.at(X) }) */
    ans.push(<div>{'f( '+X+' ) = '} {spline.at(X)}</div>)
	

    return ans

}

export function linear_cal(initialMatrix1,initialX,n){

    let arr = initialMatrix1

    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < 2 ; j ++){
            arr[i][j] = parseInt(arr[i][j])
        }
    }

  
/*     let arr =  [
        [10, 5],
        [15, 9],
        [20, 15],
        [30, 18], 
        [40, 22],
        [50, 30], 
        [60, 35],
        [70, 38], 
        [80, 43]
    ]
 */ 
   
    const result = regression.linear(arr);
    let X = initialX
    const gradient = parseFloat(result.equation[0]);
    const yIntercept = parseFloat(result.equation[1]);
    console.log(arr)
    console.log(X)
    console.log(gradient)
    console.log(yIntercept)

    console.log((yIntercept + (gradient*X)).toFixed(5));
    let ans = []
    /* ans.push({key :  1 ,fx : 'f('+X+')' , valuex : (yIntercept + (gradient*X)).toFixed(5) }) */
	ans.push(<div>{'f( '+X+' ) = '} {(yIntercept + (gradient*X)).toFixed(5)}</div>)

    return ans

}

export function poly_cal(initialMatrix1,initialX,n){
    
    let arr = initialMatrix1
  
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < 2 ; j ++){
            arr[i][j] = parseInt(arr[i][j])
        }
    }
   
    const result = regression.polynomial(arr);
    let X = initialX
    const a0 = parseFloat(result.equation[0]);
    const a1 = parseFloat(result.equation[1]);
    const a2 = parseFloat(result.equation[2]);
    console.log(a0)
    console.log(a1)
    console.log(a2)

    let ans = [] 
    let fx = a0+(a1*X)+(a2*(X*X))
    console.log(fx);
    /* ans.push({key :  1 ,fx : 'f('+X+')' , valuex : fx.toFixed(5) }) */
    ans.push(<div>{'f( '+X+' ) = '} {fx.toFixed(5)}</div>)
	

    return ans

}

export function multiple_cal(initialN,initialMatrix1,initialX1,initialX2,initialX3){
    
    let n = initialN;
    let X1 = initialX1
    let X2 = initialX2
    let X3 = initialX3
    // let A = [[1,0,1,4],[0,1,3,-5],[2,4,1,-6],[3,2,2,0],[4,1,5,-1],[2,3,3,-7],[1,6,4,-20]]
    let A = initialMatrix1

    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < 4 ; j ++){
            A[i][j] = parseInt(A[i][j])
        }
    }

      let x1 = []
      let x2 = []
      let x3 = []
      let y = []
      let sumx1 = 0
      let sumx2 = 0
      let sumx3 = 0
      let sumy  = 0
      for(let i = 0; i < n ; i++){
          for(let j = 0 ; j < 4 ; j++){
              if(j == 0){
                x1.push(A[i][j])
                
                 sumx1 +=  A[i][j]
                
              }
              else if(j == 1){
                x2.push(A[i][j])
               
                sumx2 +=  A[i][j]
                
              }
              else if(j == 2){
                x3.push(A[i][j])
                 sumx3 +=  A[i][j]
                
              }
              else if(j == 3){
                y.push(A[i][j])
                 sumy += A[i][j]
               
              }
          }
      }
    
       console.log(x1.toString())
       console.log(x2.toString())
       console.log(x3.toString())
       console.log(y.toString())
       console.log(sumx1)
       console.log(sumx2)
       console.log(sumx3)
       console.log(sumy)
      function cal(matrix1,matrix2){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += (matrix1[i]*matrix2[i])
        }
        return summ;
      }
    
      let Xx = []
      
      Xx.push(x1)
      Xx.push(x2)
      Xx.push(x3)
      Xx.push(y)
      let arrSum = []
      arrSum.push(sumx1)
      arrSum.push(sumx2)
      arrSum.push(sumx3)
      arrSum.push(sumy)
      // console.log(arrSum)
    
      // console.log(cal(Xx[0],Xx[2]))
      // console.log(Xx)
    //   console.log(cal(x1,x1))
    //  console.log(cal(x1,x2))
    //  console.log(cal(x1,x3))
    //  console.log(cal(x2,x3))
    //  console.log(cal(x1,y))  
    //  console.log(cal(x2,y))
    //  console.log(cal(x3,y))
      
    let B = []
    
    for (let i = 0; i < 4; i++) {
      B.push([])
      for (let j = 0; j < 4+1; j++) {
        
        if (i == 0 && j == 0) {
          B[i][j] = 7
        }
        else if(i == 0){
          
           
          
            B[i][j] = arrSum[j-1]
          
         
        }
        else if(j == 0){
          B[i][j] = arrSum[i-1]
        }
        else{
          
          
            B[i][j] = cal(Xx[i-1], Xx[j-1])
          
         
          
        }
        
    
    
        }
    
      }
      console.log(B)
      

      
    let matrix1=B
    
    
    
    
    let arr = []
    let X = []
    
    for(let i = 0 ; i < 4 ; i++){
       
        X.push(1)
    }
    console.log(matrix1)
   
    for(let i = 1;i < 4 ; i++){
        for(let j = i ;j < 4 ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < 4+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
                
            }
    
        }
         
    }

    for(let i = 4-1 ;i >= 0 ; i--){
        let sum = 0;
        for(let j = 0 ; j < 4 ;j++){
            sum = sum + matrix1[i][j]*X[j];
        }
        sum = sum - matrix1[i][i]
        X[i] = ((matrix1[i][4] - sum)/matrix1[i][i])
        
    }
    console.log(X[0])
    console.log(X[1])
    console.log(X[2])
    console.log(X[3])

    

    let fX = X[0] + X[1]*X1+X[2]*X2+X[3]*X3

    /* arr.push({key :  1 ,fx : 'Y' , valuex : fX.toFixed(5) }) */
    arr.push(<div>{'Y = '} {fX.toFixed(5)}</div>)
    
    return arr


}