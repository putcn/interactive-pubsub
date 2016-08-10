(function($, Deferred) {
    var instances = {};
    
    var IPS = function () {
        var events = {};

        this.pub = function (subject, data) {
            var promises = [];
            var eventRepo = events[subject];
            var promiseToReturn;
            if(!eventRepo){
                var dfd = Deferred();
                dfd.resolve();
                promiseToReturn = dfd.promise();
            }else{
                eventRepo.before.forEach(function (subscriber) {
                    var promise = subscriber.callback.apply(subscriber.scope, [data]);
                    promises.push(promise);
                })
            }
            promiseToReturn = $.when(promises);
            setTimeout(function (params) {
                promiseToReturn.then(function (params) {
                    eventRepo.after.forEach(function (subscriber) {
                        subscriber.callback.apply(subscriber.scope || window, [data]);
                    })
                })
            }, 0)
            return promiseToReturn;
        }
        this.sub = function (subject, timing, callback, scope) {
            var receipt = {
                subject: subject,
                timing: timing,
                callback: callback,
                scope: scope
            };
            if(!events[subject]){
                events[subject] = {
                    before: [],
                    after: []
                };
            }
            var subscriptions = events[subject][timing];
            subscriptions.push(receipt);
            return receipt;
        }
        this.unsub = function (receipt) {
            //TODO
            return true;
        }
    }
    $.ips = function (instanceId) {
        if(!instanceId){
            if(!defaultInstance){
                defaultInstance = new IPS();
            }
            return defaultInstance;
        }
        var instance = instances[instaceId];
        if(!instance){
            instances[instaceId] = instance = new IPS();
        }
        return instance;
    }
}(jQuery, jQuery.Deferred));