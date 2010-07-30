<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>首页</title>
    <link rel="stylesheet" type="text/css" href="../../Content/resources/css/ext-all.css"/> 
    <script type="text/javascript" src="../../Scripts/ext/adapter/ext/ext-base.js"></script> 
    <!-- ENDLIBS -->  
    <script type="text/javascript" src="../../Scripts/ext/ext-all-debug.js"></script> 
    <script type="text/javascript" src="../../Scripts/ext/ux/Ext.ux.TabCloseMenu.js"></script>
     <script type="text/javascript">
         
         Layout = function () {
             return {
                 LoadMenu: function () {
                     Ext.Ajax.request({
                         url: 'System/GetComponents',
                         method: 'POST',
                         success: function (response) {
                             var res = Ext.util.JSON.decode(response.responseText);
                             
                             var menus = res;
                             for (var i = 0; i < menus.length; i++) {

                                 var group = {
                                     title: menus[i].Name,
                                     groupId: menus[i].ID,
                                     useArrows: true,
                                     rootVisible: false,
                                     autoScroll: true,
                                     lines: true,
                                     border: false,
                                     xtype: 'treepanel',
                                    
                                     //			                tbar : [
                                     //							{
                                     //								xtype : 'treeFilter',
                                     //								tree : this,
                                     //								width : 150,
                                     //								emptyText : '搜索菜单'							
                                     //							}],

                                     root: new Ext.tree.AsyncTreeNode({
                                         id: menus[i].ID,
                                         text: 'aaa',
                                         children: menus[i].children

                                     })
                                 };
                                 Ext.getCmp('west-panel').add(new Ext.tree.TreePanel(group));
                             }
                             Ext.getCmp('west-panel').doLayout();
                             Ext.Msg.hide();
                         },
                         scope: this
                     })
                 },
                 Init: function () {
                     this.North = new Ext.Panel({
                         border: false,
                         layout: 'anchor',
                         region: 'north',
                         height: 60,
                         items: [
                        {
                            xtype: 'box',
                            border: false,
                            height: 32,
                            anchor: 'none -25'
                        }
                        ,
                         new Ext.Toolbar({
                             items: ['->',
                                 {
                                     xtype: 'textfield',
                                     fieldLabel: '搜索',
                                     width: 200,
                                     emptyText: 'Find a Class'

                                 }
                            ]
                         })
                        ]
                     })

                     this.South = new Ext.BoxComponent({
                         region: 'south',
                         el: 'south'
                     })


                     this.West = {
                         region: 'west',
                         id: 'west-panel', // see Ext.getCmp() below
                         title: '导航',
                         split: true,
                         width: 200,
                         minSize: 175,
                         maxSize: 400,
                         collapsible: true,
                         margins: '0 0 0 5',
                         layout: {
                             type: 'accordion',
                             animate: true
                         },
                         clickNode: function (node) {
                             //alert(node.attributes.TYPE);
                             if (node.attributes.CODE != null) {
                                 //alert(node.attributes.CODE);
                                 eval(node.attributes.CODE);
                             }
                         }
                     };

                     this.East = {
                         region: 'east',
                         id: 'east-panel',
                         title: '公告信息',
                         split: true,
                         width: 180,
                         minSize: 175,
                         maxSize: 400,
                         collapsible: true,
                         layoutConfig: {
                             animate: false
                         }
                     }

                     this.TabPanel = new Ext.TabPanel({
                         id: 'main-tab',
                         region: 'center',
                         enableTabScroll: true,
                         autoDestroy: true,
                         border: true,
                         layoutOnTabChange: true,
                         deferredRender: false,
                         defaults: {
                             autoScroll: false
                         },
                         plugins: new Ext.ux.TabCloseMenu(),
                         activeTab: 0,
                         items: [{
                             title: '首页',
                             closable: false
                         }]

                     })


                     var viewport = new Ext.Viewport({
                         layout: 'border',
                         items: [this.North, this.South, this.West, this.TabPanel, this.East]
                     });
                     
                 }
             }
         } ();



         Ext.onReady(function () {
             Ext.lib.Ajax.defaultPostHeader = 'application/json';
             Ext.Msg.wait('正在初始，请稍候...');
             Ext.QuickTips.init();
             Layout.Init();
             Layout.LoadMenu();
         });
    </script>
</head>
<body>
  <div id="west" class="x-hide-display"> 
     
  </div> 
  <div id="north" style="font-size:small"></div>
  <div id="main"></div>
  <div id="props-panel" style="width:200px;height:100%;overflow:hidden;"></div>
  <div id="south" style="text-align:center">
    WebFramework
  </div>
</body>
</html>
