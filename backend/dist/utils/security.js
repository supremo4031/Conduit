"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFields = void 0;
function sanitizeFields(user) {
    if (user.password)
        delete user.password;
    return user;
}
exports.sanitizeFields = sanitizeFields;
