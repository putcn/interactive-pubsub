(function($, Deferred) {
    var instances = {};
    var Event = function (params) {
        
    }
    var Receipt = function (params) {
        
    }
    var IPS = function () {
        var events = {};
        
        this.pub = function (subject, data) {
            var dfd = Deferred();
            return dfd.promise();
        }
        this.sub = function (subject, timing, callback, scope) {
            var receipt = new Receipt(arguments);
            return receipt;
        }
        this.unsub = function (receipt) {
            return true;
        }
    }
    $.ips = function (instanceId) {
        var instance = instances[instaceId];
        if(!instance){
            instances[instaceId] = instance = new IPS();
        }
        return instance;
    }
}(jQuery, jQuery.Deferred));