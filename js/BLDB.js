/*
	DB基本需求
 */
var db = null;
const DB_name = "BLDB";
const DB_ver = 2;
const DB_store = "tempForStore";
var data_count = 0;
var tempForStore;

/*
	紀錄資料來防止重複
 */
var dataNameRepeatCheck = [];
var dataPnRepeatCheck = [];

/*
	換頁傳值
 */
var getEditId;

var editToDelete = 0;

/*
	建立資料庫
 */
function openDB() {
    var request = window.indexedDB.open(DB_name, DB_ver);

    request.onerror = function(evt) {
        alert('DB connexion error : ' + evt.target.errorCode);
    };
    request.onsuccess = function(evt) {
        alert('DB connexion success');
        db = evt.target.result;
        var objectStore = db.transaction("tempForStore").objectStore("tempForStore");

        objectStore.openCursor().onsuccess = function(evt) {
            var cursor = evt.target.result;

            if (cursor) {
                data_count = cursor.value.id;
                dataNameRepeatCheck[data_count - 1] = cursor.value.name;
                dataPnRepeatCheck[data_count - 1] = cursor.value.pN;
                document.getElementById("addInBlackList").innerHTML += "<div id='" + data_count + "' onclick='javascript:location.href=\"#editPage\";tempForStoreVar(" + data_count + ");'>" + cursor.value.name + "    " + cursor.value.pN + "<br></div>";
                cursor.continue();
            }
        };
    };
    /*
		資料庫第一次建置
	 */
    request.onupgradeneeded = function(evt) {
        var db = evt.currentTarget.result;
        var objectStore = db.createObjectStore(DB_store, {
            keyPath: "id"
        });

        objectStore.createIndex("name", "name", {
            unique: false
        });
        objectStore.createIndex("pN", "pN", {
            unique: false
        });

    }
}

/*
	獲取輸入資料
 */
function getFromFieldUser() {
    addingData(document.getElementById("targetContactsName").value, document.getElementById("targetContactsPhone").value);
    editToDelete = 0;
}

function getFromFieldEdit() {
    addingData(document.getElementById("editTargetName").value, document.getElementById("editTargetPhone").value);
    if (editToDelete == 1) {
        dataDelete();
        editToDelete = 0;
        location.href = '#addBlackList';
    }
}

/*
	加入資料到DB裡面
 */
function addingData(Nname, Nphone) {
    var objectStore = getObjectStore(DB_store, "readwrite");

    /* if-else防止使用輸入空資料 */
    if (Nname != "" && Nphone != "") {
        if (userAddIn(Nname, Nphone)) {
            for (var i in tempForStore) {
                var request = objectStore.add(tempForStore[i]);
                request.onsuccess = function(evt) {
                    alert('Adding success');
                }
            }

            /* 展示已儲存資料 */
            db.transaction("tempForStore").objectStore("tempForStore").get(data_count).onsuccess = function(evt) {
                document.getElementById("addInBlackList").innerHTML += "<div id='" + data_count + "' onclick='javascript:location.href=\"#editPage\";tempForStoreVar(" + data_count + ")'>" + dataNameRepeatCheck[data_count - 1] + "    " + dataPnRepeatCheck[data_count - 1] + "<br></div>";
            };
            editToDelete = 1;
        } else {
            alert("The phone number repeat.");
        }
    } else {
        alert("Please fill all the field.");
    }
}

function getObjectStore(DB_store, mode) {
    var tx = db.transaction(DB_store, mode);
    return tx.objectStore(DB_store);
}

/*
	資料加入DB，防止重複
 */
function userAddIn(Nname, Nphone) {
    var notStore = 0;
    for (var j = 0; j < data_count; j++) {
        if (Nphone == dataPnRepeatCheck[j]) {
            notStore = 1;
            break;
        }
    }
    if (notStore != 1) {
        dataNameRepeatCheck[data_count] = Nname;
        dataPnRepeatCheck[data_count] = Nphone;
        data_count = data_count + 1;
        tempForStore = [{
            id: data_count,
            name: Nname,
            pN: Nphone
        }];

        notStore = 0;
        return true;
    } else {
        return false;
    }
}

/*
	換頁傳值
 */
function tempForStoreVar(data_count) {
    getEditId = data_count;
    document.getElementById("editTargetName").value = dataNameRepeatCheck[getEditId - 1];
    document.getElementById("editTargetPhone").value = dataPnRepeatCheck[getEditId - 1];
}

/*
	是否刪除資料
 */
function deleteYN() {
    var r = confirm("Delete or not?");
    if (r) {
        dataDelete();
        location.href = '#addBlackList';
    }
}

/*
 刪除資料
 */
function dataDelete() {
    var deleteRequest = db.transaction(DB_store, "readwrite").objectStore("tempForStore").delete(getEditId);
    deleteRequest.onsuccess = function(evt) {
        console.log("The data delete complete.");
    };
    dataNameRepeatCheck[getEditId - 1] = "";
    dataPnRepeatCheck[getEditId - 1] = "";
    $("#" + getEditId).remove();
}
