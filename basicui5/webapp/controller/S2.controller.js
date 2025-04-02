sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("com.rebit.fico.basicui5.controller.S2", {
        onInit() {
        },
        onApprove: function(){
            MessageBox.success("Tku");
        },
        onReject: function(){
            MessageBox.error("Bye");
        }
    });
});