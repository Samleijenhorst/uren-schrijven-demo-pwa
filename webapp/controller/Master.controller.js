sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("com.alliander.todo.demo.uren-schrijven-demo-pwa.controller.Master", {
		onInit: function () {},
		onPress: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("Detail", {
				Item: oEvent.getSource().getBindingContext("todo").sPath.split("/").pop()
			});
		},
		onAdd: function (oEvent) {
			var oLongitude;
			navigator.geolocation.getCurrentPosition(function (oCoords) {
				oLongitude = oCoords.coords.longitude;
				var sCustomer = oLongitude > 0 ? "Alliander" : "Vebego";
				this.getView().getModel("todo").addItem("newEntry", {
					Customer: "Alliander",
					Project: "Development",
					Time: "8:00"
				});
				MessageToast.show("Klant en project bepaald o.b.v. locatie.");

			}.bind(this))
		},
		onLocationSelect: function (oEvent) {
			MessageToast.show("Klant en project bepaald o.b.v. locatie.");
		},
		onRemove: function (oEvent) {
			this.getView().getModel("todo").deleteItem(oEvent.oSource.oParent.oParent.getBindingContext("todo").getObject().id)
		},
		onCollapse: function (oEvent) {
			var bVisible = oEvent.getSource().getParent().getParent().getContent()[1].getVisible();
			oEvent.getSource().getParent().getParent().getContent()[1].setVisible(!bVisible);
			oEvent.getSource().setIcon(bVisible ? "sap-icon://navigation-down-arrow" : "sap-icon://navigation-up-arrow");
		},
		handlePressOpenMenu: function (oEvent) {
			var oButton = oEvent.getSource();

			// create menu only once
			if (!this._menu) {
				this._menu = sap.ui.xmlfragment(
					"com.alliander.todo.demo.uren-schrijven-demo-pwa.fragments.Menu",
					this
				);
				this.getView().addDependent(this._menu);
			}

			var eDock = sap.ui.core.Popup.Dock;
			this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
		},
		onSubmit: function (oEvent) {
			MessageToast.show("Uren zijn ingediend");
		},

		handleMenuItemPress: function(oEvent) {
			switch (oEvent.getParameter("item").getId()){
			case "MonthButton": 
				this.getOwnerComponent().getRouter().navTo("Month");
				break;
			case "WeekButton": 
				this.getOwnerComponent().getRouter().navTo("Detail");
				break;
			}
		},
		onNavToWeek: function (oEvent) {
			this.getRouter().navTo("Detail");
		},
		onNavToMonth: function (oEvent) {
			this.getRouter().navTo("Month");
		}
	});
});