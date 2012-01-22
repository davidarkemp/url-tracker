

function PersistentArray(name) {
    this.internal = [];
    var self = this;
    var wrappedFunctions = [ "push", "pop", "shift", "unshift" ];

    wrappedFunctions.forEach(function(functionName) {
        self[functionName] = function() {
            var result = self.internal[functionName].apply(self.internal, arguments);
            self.save();
            return result;
        };
    });

    this.name = name;
}

PersistentArray.prototype.__defineGetter__("values", function() {
   return this.internal;
});

//noinspection JSUnusedGlobalSymbols
PersistentArray.prototype.toJSON = function() {
    return this.internal;
};

PersistentArray.prototype.save = function() {
    window.localStorage[this.name] = JSON.stringify(this);
};
