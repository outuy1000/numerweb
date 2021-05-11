const config = {
    "swagger": "2.0",
    "info": {
        "description" : "API Document By Swagger. จัดทำหน้านี้ขึ้นเพื่อรวบรวม API ที่ใช้บนเว็บไซต์นี้",
        "title": "Swagger Numerical Method"
    },
    "host": "my-json-server.typicode.com/oiceo123/Web_Numer",
    
    "paths":{
        "/root_of_equation":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Root of Equation",
                "responses": {
                    "200": {
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
                    }
                }
            }
        },
        "/root_of_equation/{Id}":{
            "get":{
                "tags":[
                    "API"
                ],
                "summary": "ระบุหมายเลขโจทย์ในเรื่อง Root of Equation",
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
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
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
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
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
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
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
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
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
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
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
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
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
                        "description" : "ทำงานสำเร็จ"
                    },
                    "404":{
                        "description" : "ไม่พบโจทย์"
                    }
                }
            }
        }
    }
}

export { config }