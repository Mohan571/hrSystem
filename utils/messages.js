const Messages = {
    // Server Issue Messages
    InternalServerError: "Internal Server Error",

    // JWT Messages
    UnableToCreateJWTToken: "Unable to create a JWT Token",
    InvalidJWTToken: "Invalid JWT Token",
    JWTTokenRequired: "Please provide a JWT Token",
    Forbidden: "You do not have permission to access this module",

    // Entities Success Messages
    EntityNotAvailable: "No data is associated with the given ID",
    EntityCreated: "Data saved successfully",
    EntityDeleted: "Data deleted successfully",
    EntityUpdated: "Data updated successfully",
    EntityFetched: "Data fetched successfully",

    InvalidCredentials: "Invalid email or password",
    LoginSuccessful: "User login successful",

    // Entities Error Messages
    EntityExists: "An entity is already associated with the given ID",
    UnableToSaveEntity: "Unable to save data",
    UnableToGetEntity: "Unable to fetch data",
    UnableToUpdateEntity: "Unable to update data",
    UnableToDeleteEntity: "Unable to delete data",
    UnableToGetEntityById: "Unable to get data by ID",

    // Validation Messages
    InvalidEmail: "Please provide a valid email address",
    InvalidPassword: "Please provide a password in a valid format",
    InvalidPasswordConfirmPassword: "Password and confirm password do not match",
    InvalidData: "Please provide valid data or data is not in a valid format",
    IdRequired: "Please provide an ID",
    PositiveValuesRequired: "Please provide a value greater than or equal to 0",

    // Required Messages
    EmailRequired: "Email address is required",
    PasswordRequired: "Password is required",
    ConfirmPasswordRequired: "Confirm password is required",
    NameRequired: "Name is required",
    PhoneNumberRequired: "Phone number is required",
    CountryRequired: "Country is required",
    StateRequired: "State is required",
    CityRequired: "City is required",
    ZipRequired: "Zip code is required",
    CompanyNameRequired: "Company name is required",
    DepartmentRequired: "Department is required",
    PositionRequired: "Position is required",
    RoleRequired: "Role is required",
    ModuleAccessRequired: "Module access is required",

    OrganisationExist: "An organization with this name already exists. Please try another name.",
    OrganisationRequired: "Organization name is required",
    RoleExisted: "The role you are creating already exists",
    RoleNotAllowed: "You are not allowed to create this role",
    RoleNotExist: "The role does not exist",
};

module.exports = Messages;
