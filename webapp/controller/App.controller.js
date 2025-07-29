sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.dashboard.fiori.controller.App", {
        onInit: function () {
            // Initialize the router
            this.getRouter().initialize();
        },

        /**
         * Convenience method for accessing the router.
         * @public
         * @returns {sap.ui.core.routing.Router} the router for this component
         */
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        }
    });
});