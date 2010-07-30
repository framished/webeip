Ext.ns('Ext.ux.grid');
Ext.ux.grid.CRUDGrid = Ext.extend(Ext.grid.GridPanel, {
    onAdd: Ext.emptyFn,
    onEdit: Ext.emptyFn,
    onDelete: Ext.emptyFn,
    closable: true,
    pageSize: 10,
    sm: new Ext.grid.CheckboxSelectionModel(),
    
    initComponent: function() {        
        this.bbar = WF.Util.GetPagingToolbar(this.pageSize, this.store)
        this.tbar = new Ext.Toolbar([{
            text: '添加',
            iconCls: Ext.ux.iconMgr.getIcon('application_add'),
            handler: this.onAdd,
            scope: this
        }, {
            text: '修改',
            iconCls: Ext.ux.iconMgr.getIcon('application_edit'),
            handler: this.onEdit,
            scope: this
        }, {
            text: '删除',
            iconCls: Ext.ux.iconMgr.getIcon('application_delete'),
            handler: this.onDelete,
            scope: this
}]);
        this.addEvents('add', 'edit', 'delete');
        Ext.ux.grid.CRUDGrid.superclass.initComponent.call(this);
    }
    
    })