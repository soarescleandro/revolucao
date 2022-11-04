sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("Leandro.imagesearch.controller.Main", {
            onInit: function () {

                var ImageList = {
                    Images: [
                    {
                    title: "Google",
                    url: "https://www.google.com",
                    thumbnail: "../img/google.png"  
                    }
                    ,
                    {
                     title: "SAP FIORI",
                     url: "https://globalcscorp.com/wp-content/uploads/2018/12/sap-fiori.jpg",
                     thumbnail: "../img/sapfiori.png"      
                    }
                    ,
                    {
                     title: "Comunidade - A Revolução do SAP FIORI",
                     url: "https://www.facebook.com/groups/revolucaodosapfiori",
                     thumbnail: "../img/facebook.png"    
                    }

                    ]
                    };
                    var ImageModel = new JSONModel(ImageList);
                    this.getView().setModel(ImageModel, "ModeloImagem");


	},

		
//onPressBuscar: function(){
    onPressBuscar: function(oEvent) {
        //alert("Começou a revolução do SAP Fiori!!"); 
        var oInputBusca = this.byId("inpBusca");
        var sQuery = oInputBusca.getValue();
        //alert(sQuery); */


        $.ajax({
        //cabeçalho
        url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
        method: "GET",
        async:true,
        crossDomain:true,
        jsonpCallback: "getJSON",
        contentType: "application/json",
        headers: {
        "X-RapidAPI-Key": "02e86f448fmsh82a65436e4c63b8p14232ajsnada66a2f4ad1",
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
        },

        //corpo
        data: {
        "q": sQuery,
        "pageNumber": 1,
        "pageSize": 30,
        "autoCorrect": true,
        "safeSearch" : true
        },
        
        //retorno em caso de sucesso
        success: function(data, textStatus){
        var oImageModel = this.getView().getModel("ModeloImagem");
        var oDadosImage = oImageModel.getData();

        oDadosImage = {
            Images: []
        };
            oImageModel.setData(oDadosImage);
            debugger	
            
            var listaResultados = data.value;
            var newItem;
        
            for(var i = 0; i < listaResultados.length ; i++){
        
            newItem = listaResultados[i];
            oDadosImage.Images.push(newItem);
        
        };
        
            oImageModel.refresh();
        
            }.bind(this),
        
            //retorno em caso de erro
            error: function(){
        
            }.bind(this)
        
            });//fim $.ajax({
            
         }



	});
   });