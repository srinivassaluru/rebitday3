sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";
    // var sValue; 
    return Controller.extend("com.rebit.fico.basicui5.controller.S1", {

        sValue : 0,
        onInit() {
            console.log("Initialization");
            // this.sValue = "0";
            var sValue = [
                {
                    "Name": "Trainin1",
                    "count": 10,
                    "cost": 4500.34,
                    "Extension": false
                },

                {
                    "Name": "Trainin1",
                    "count": 10,
                    "cost": 4500.34,
                    "Extension": false
                },
                {
                    "Name": "Trainin1",
                    "count": 10,
                    "cost": 4500.34,
                    "Extension": false
                }

            ];
            console.log(sValue);

            for(var i in sValue){
                console.log(sValue[i]);
            }
            
            var x = 'value1';
            var y = 'value2';
            var sContext = "/sEntitySet(key1='"+x+"',key2='"+y+"')";
            var sContext1 = `/sEntitySet(key1='${x}',key2='${y}')`;
            console.log(sContext);
            console.log(sContext);
        },
        onApprove: function () {
            MessageBox.success("Tku");
            console.log(this.sValue);
        },
        onReject: function () {
            MessageBox.error("Bye");
        },
        handleListSelection: function () {
            // var s1Controller = this;
            var sValue;
            MessageBox.confirm("Are you sure want to navigate ?", {
                onClose: function (sValue) { // if value available , here sValue will give you that associated reference value, if not available it will simply give you undefined 
                    console.log(sValue);
                    if (sValue == "OK") {
                        var routerObj = this.getOwnerComponent().getRouter();
                        routerObj.navTo("RouteS2");
                    }
                }.bind(this)
            });

            console.log(this.sValue);
            // {} -> Object 
            // [] - > array 
            // Object + array  -> JSON
            // var routerObj = this.getOwnerComponent().getRouter();
            // routerObj.navTo("RouteS2");
            // this is a keyword / Reserveword 
            // this -> holds -> current object -> current controller 
        }
    });
});