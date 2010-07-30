﻿Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){
        tabs = tp;
        tabs.on('contextmenu', onContextMenu);
    }

    function onContextMenu(ts, item, e){
        if(!menu){ // create context menu on first right click
            menu = new Ext.menu.Menu([{
                id: tabs.id + '-close',
                text: '关闭',
                disabled : !item.closable,
                handler : function(){
                    tabs.remove(ctxItem);
					ts.doLayout()
                }
            },{
                id: tabs.id + '-close-others',
                text: '关闭其他页',
                handler : function(){
                    tabs.items.each(function(item){
                        if(item.closable && item != ctxItem){
                            tabs.remove(item);
							ts.doLayout()
                        }
                    });
                }
            }]);
        }
       
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(tabs.items.length == 1);	
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if(this != item && this.closable){
                disableOthers = false;
                return false;
            }
        });	
			
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(e.getPoint());
    }
}; 