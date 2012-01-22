
var storageName = "testValue";
function resetStorage() {
    window.localStorage[storageName] = undefined;
}
beforeEach(resetStorage);
//afterEach(resetStorage);
beforeEach(function() {
    this.addMatchers({ 
        "toEqualJson": function(actual){
            return JSON.stringify(actual) === this.actual;
        }
    });
});

function storedValue() {
    return window.localStorage[storageName];
}

describe("PersistantArray",function() {
    var theArray = new PersistentArray(storageName);
    beforeEach(function() {
        theArray = new PersistentArray(storageName);
    });
    it("saves value when item pushed", function() {
        theArray.push("gloomy");
        expect(storedValue()).toEqualJson(theArray);
    });

    it("saves value when item is un-shifted", function() {
       theArray.unshift("harry");
        expect(storedValue()).toEqualJson(theArray);
    });

    it("saves value when item is shifted", function() {
        theArray.unshift("an item", "another item");
        theArray.shift();
        expect(storedValue()).toEqualJson(theArray);
    });

    it("saves value when item is popped", function() {
       theArray.push("one");
       theArray.pop();
        expect(storedValue()).toEqualJson(theArray);
    });


    it("should mimic an array", function() {
        theArray.push("two");
        theArray.push("one");
        expect(theArray.values).toEqual(["two", "one"]);
        expect(theArray.pop()).toEqual("one");
        expect(theArray.values).toEqual(["two"]);
        theArray.unshift("one");
        expect(theArray.values).toEqual(["one", "two"]);
        expect(theArray.shift()).toEqual("one");
        expect(theArray.values).toEqual(["two"]);
    });
});
