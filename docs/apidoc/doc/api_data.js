define({ "api": [
  {
    "type": "post",
    "url": "admin/admin/",
    "title": "Update admin profile",
    "name": "AdminCreate",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the admin logged in.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the admin in the database. (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>New email or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New username or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the admin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the admin in the database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the admin.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 4242,\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>The parameters were not correctly formated.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "AdminNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"adminError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/admin/:id",
    "title": "Gets information about the admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the admin in the database.</p>"
          }
        ]
      }
    },
    "name": "AdminInfo",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the admin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the admin in the database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the admin.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 4242,\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "AdminNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"adminError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/admin/admin/:id",
    "title": "Gets information about the admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the admin in the database.</p>"
          }
        ]
      }
    },
    "name": "AdminInfo",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the admin logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidId",
            "description": "<p>The admin id is unknown.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "AdminNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"AdminError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "admin/admin/:id",
    "title": "Update admin profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the admin in the database.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>New email or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New username or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the admin.</p>"
          }
        ]
      }
    },
    "name": "AdminInfoUpdate",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the admin logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the admin in the database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the admin.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 4242,\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParamsOrId",
            "description": "<p>The parameters were not correctly formated or the Id is unknown.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "AdminNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"adminError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/admins",
    "title": "Get all admins",
    "name": "AllAdmins",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "totalCount",
            "description": "<p>Number of total admins</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "admins",
            "description": "<p>An array of user, formatted the same way as GET /user/:id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"totalCount\": 2,\n     \"admins\": [\n         {\n             \"id\": 4242,\n             \"email\": \"dems@epitech.eu\",\n             \"username\": \"dems\"\n         },\n         ...\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "NoService",
            "description": "<p>You have not any service.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "AdminNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/users",
    "title": "Get all users",
    "name": "AllUsers",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "totalCount",
            "description": "<p>Number of total users</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>An array of user, formatted the same way as GET /user/:id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"totalCount\": 2,\n     \"users\": [\n         {\n             \"id\": 4242,\n             \"email\": \"dems@epitech.eu\",\n             \"username\": \"dems\"\n         },\n         ...\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "NoService",
            "description": "<p>You have not any service.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "AdminNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "admin/user/",
    "title": "Update user profile",
    "name": "UserCreate",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database. (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>New email or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New username or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 4242,\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>The parameters were not correctly formated.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/user/:id",
    "title": "Gets information about the user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database.</p>"
          }
        ]
      }
    },
    "name": "UserInfo",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 4242,\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/admin/user/:id",
    "title": "Gets information about the user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database.</p>"
          }
        ]
      }
    },
    "name": "UserInfo",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidId",
            "description": "<p>The User id is unknown.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "admin/user/:id",
    "title": "Update user profile",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>New email or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New username or the old one if you don't want to update it.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      }
    },
    "name": "UserInfoUpdate",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 4242,\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParamsOrId",
            "description": "<p>The parameters were not correctly formated or the Id is unknown.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/area",
    "title": "Create a new AREA",
    "name": "AreaCreate",
    "group": "Area",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in. // TODO here add all the future elements of an area (the actions and reactions it contains)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./area.js",
    "groupTitle": "Area"
  },
  {
    "type": "get",
    "url": "/area/:id",
    "title": "Get information about an AREA",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Area id to get information from</p>"
          }
        ]
      }
    },
    "name": "AreaInfo",
    "group": "Area",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in. // TODO here add all the future elements of an area (the actions and reactions it contains)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./area.js",
    "groupTitle": "Area"
  },
  {
    "type": "delete",
    "url": "/area/:id",
    "title": "Delete an AREA",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Area id to get information from</p>"
          }
        ]
      }
    },
    "name": "AreaInfo",
    "group": "Area",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in. // TODO only put error code and success code</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./area.js",
    "groupTitle": "Area"
  },
  {
    "type": "put",
    "url": "/area/:id",
    "title": "Update information about an AREA",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Area id to get information from</p>"
          }
        ]
      }
    },
    "name": "AreaUpdate",
    "group": "Area",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in. // TODO here add all the future elements of an area (the actions and reactions it contains)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./area.js",
    "groupTitle": "Area"
  },
  {
    "type": "get",
    "url": "/available/actions",
    "title": "Get all the actions a user can use",
    "name": "AvailableActions",
    "group": "Available",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "TotalCount",
            "description": "<p>Total number of actions a user can subscribe</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Actions",
            "description": "<p>All the actions it found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"totalCount\": 42,\n     \"actions\": [\n         {\n             \"name\": \"twitterReadNewTweet\",\n             \"displayName\": \"Read New Tweet\",\n             \"description\": \"Read new tweet for a specific account\"\n         },\n         ...\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./available.js",
    "groupTitle": "Available"
  },
  {
    "type": "get",
    "url": "/available/reactions",
    "title": "Get all the reactions a user can use",
    "name": "AvailableRactions",
    "group": "Available",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "TotalCount",
            "description": "<p>Total number of reactions a user can subscribe</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Reactions",
            "description": "<p>All the actions it found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"totalCount\": 42,\n     \"reactions\": [\n         {\n             \"name\": \"telegramPostMessage\",\n             \"displayName\": \"Send A Telegram Message\",\n             \"description\": \"Send a telegram message to a specific person\"\n         },\n         ...\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./available.js",
    "groupTitle": "Available"
  },
  {
    "type": "get",
    "url": "/available/services",
    "title": "Get all the service a user can subscribe",
    "name": "AvailableServices",
    "group": "Available",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "TotalCount",
            "description": "<p>Total number of services a user can subscribe</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Services",
            "description": "<p>All the services it found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"totalCount\": 26,\n     \"services\": [\n         {\n             \"name\": \"twitter\",\n             \"displayName\": \"Twitter\",\n             \"description\": \"To use Twitter API\"\n         },\n         ...\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./available.js",
    "groupTitle": "Available"
  },
  {
    "type": "get",
    "url": "/redirect?serviceName",
    "title": "Request an URL to launch OAUTH2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "serviceName",
            "description": "<p>Name of the service you want to connect to</p>"
          }
        ]
      }
    },
    "name": "RedirectRequest",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "redirectLink",
            "description": "<p>Link to redirect the user to to authenticate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"link\": \"https://twitter.com/authorize/oauth\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidName",
            "description": "<p>Service not known.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./service.js",
    "groupTitle": "Service"
  },
  {
    "type": "delete",
    "url": "/service/:id",
    "title": "Delete a Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Service id to get information from</p>"
          }
        ]
      }
    },
    "name": "ServiceDelete",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidId",
            "description": "<p>Id not found or does not exist.</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InvalidService",
            "description": "<p>You haven't subscribed to this service yet.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./service.js",
    "groupTitle": "Service"
  },
  {
    "type": "get",
    "url": "/service/:id",
    "title": "Get information about a Service",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Service id to get information from</p>"
          }
        ]
      }
    },
    "name": "ServiceInfo",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the service</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the service</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "displayName",
            "description": "<p>Name to display of the service</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the service</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"id\": 42,\n     \"name\": \"twitter\",\n     \"class_name\": \"TwitterService\",\n     \"token\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidId",
            "description": "<p>Id not found or does not exist.</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InvalidService",
            "description": "<p>You haven't subscribed to this service yet.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./service.js",
    "groupTitle": "Service"
  },
  {
    "type": "post",
    "url": "/service",
    "title": "Subscribe to a new service",
    "name": "ServiceSubscribe",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the service</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "displayName",
            "description": "<p>Name to display of the service</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the service</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token of the service you just connected to</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Parameters send to the POST are invalid.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./service.js",
    "groupTitle": "Service"
  },
  {
    "type": "get",
    "url": "/services",
    "title": "Get all services",
    "name": "ServicesInfo",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "totalCount",
            "description": "<p>Number of total services the user is subscribed to</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "services",
            "description": "<p>An array of service, formatted the same way as GET /service/:id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n         \"totalCount\": 2,\n         \"services\": [\n             Service {\n\t\t\t\t\t\"id\": 1,\n                 \"name\": \"Twitter\",\n                 \"class_name\": \"TwitterService\",\n                 \"token\": {...}\n             },\n             ...\n         ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./service.js",
    "groupTitle": "Service"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Authenticate user to the back and obtain a token",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user who wants to authenticate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user who wants to authenticate</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Token of the user, used to authenticate the requests</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"token\": erdf45678cdsd\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>The parameters were not correctly formated.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidCredentials",
            "description": "<p>Your username or password were incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/logout",
    "title": "Logout a user already connected",
    "name": "LogoutUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please login first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register a new user",
    "name": "RegisterUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>The parameters were not correctly formated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/me",
    "title": "Gets information about the user",
    "name": "UserInfo",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Uint",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user in the database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user currently logged.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user currently logged.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 4242,\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/me",
    "title": "Update user profile",
    "name": "UserInfoUpdate",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "defaultValue": "Bearer (token)",
            "description": "<p>Token of the user logged in.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>New email. (optional, only one required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>New username. (optional, only one required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password. (optional, only one required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user currently logged.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user currently logged.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"email\": \"dems@epitech.eu\",\n   \"username\": \"dems\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>The parameters were not correctly formated.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UserNotLoggedIn",
            "description": "<p>You are not connected please loggin first.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>A token was provided but it is invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX ErrorName\n{\n    \"errorName\": \"UserError\"\n    \"errorDescription\": \"Simple example of what is returned when an error occurred\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  }
] });
