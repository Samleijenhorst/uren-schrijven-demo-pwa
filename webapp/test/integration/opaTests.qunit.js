/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/alliander/todo/demo/uren-schrijven-demo-pwa/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});