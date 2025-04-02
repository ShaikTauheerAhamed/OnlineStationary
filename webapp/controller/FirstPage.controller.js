sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], (Controller, JSONModel, Fragment) => {
    "use strict";

    return Controller.extend("onlinestationary.onlinestationary.controller.FirstPage", {
        onInit() {
            // var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
            // this.getView().setModel(oModel);
            // this.sShrinkRatio = "1:1.6:1.6";
            const booky = this;
            
            const odataemployee = this.getOwnerComponent().getModel();
            odataemployee.read("/ztbooksSet", {  
                success(odata) {
                    const odatamodel = new JSONModel({ ztbooksSet: odata.results });
                    booky.getView().setModel(odatamodel, "book");
                },
                error(oError) {
                    console.error("Error fetching data", oError);
                }
            });
        },
        onCreate: function () {
            var oNewEntry = {
                Bookid: "",
                Author: "",
                Gonre: "",
                Bookname: "",
                Price: "",
                Stock: "",
                Currency: "",
                Quan: ""
            };

            this.oModel.create("/ztbooksSet", oNewEntry, {
                success: function () {
                    MessageToast.show("Book Created Successfully");
                },
                error: function () {
                    MessageToast.show("Error creating book");
                }
            });
        },
        onUpdate: function () {
            var sPath = "/ztbooksSet('')";
            var oUpdatedEntry = {
                Author: "Updated Author"
            };

            this.oModel.update(sPath, oUpdatedEntry, {
                success: function () {
                    MessageToast.show("Book Updated Successfully");
                },
                error: function () {
                    MessageToast.show("Error updating book");
                }
            });
        },
        onDelete: function () {
            var sPath = "/ztbooksSet('')";
            this.oModel.remove(sPath, {
                success: function () {
                    MessageToast.show("Book Deleted Successfully");
                },
                error: function () {
                    MessageToast.show("Error deleting book");
                }
            });
        },



        getPage : function() {
            return this.byId("dynamicPageId");
        },
        onToggleFooter: function () {
            this.getPage().setShowFooter(!this.getPage().getShowFooter());
        },
        toggleAreaPriority: function () {
            var oTitle = this.getPage().getTitle(),
                sDefaultShrinkRatio = oTitle.getMetadata().getProperty("areaShrinkRatio").getDefaultValue(),
                sNewShrinkRatio = oTitle.getAreaShrinkRatio() === sDefaultShrinkRatio ? "1.6:1:1.6" : sDefaultShrinkRatio;
            oTitle.setAreaShrinkRatio(sNewShrinkRatio);
        },
        onPressOpenPopover: function (oEvent) {
            var oView = this.getView(),
                oSourceControl = oEvent.getSource();

            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sap.f.sample.DynamicPageFreeStyle.view.Card"
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }

            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oSourceControl);
            });
        // onDelete: function () {
        //         const oView = this.getView();
        //         const oSelectedItem = oView.byId("idBooksTable").getSelectedItem();
    
        //         if (!oSelectedItem) {
        //             MessageBox.warning("Please select a book to delete.");
        //             return;
        //         }
    
        //         const oBook = oSelectedItem.getBindingContext("books").getObject();
        //         const oModel = this.getOwnerComponent().getModel();
    
        //         MessageBox.confirm(`Are you sure you want to delete book: ${oBook.Bookid}?`, {
        //             onClose: (oAction) => {
        //                 if (oAction === sap.m.MessageBox.Action.OK) {
        //                     oModel.remove(`/ztbooksSet(Bookid='${oBook.Bookid}')`, {
        //                         success: () => {
        //                             MessageBox.success("Book deleted successfully.");
        //                             this._loadBooksData();
        //                         },
        //                         error: () => {
        //                             MessageBox.error("Failed to delete book.");
        //                         }
        //                     });
        //                 }
        //             }
        //         });
        //     }



        }
    });
});
