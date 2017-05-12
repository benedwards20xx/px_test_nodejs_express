// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

const dbName = "test_puzzle_db";

var request = window.indexedDB.open(dbName, 2);

const puzData = [
  { puzzle: [[1]] },
  { 
    puzzle: [
      [1,0],
      [0,1]
    ]
  }
];

request.onerror = function(event) {
  // handle errors
  // alert("Alert, indexedDB not supported");
};
// request.onsuccess = function(event) {
//   db = event.target.result;
// };

request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create another object store called "names" with the autoIncrement flag set as true.    
  var objStore = db.createObjectStore("puzzles", { autoIncrement : true });

  // Because the "names" object store has the key generator, the key for the name value is generated automatically.
  // The added records would be like:
  // key : 1 => value : "Bill"
  // key : 2 => value : "Donna"
  for (var i in puzData) {
      objStore.add(puzData[i].puzzle);
  }
};