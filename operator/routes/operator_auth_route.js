const express = require("express")
const { operatorLogin } = require("../controllers/operator_auth_controller")

const operator_auth_route = express.Router()

operator_auth_route.route("/auth/login", operatorLogin)


module.exports = { operator_auth_route }