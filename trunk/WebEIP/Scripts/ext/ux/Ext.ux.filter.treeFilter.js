Ext.namespace('Ext.ux.filter');
/**
 *  Ext.ux.filter.treeFilter.Class Extension Class for Ext 2.x Library
 * @copyright (c) 2009, by mohen
 * @author  mohen
 * @version extend  ExtJs 2.1 2009-2-26 下午01:15:49
 * @class Ext.ux.filter.treeFilter
 * @extends Ext.
 * @param {Object} config The configuration options
 */
Ext.ux.filter.treeFilter =Ext.extend(Ext.form.TwinTriggerField, {
	tree:null,
	enableKeyEvents : true,
    border:false 
    ,trigger1Class:'x-form-clear-trigger'
	,trigger2Class:'x-hidden'     
	,initComponent:function(){
		var tree=this.tree;
		var root=tree.root;
		var hiddenPkgs = [];
		var filter = new Ext.tree.TreeFilter(tree, {
				clearBlank: true,
				autoClear: true
			});	
		var filterTree=function(text){    	
    	Ext.each(hiddenPkgs, function(n){
					n.ui.show();
				});
				if(!text||text.length==0){
					filter.clear();
					return;
				}
				
				tree.expand(true);				
				var regstrs = text.replace(/,+/igm,"|");				
				var re = new RegExp(regstrs, 'i');				
				filter.filterBy(function(n){					
					return !n.attributes.leaf || re.test(n.attributes.text);
				});			
				hiddenPkgs = [];
				root.cascade(function(n){
					if(!n.attributes.leaf && n.ui.ctNode.offsetHeight < 3){
						n.ui.hide();
						hiddenPkgs.push(n);
					}
				});
    }
		this.onTrigger1Click=function(){
//			filter.clear();
			if(this.getValue()) {
					this.setValue('');
				 this.triggerBlur();
					var v=this.getValue();
					filterTree(v);
				}
		}
		this.on('keyup', function(){
				var v=this.getValue();
					filterTree(v);			
		}, this, {buffer: 350});
		Ext.ux.filter.treeFilter.superclass.initComponent.apply(this, arguments);		
	// after parent code here, e.g. install event handlers 
    } 
        ,afterRender:function(){   
    	Ext.ux.filter.treeFilter.superclass.afterRender.apply(this, arguments);		
    	
//    	 	console.log(this.wrap.id+ this.width);
    	this.wrap.setStyle('width', (this.width+40)+"px");
    }
}); // eo extend
// register xtype
Ext.reg('treeFilter', Ext.ux.filter.treeFilter);
// eof