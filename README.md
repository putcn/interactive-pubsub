# interactive-pubsub
PubSub is dinosaur (yes, I mean giant and old) system developer's good friend, but not perfect. The bad part: it's one-way, in most of the case.

A typical case is: User wants to nav away from current view, but he has some important form left dirty, UI need to prompt him about it. Or even worse, the form data need to be verified by server before the user can nav away(this is bad interaction design though)

Usually you wouldn't keep a reference between Nav and a arbitrary form.

Without interactive-pubsub, you might need to set a global flag about if nav can happen or not. Nav component need to check if the flag exists, and...(this is really a mess, can't make this up no more, not to mention the asynch checking)

With interactive-pubsub, it's as simple as:

```javascript
//in nav component
ips.pub("viewSwitch", data)
    .then(function(){
        //some code to switch the view
    }, function(){
        //tell user why view is not switched
    })

//in the form component
ips.sub("viewSwitch", "before", function(data, deferred){
    this.
    return deferred.promise();
}, this);
```
