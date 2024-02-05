const base_response = require("../helpers/base-response").response;
const logModel = require("../schemas/logModel");
const ApiResponse=require('../utils/ApiResponse')

const loginTypeMiddleware = (...restrictedRoles) => {
    return async (req, res, next) => {
        try {

            // Finding User Role From The JWT Token
            const userRole = req.login.login_type;

            // Checking If User Has The Authority To Access The Module.
            const hasAccess = restrictedRoles.includes(userRole);
            console.log(restrictedRoles, userRole);

            if (hasAccess) {
                next();
            } else {
                const message = "You Are Not Allowed To Access This Module.";
                // return res.status(403).json(base_response(403, { restrictedRoles, userRole }, message));
                return ApiResponse.unAuthorizedResponse(res,message)
            }
        } catch (error) {
            await logModel.Insert({}, error);
            console.error(error);
            // return res.status(500).json(base_response(500, {}, "Internal Server Error"));
            return ApiResponse.serverIssueResponse(res);
        }
    };
};

module.exports = loginTypeMiddleware;
