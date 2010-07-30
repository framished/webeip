ComboBoxCheckTree = function(){
    this.treeId = Ext.id()+'-tree';
	this.maxHeight = arguments[0].maxHeight || arguments[0].height || this.maxHeight;
	this.tpl = new Ext.Template('<tpl for="."><div style="height:'+this.maxHeight+'px"><div id="'+this.treeId+'"></div></div></tpl>');
	this.store = new Ext.data.SimpleStore({fields:[],data:[[]]});
	this.selectedClass = '';
	this.mode = 'local';
	this.triggerAction = 'all';
	this.onSelect = Ext.emptyFn;
	this.editable = false;
	this.hiddenId = arguments[0].hiddenId;

	ComboBoxCheckTree.superclass.constructor.apply(this, arguments);
}

Ext.extend(ComboBoxCheckTree,Ext.form.ComboBox, {
	expand : function(){
		ComboBoxCheckTree.superclass.expand.call(this);
		if(!this.tree.rendered){
			//创建树
			this.tree.height = this.maxHeight;
			this.tree.border=false;
			this.tree.autoScroll=true;
	        if(this.tree.xtype){
				this.tree = Ext.ComponentMgr.create(this.tree, this.tree.xtype);
			}
			this.tree.render(this.treeId);
	        var combox = this;
			this.tree.on('checkchange', function(node, checked) { 
                node.expand();   
                node.attributes.checked = checked;   
                node.eachChild(function(child) {   
                    child.ui.toggleCheck(checked);   
                    child.attributes.checked = checked;   
                    child.fireEvent('checkchange', child, checked);   
                });
				var checkedNodes = node.ownerTree.getChecked();
				var ids = "";
				var texts = "";
				if (checkedNodes.length>0)
				{
					for (var i=0;i<checkedNodes.length;i++)
					{
						var node1 = checkedNodes[i];
						ids = ids + node1.id+",";
					    texts = texts + node1.text+",";
					}
				}
				combox.setValue({id:ids,text:texts});
				Ext.get(combox.hiddenId).dom.value =ids;
            }, this.tree); 
            this.tree.on('click',function(node){
            	if(node.leaf == true){
	            	combox.setValue({id:node.id,text:node.text});
	            	/**
	            	 * 关闭下拉层 
	            	 * add by bing on 2009-08-04
	            	 */
	            	combox.collapse();
            	}
            },this.tree);
			var root = this.tree.getRootNode();
            root.expand();
		}
    },
    
	setValue : function(node){
		var combox = this;
		if (typeof node == 'string')
		{
			node = new Ext.tree.TreeNode({id:0,text:node});
		}
		var text = node.text;
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.value = node.id;
        }
        ComboBoxCheckTree.superclass.setValue.call(this,text);
		this.value = node.id;
		Ext.get(combox.hiddenId).dom.value =node.id;
    },
    
    getValue : function(){
    	return typeof this.value != 'undefined' ? this.value : '';
    }

});

Ext.reg('combochecktree', ComboBoxCheckTree);

