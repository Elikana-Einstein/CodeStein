"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const client_1 = require("./backend/client");
const createCommand_1 = require("./commands/createCommand");
const logger_1 = require("./utils/logger");
function activate(context) {
    (0, logger_1.initializeLogger)();
    (0, logger_1.log)("File Creator extension activated.");
    (0, createCommand_1.registerCreateCommand)(context);
    const backendClient = new client_1.BackendClient();
    /*
     * For the MVP, poll the backend every 2 seconds.
     *
     * We can replace this with WebSocket later.
     */
    const timer = setInterval(async () => {
        await backendClient.fetchRequests();
    }, 2000);
    context.subscriptions.push({
        dispose: () => {
            clearInterval(timer);
        }
    });
}
function deactivate() {
    // Cleanup happens through subscriptions.
}
//# sourceMappingURL=extension.js.map