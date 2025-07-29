sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, MessageToast, DateFormat) {
    "use strict";

    return Controller.extend("com.dashboard.fiori.controller.Dashboard", {
        
        onInit: function () {
            // Initialize the dashboard model
            this._initializeModel();
            
            // Set default date range (last 30 days)
            this._setDefaultDateRange();
            
            // Load initial data
            this._loadDashboardData();
        },

        /**
         * Initialize the dashboard data model
         * @private
         */
        _initializeModel: function () {
            var oModel = new JSONModel({
                fromDate: null,
                toDate: null,
                kpis: {
                    totalSales: "$0",
                    salesTrend: "+0%",
                    totalOrders: "0",
                    ordersTrend: "+0%",
                    avgOrderValue: "$0",
                    avgTrend: "+0%",
                    customerCount: "0",
                    customerTrend: "+0%"
                },
                tableData: []
            });
            this.getView().setModel(oModel);
        },

        /**
         * Set default date range to last 30 days
         * @private
         */
        _setDefaultDateRange: function () {
            var oModel = this.getView().getModel();
            var oToDate = new Date();
            var oFromDate = new Date();
            oFromDate.setDate(oToDate.getDate() - 30);

            var oDateFormat = DateFormat.getInstance({
                pattern: "yyyy-MM-dd"
            });

            oModel.setProperty("/fromDate", oDateFormat.format(oFromDate));
            oModel.setProperty("/toDate", oDateFormat.format(oToDate));
        },

        /**
         * Load dashboard data based on date range
         * @private
         */
        _loadDashboardData: function () {
            var oModel = this.getView().getModel();
            var sFromDate = oModel.getProperty("/fromDate");
            var sToDate = oModel.getProperty("/toDate");

            // Simulate data loading with sample data
            // In real application, this would be an OData service call
            this._generateSampleData(sFromDate, sToDate);
        },

        /**
         * Generate sample data for demonstration
         * @private
         * @param {string} sFromDate - From date in yyyy-MM-dd format
         * @param {string} sToDate - To date in yyyy-MM-dd format
         */
        _generateSampleData: function (sFromDate, sToDate) {
            var oModel = this.getView().getModel();
            
            // Sample KPI data
            var oKpis = {
                totalSales: "$124,567",
                salesTrend: "+12.5%",
                totalOrders: "1,234",
                ordersTrend: "+8.3%",
                avgOrderValue: "$101",
                avgTrend: "+3.7%",
                customerCount: "987",
                customerTrend: "+15.2%"
            };

            // Sample table data
            var aTableData = [];
            var aCustomers = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson"];
            var aStatuses = ["Completed", "Pending", "Processing", "Shipped"];
            
            for (var i = 0; i < 50; i++) {
                var oDate = new Date(sFromDate);
                oDate.setDate(oDate.getDate() + Math.floor(Math.random() * 30));
                
                aTableData.push({
                    date: this._formatDate(oDate),
                    transactionId: "TXN" + (1000 + i).toString().padStart(6, '0'),
                    customer: aCustomers[Math.floor(Math.random() * aCustomers.length)],
                    amount: "$" + (Math.random() * 500 + 50).toFixed(2),
                    status: aStatuses[Math.floor(Math.random() * aStatuses.length)]
                });
            }

            // Sort by date descending
            aTableData.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            });

            oModel.setProperty("/kpis", oKpis);
            oModel.setProperty("/tableData", aTableData);
        },

        /**
         * Format date for display
         * @private
         * @param {Date} oDate - Date object
         * @returns {string} Formatted date string
         */
        _formatDate: function (oDate) {
            var oDateFormat = DateFormat.getInstance({
                pattern: "MMM dd, yyyy"
            });
            return oDateFormat.format(oDate);
        },

        /**
         * Handle date change events
         * @public
         * @param {sap.ui.base.Event} oEvent - Date change event
         */
        onDateChange: function (oEvent) {
            var oModel = this.getView().getModel();
            var sFromDate = oModel.getProperty("/fromDate");
            var sToDate = oModel.getProperty("/toDate");

            // Validate date range
            if (sFromDate && sToDate && new Date(sFromDate) > new Date(sToDate)) {
                MessageToast.show("From date cannot be later than To date");
                return;
            }

            // Auto-refresh data when both dates are selected
            if (sFromDate && sToDate) {
                this._loadDashboardData();
            }
        },

        /**
         * Handle apply filters button press
         * @public
         */
        onApplyFilters: function () {
            var oModel = this.getView().getModel();
            var sFromDate = oModel.getProperty("/fromDate");
            var sToDate = oModel.getProperty("/toDate");

            if (!sFromDate || !sToDate) {
                MessageToast.show("Please select both From and To dates");
                return;
            }

            if (new Date(sFromDate) > new Date(sToDate)) {
                MessageToast.show("From date cannot be later than To date");
                return;
            }

            this._loadDashboardData();
            MessageToast.show("Dashboard updated for selected date range");
        },

        /**
         * Format status for ObjectStatus control
         * @public
         * @param {string} sStatus - Status value
         * @returns {string} Status state
         */
        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Completed":
                    return "Success";
                case "Pending":
                    return "Warning";
                case "Processing":
                    return "Information";
                case "Shipped":
                    return "Success";
                default:
                    return "None";
            }
        },

        /**
         * Handle export data button press
         * @public
         */
        onExportData: function () {
            MessageToast.show("Export functionality would be implemented here");
            // In a real application, this would export the table data to Excel
        },

        /**
         * Convenience method for accessing the router
         * @public
         * @returns {sap.ui.core.routing.Router} the router for this component
         */
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        }
    });
});