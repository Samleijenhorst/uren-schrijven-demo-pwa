sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.alliander.todo.demo.uren-schrijven-demo-pwa.controller.Master", {
		onInit: function () {
		},
		onPress: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("Detail", 
				{Item: oEvent.getSource().getBindingContext("todo").sPath.split("/").pop()});
		}
	});
});