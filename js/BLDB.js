var db = null;
const DB_name = "BLDB";
const DB_ver = 2;
const DB_store = "tempForStore";

var data_count = 0;
var tempForStore;

var dataRepeatCheck = [];


/*
	建立資料庫
 */
function openDB() {
	var request = window.indexedDB.open(DB_name,DB_ver);

	request.onerror = function(evt) {
		alert('DB connexion error : ' + evt.target.errorCode);
	};
	request.onsuccess = function (evt) {
		alert('DB connexion success');
		db = evt.target.result;
		var objectStore = db.transaction("tempForStore").objectStore("tempForStore");

		objectStore.openCursor().onsuccess = function(evt) {
  			var cursor = evt.target.result;
			
  			if (cursor) {
				data_count = cursor.value.id;
				dataRepeatCheck[data_count - 1] = cursor.value.pN;
				document.getElementById("addInBlackList").innerHTML += "<input type='button' id='" + data_count + "' onclick='deleteYN(" + data_count + ")' value = '" + cursor.value.name + "    " + cursor.value.pN + "'>";
				cursor.continue();
			}
		};
	};

	request.onupgradeneeded = function(evt) {
		var db = evt.currentTarget.result;
		var objectStore = db.createObjectStore(DB_store, { keyPath: "id"});

		objectStore.createIndex("name", "name", { unique: false });
		objectStore.createIndex("pN", "pN", { unique: false });
	
	}
}
/*
	加入資料到DB裡面
 */
function addingData(){
	var objectStore = getObjectStore(DB_store, "readwrite");

	/* if-else防止使用輸入空資料 */
	if(document.getElementById("targetContactsName").value!="" && document.getElementById("targetContactsPhone").value!=""){
		if(userAddIn()){
			for (var i in tempForStore) {
                		var request = objectStore.add(tempForStore[i]);
                		request.onsuccess = function (evt) {
                    			alert('Adding success');
                		}
       			}
			
			/* 展示已儲存資料 */
			db.transaction("tempForStore").objectStore("tempForStore").get(data_count).onsuccess = function(evt) {
			document.getElementById("addInBlackList").innerHTML += "<input type='button' id='" + data_count + "' onclick='deleteYN(" + data_count + ")' value = '" + evt.target.result.name + "    " + evt.target.result.pN + "'>";
			};
		}
		else{
			alert("The phone number repeat.");
		}
	}
	else {
		alert("Please fill all the field.");
	}
}
function getObjectStore(DB_store, mode) {
            var tx = db.transaction(DB_store, mode);
            return tx.objectStore(DB_store);
}
/*
	自行輸入資料加入DB，防止重複
 */
function userAddIn() {
	var notStore = 0;
	
	for(var j = 0;j < data_count;j++){
		if(document.getElementById("targetContactsPhone").value == dataRepeatCheck[j]){
			notStore = 1;
			break;
		}
	}
	if(notStore != 1){
		dataRepeatCheck[data_count] = document.getElementById("targetContactsPhone").value;
		data_count = data_count + 1;
		tempForStore = [ { 	id: data_count,
					name: document.getElementById("targetContactsName").value,
					pN: document.getElementById("targetContactsPhone").value
				}
			];
		
		notStore = 0;
		return true;
	}
	else {
		return false;
	}
}
function deleteYN(data_count) {
	var r = confirm("Delete or not?");
	if (r) {
		var deleteRequest = db.transaction(DB_store, "readwrite").objectStore("tempForStore").delete(data_count);
			deleteRequest.onsuccess = function(evt) {
				alert("The data delete complete.");
			};
		dataRepeatCheck[data_count - 1] = "";
		$("#"+data_count).remove();
	}
}