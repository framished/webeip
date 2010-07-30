Ext.ux.GridSelection = Ext.extend(Ext.form.TriggerField, {
id: Ext.id(),
    valueField: '',
    displayField: '',
    dataUrl: '',
    layout: 'column',
    width: 400,
    height: 300,   
    initComponent: function() {
        Ext.ux.GridSelection.superclass.initComponent.call(this);
        //        var sourceGridPanel = {
        //            xtype: 'grid',
        //            store: WF.Util.GetJsonStore(this.dataUrl, {
        //                sortInfo: {
        //                    field: this.displayField,
        //                    direction: 'ASC'
        //                },
        //                fields: [
        //		           { name: 'ID', mapping: this.valueField },
        //		           { name: 'NAME', mapping: this.displayField }
        //		        ]
        //            }),
        //            columns: [new Ext.grid.CheckboxSelectionModel(), new Ext.grid.RowNumberer(),
        //		            { header: 'id', hidden: true, dataIndex: 'ID' },
        //		            { header: '名称', dataIndex: 'NAME', sortable: true }
        //		        ]
        //        };
        //        this.items = [{
        //            columnWidth: .5,
        //            items:sourceGridPanel
        //        }];
    }
});

Ext.reg('gridselection', Ext.ux.GridSelection);