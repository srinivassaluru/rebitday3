sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/TextArea",
    "sap/m/Button",
    "sap/m/Input",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/ui/model/Filter"

], (Controller, JSONModel, Dialog, Label, TextArea, Button, Input, Fragment, MessageBox, Filter) => {
    "use strict";

    return Controller.extend("com.rebit.crudjsonexample.controller.S1", {
        onInit() {

            // Approach 1 
            // Step1 : Created Mock Data 
            var jsonProductsData = [
                {
                    "ProductId": "HT-1000",
                    "Category": "Laptops",
                    "MainCategory": "Computer Systems",
                    "TaxTarifCode": "1",
                    "SupplierName": "Very Best Screens",
                    "WeightMeasure": 4.2,
                    "WeightUnit": "KG",
                    "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                    "Name": "Notebook Basic 15",
                    "DateOfSale": "2017-03-26",
                    "ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
                    "Status": "Available",
                    "Quantity": 10,
                    "UoM": "PC",
                    "CurrencyCode": "EUR",
                    "Price": 956,
                    "Width": 30,
                    "Depth": 18,
                    "Height": 3,
                    "DimUnit": "cm"
                },
                {
                    "ProductId": "HT-1001",
                    "Category": "Laptops",
                    "MainCategory": "Computer Systems",
                    "TaxTarifCode": "1",
                    "SupplierName": "Very Best Screens",
                    "WeightMeasure": 4.5,
                    "WeightUnit": "KG",
                    "Description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                    "Name": "Notebook Basic 17",
                    "DateOfSale": "2017-04-17",
                    "ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
                    "Status": "Available",
                    "Quantity": 20,
                    "UoM": "PC",
                    "CurrencyCode": "EUR",
                    "Price": 1249,
                    "Width": 29,
                    "Depth": 17,
                    "Height": 3.1,
                    "DimUnit": "cm"
                }

            ];

            // Step2: Set Mock Data to JSONModel 
            var jsonModel = new JSONModel();
            jsonModel.setData({
                "ProductCollection": jsonProductsData
            });

            // Step3 : Set the JSONModel to View 
            var sView = this.getView();
            sView.setModel(jsonModel);


            // Approach 2 
            // var jsonModel = new JSONModel("model/Products.json");
            // var sView = this.getView();
            // sView.setModel(jsonModel);

        },
        handleAddProduct: function () {
            if (!this.oSubmitDialog) { // Global variable
                // this.oSubmitDialog = new Dialog({
                //     title: "Add Product",
                //     content: [
                //         new Label({
                //             text: "Product Name"
                //         }),
                //         new Input({
                //             width: "100%",
                //             placeholder: "Add note (required)",
                //             liveChange: function (oEvent) {
                //                 var sText = oEvent.getParameter("value");
                //                 this.oSubmitDialog.getBeginButton().setEnabled(sText.length > 0);
                //             }.bind(this)
                //         }),
                //         new Label({
                //             text: "Product Price"
                //         }),
                //         new Input({

                //         })
                //     ],
                //     beginButton: new Button({
                //         type: "Emphasized",
                //         text: "Submit",
                //         enabled: false,
                //         press: function () {
                //             var sText = Element.getElementById("submissionNote").getValue();
                //             MessageToast.show("Note is: " + sText);
                //             this.oSubmitDialog.close();
                //         }.bind(this)
                //     }),
                //     endButton: new Button({
                //         text: "Cancel",
                //         press: function () {
                //             this.oSubmitDialog.close();
                //         }.bind(this)
                //     })
                // });
                this.oSubmitDialog = Fragment.load({
                    name: "com.rebit.crudjsonexample.fragments.AddProduct",  // path of the fragment
                    controller: this // s1Controller
                });
            }
            this.oSubmitDialog.then(function (dialog) {
                sap.ui.getCore().byId("productName").setValue("");
                sap.ui.getCore().byId("productPrice").setValue("");
                dialog.open();

            });
        },
        handleCancel: function () {
            this.oSubmitDialog.then(function (dialog) {
                dialog.close();
            });
        },
        handleSubmit: function () {
            let sProductSource = sap.ui.getCore().byId("productName");
            var sProductName = sProductSource.getValue();
            var sProductPrice = sap.ui.getCore().byId("productPrice").getValue();
            let sFlagValidation = this.screenValidations(sProductName, sProductPrice);
            if (sFlagValidation) {
                var sNewData = {
                    "ProductId": "HT-100011111",
                    "Category": "Laptops",
                    "MainCategory": "Computer Systems",
                    "TaxTarifCode": "1",
                    "SupplierName": "Very Best Screens",
                    "WeightMeasure": 4.2,
                    "WeightUnit": "KG",
                    "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                    "Name": sProductName,
                    "DateOfSale": "2017-03-26",
                    "ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
                    "Status": "Available",
                    "Quantity": 10,
                    "UoM": "PC",
                    "CurrencyCode": "EUR",
                    "Price": sProductPrice,
                    "Width": 30,
                    "Depth": 18,
                    "Height": 3,
                    "DimUnit": "cm"
                };

                var existingJsonModel = this.getView().getModel();
                var existingData = existingJsonModel.getData(); // []
                existingData.ProductCollection.push(sNewData);
                existingJsonModel.setProperty("/ProductCollection", existingData.ProductCollection);

                this.oSubmitDialog.then(function (dialog) {
                    dialog.close();
                });
            } else {
                sProductSource.setValueState("Error");
                sProductSource.setValueStateText("Please Enter Product Name");

                sap.ui.getCore().byId("productPrice").setValueState("Error");
                sap.ui.getCore().byId("productPrice").setValueStateText("Please Enter Product Price");

                MessageBox.error("Please fill the mandaory values");
            }

        },
        handleProductNameChange: function (oEvent) {
            var sValue = oEvent.getSource().getValue();
            if (sValue) {
                sap.ui.getCore().byId("productName").setValueState("None");
            }
        },
        handleProudctPrice: function (oEvent) {
            var sValue = oEvent.getSource().getValue();
            if (sValue) {
                let sFlag = /^\d+$/.test(sValue);
                if (!sFlag) {
                    sap.ui.getCore().byId("productPrice").setValueState("Error");
                } else {
                    sap.ui.getCore().byId("productPrice").setValueState("None");
                }
            }
        },
        screenValidations: function (sProductName, sProductPrice) {
            if (sProductName && sProductPrice) { // Mandatory Check
                return true;
            } else {
                return false;
            }
        },
        onProductListSearch: function(oEvent){
            let searchQuery = oEvent.getParameters().query;
            var productListObject = this.getView().byId("productList");
            if(searchQuery){
                var sNameFilterObject =  new Filter("Name", sap.ui.model.FilterOperator.Contains, searchQuery);
                productListObject.getBinding("items").filter(sNameFilterObject);
            }else{
                productListObject.getBinding("items").filter([]);
            }

        },
        handleDeleteProduct: function(){
            //..
        }
    });
});