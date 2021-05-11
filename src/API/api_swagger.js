const config = {
    "swagger": "2.0",
    "info": {
        "title": "Swagger Numerical Method"
    },
    
    "paths":{
        "/root_of_equation":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดใน Root of Equation",
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "Not Found"
                    }
                }
            }
        },
        "/root_of_equation/{Id}":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ระบุหมายเลขโจทย์ใน Root of Equation",
                "parameters": [
                    {
                        "name": "Id",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ที่จะค้นหา",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "Not Found"
                    }
                }
            }
        },
        "/matrix":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Matrix",
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "Not Found"
                    }
                }
            }
        },
        "/matrix/{Id}":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Matrix",
                "parameters": [
                    {
                        "name": "Id",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ที่จะค้นหา",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "Not Found"
                    }
                }
            }
        },
        "/interpolation":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Interpolation",
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "Not Found"
                    }
                }
            }
        },
        "/interpolation/{Id}":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Interpolation",
                "parameters": [
                    {
                        "name": "Id",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ที่จะค้นหา",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "Not Found"
                    }
                }
            }
        },
        "/regression":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Regression",
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "NotFound"
                    }
                }
            }
        },
        "/regression/{Id}":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Regression",
                "parameters": [
                    {
                        "name": "Id",
                        "in": "path",
                        "description": "หมายเลขไอดีของโจทย์ที่จะค้นหา",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description" : "Success"
                    },
                    "404":{
                        "description" : "Not Found"
                    }
                }
            }
        }
    }
}

export { config }