sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
], (Controller, JSONModel, Filter) => {
    "use strict";

    return Controller.extend("com.rebit.jsonmodelexample.controller.S1", {
        onInit() {

            // Approach 1 
            // Step1 : Created Mock Data 
            // var jsonProductsData = [
            //     {
            //         "ProductId": "HT-1000",
            //         "Category": "Laptops",
            //         "MainCategory": "Computer Systems",
            //         "TaxTarifCode": "1",
            //         "SupplierName": "Very Best Screens",
            //         "WeightMeasure": 4.2,
            //         "WeightUnit": "KG",
            //         "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
            //         "Name": "Notebook Basic 15",
            //         "DateOfSale": "2017-03-26",
            //         "ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
            //         "Status": "Available",
            //         "Quantity": 10,
            //         "UoM": "PC",
            //         "CurrencyCode": "EUR",
            //         "Price": 956,
            //         "Width": 30,
            //         "Depth": 18,
            //         "Height": 3,
            //         "DimUnit": "cm"
            //     },
            //     {
            //         "ProductId": "HT-1001",
            //         "Category": "Laptops",
            //         "MainCategory": "Computer Systems",
            //         "TaxTarifCode": "1",
            //         "SupplierName": "Very Best Screens",
            //         "WeightMeasure": 4.5,
            //         "WeightUnit": "KG",
            //         "Description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
            //         "Name": "Notebook Basic 17",
            //         "DateOfSale": "2017-04-17",
            //         "ProductPicUrl": "test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
            //         "Status": "Available",
            //         "Quantity": 20,
            //         "UoM": "PC",
            //         "CurrencyCode": "EUR",
            //         "Price": 1249,
            //         "Width": 29,
            //         "Depth": 17,
            //         "Height": 3.1,
            //         "DimUnit": "cm"
            //     }

            // ];
         
            // Step2: Set Mock Data to JSONModel 
            // var jsonModel = new JSONModel();
            // jsonModel.setData({
            //     "ProductCollection": jsonProductsData
            // });

            // Step3 : Set the JSONModel to View 
            // var sView = this.getView();
            // sView.setModel(jsonModel);


            // Approach 2 
            // var jsonModel = new JSONModel("model/Products.json");
            // var sView = this.getView();
            // sView.setModel(jsonModel);

        },
        /**
         * 
         * @param {*} oEvent 
         */
        onProductListSearch: function(oEvent){
            let searchQuery = oEvent.getParameters().query;
            if(searchQuery){
                var sNameFilterObject =  new Filter("Name", sap.ui.model.FilterOperator.Contains, searchQuery);
                var productListObject = this.getView().byId("productList");
                productListObject.getBinding("items").filter(sNameFilterObject);
            }

        },
        onProductCategorySelection: function(oEvent){

            // Approach1 
            // var sSource = oEvent.getSource(); // It will give you the source of the control object, here Select Control Object .set****, .get***
            // var sSelectedItem = sSource.getSelectedItem(); // here we will recieved selected Item of the Object , will returen Item source / Item Object .set***, get***
            // var sSelectedKey = sSelectedItem.getKey(); // It will return key value of Core Item/ Selected item 
            // var sSelectedText = sSelectedItem.getText();
            // console.log(sSelectedKey  + "=---------" + sSelectedText);

            // Approach1 with short format of getting the value 
            // var sSelectedText = oEvent.getSource().getSelectedItem().getText();// oEvent.getSource() - Select , // oEvent.getSource().getSelectedItem() - > core->Item Control 
            // console.log(sSelectedText);

            //Approach2 
            // var selectedText = oEvent.getParameters().selectedItem.getText(); // It will return core->Item Control 
            // console.log(selectedText);

            //Approach2 
            // var selectedText = oEvent.getParameter("selectedItem").getText(); // It will return core->Item Control 
            // console.log(selectedText);


            //Approach3 
            var sSelectedText = this.getView().byId("productCategorySelectId").getSelectedItem().getText(); 
            console.log(sSelectedText);

            
            var sNameFilterObject =  new Filter("Category", sap.ui.model.FilterOperator.Contains, "Laptops");
            var productListObject = this.getView().byId("productList");
            productListObject.getBinding("items").filter(sNameFilterObject);
        }
    });
});