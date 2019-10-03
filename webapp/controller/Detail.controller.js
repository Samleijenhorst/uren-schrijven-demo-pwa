sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"../model/firestore-todo"
], function (Controller, History, firestoreTodo) {
	"use strict";

	return Controller.extend("com.alliander.todo.demo.uren-schrijven-demo-pwa.controller.Detail", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Detail").attachMatched(this.onRouteMatched, this);
		},
		
		_id: null,
		onRouteMatched: function(oEvent) {
			this._id = oEvent.getParameter("arguments").Item;
			this.getView().bindElement({
				path: "todo>/" + oEvent.getParameter("arguments").Item
			});
		},
		
		onCheckItem: function(oEvent) {
		    var bSelected = oEvent.getParameter("selected");
		    var oContext = oEvent.getSource().getBindingContext("todo");
		    var selectedId = oContext.getModel().getProperty(oContext.getPath() + "/id");
		    firestoreTodo.setSelected(selectedId, bSelected);
		},
		
		onChangeTitle: function(oEvent) {
			var oContext = oEvent.getSource().getBindingContext("todo");
			var iId = oContext.getModel().getProperty(oContext.getPath() + "/id");
			var sTitle = oContext.getModel().getProperty(oContext.getPath() + "/title");
		    firestoreTodo.setTitle(iId, sTitle);
		},
		
		onChangeDescription: function(oEvent) {
			var oContext = oEvent.getSource().getBindingContext("todo");
			var iId = oContext.getModel().getProperty(oContext.getPath() + "/id");
			var sDescription = oContext.getModel().getProperty(oContext.getPath() + "/description");
		    firestoreTodo.setDescription(iId, sDescription);
		},
		
		onBack: function(){
			var sPreviousHash = History.getInstance().getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("RouteList", {}, true);
			}
		},
		
		onDelete: function() {
			var oPage = this.getView().byId("TodoTaskPage"),
			that = this;
			oPage.setBusy(true);
			firestoreTodo.deleteItem(this._id, {
				success: function() {
					oPage.setBusy(false);
					that.onBack();
				}
			});
		}
	});
});