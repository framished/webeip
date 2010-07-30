Ext.ux.TreeLoader = Ext.extend(Ext.tree.TreeLoader, {
    // override
    requestData: function(node, callback) {
        if (this.fireEvent("beforeload", this, node, callback) !== false) {
            var config = {
                method: this.requestMethod,
                url: this.dataUrl || this.url,
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: { callback: callback, node: node },
                params: this.getParams(node),
                headers: this.headers, // <!--
                jsonData: this.jsonData // <!--
            };
            this.transId = Ext.Ajax.request(config);

        } else {
            // if the load is cancelled, make sure we notify
            // the node that we are done
            if (typeof callback == "function") {
                callback();
            }
        }
    },
    root: '',
    // override        
    processResponse: function(response, node, callback) {
        var json = response.responseText;
        try {
            var co = [];  // <!--
            var o = eval("(" + json + ")");
            if (this.root != '')
                o = o[this.root];
            node.beginUpdate();
            for (var i = 0, len = o.length; i < len; i++) {
                var n = this.createNode(o[i]);
                if (n) {
                    node.appendChild(n);
                    co.push(n);  // <!-- 
                }
            }
            node.endUpdate();
            if (typeof callback == "function") {
                callback(this, node, co); // <!-- 
            }
        } catch (e) {
            this.handleFailure(response);
        }
    }
});