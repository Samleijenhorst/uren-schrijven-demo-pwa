sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.alliander.todo.demo.uren-schrijven-demo-pwa.controller.App", {
		onInit: function () {
		},
		onPress: function () {
			this.getRouter().navTo("Detail")
		}
	});
});