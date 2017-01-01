"use strict";
class ErrorsHandler {
    generic(err, req, res, next) {
        if (!err)
            return next();
        res.status(500).json({ success: false, error: err.message });
    }
}
exports.ErrorsHandler = ErrorsHandler;
//# sourceMappingURL=errors.handler.js.map