function loadJSON(callback) {   

var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', './abi/TimeCapsule.json', false);
xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
};
xobj.send(null);  
}

//Load ABI
let contract;
loadJSON( function(response) {
    // Parse JSON string into object
    contract = JSON.parse(response);
 });

export default contract;
