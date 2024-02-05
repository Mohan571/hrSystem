const { StatusCodes } = require("http-status-codes");
const Messages = require("./messages");

function baseResponse(
    res,
    success,
    data,
    message = null,
    error = null,
    statuscode = StatusCodes.OK
) {
    const response = {
        success,
        data,
    };

    if (message) {
        response.message = message;
    }
    if (error) {
        response.error = error;
    }
    res.status(statuscode).json(response);
}

function saveResponse(res, entitySaveData, message = Messages.EntityCreated) {
    baseResponse(
        res,
        true,
        entitySaveData,
        {
            message,
            statuscode: StatusCodes.CREATED,
        },
        null,
        StatusCodes.CREATED
    );
}

function updateResponse(res, updateEntityData, message = Messages.EntityUpdated) {
    baseResponse(
        res,
        true,
        updateEntityData,
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function deleteResponse(res, message = Messages.EntityDeleted) {
    baseResponse(
        res,
        true,
        {},
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function serverIssueResponse(res, error) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.InternalServerError,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
        },
        error !== undefined ? error.message : null,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

function entityNotAvailable(res, message = Messages.EntityNotAvailable) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function sendDataResponse(res, data, message = Messages.EntityFetched) {
    baseResponse(
        res,
        true,
        data,
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function invalidCredentialResponse(res, message = Messages.InvalidCredentials) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function entityAlreadyExists(res, message = Messages.EntityExists) {
    baseResponse(
        res,
        false,
        {},
        { message, statuscode: StatusCodes.CONFLICT },
        null,
        StatusCodes.CONFLICT
    );
}

function unAuthorizedResponse(res) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.Forbidden,
            statuscode: StatusCodes.FORBIDDEN,
        },
        null,
        StatusCodes.FORBIDDEN
    );
}

function validationsResponse(res, errorsArray) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.InvalidData,
            statuscode: StatusCodes.UNPROCESSABLE_ENTITY,
        },
        {
            errorsArray,
        },
        StatusCodes.UNPROCESSABLE_ENTITY
    );
}

function organisationExist(res) {
    baseResponse(
        res,
        false,
        {},
        { message: Messages.OrganisationExist },
        null,
        StatusCodes.CONFLICT
    );
}

module.exports = {
    baseResponse,
    saveResponse,
    updateResponse,
    deleteResponse,
    serverIssueResponse,
    entityNotAvailable,
    sendDataResponse,
    invalidCredentialResponse,
    entityAlreadyExists,
    unAuthorizedResponse,
    validationsResponse,
    organisationExist,
};
