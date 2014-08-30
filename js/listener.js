/*
    listener.js
    放置需要及時知道的資訊的監看式，同時也是背景執行時的function
 */

/*
    監看電池資訊
 */
var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

function chargingChangeListener() {
    if (battery.charging) {
        setPowerSaving(false);
    }
    console.warn("Battery charge: " + battery.charging);
    alert("Battery charge: " + battery.charging);
}

function levelChangeListener() {
    if (!battery.charging) {
        if (battery.level < 0.15) {
            alert("Battery level is less than 15%, turn on power save.");
            setPowerSaving(true);
        }
    }
    console.warn("Battery level: " + battery.level);
}

function batteryEventListener(check) {
    if (check) {
        battery.addEventListener("chargingchange", chargingChangeListener, false);
        battery.addEventListener("levelchange", levelChangeListener, false);
    } else {
        battery.removeEventListener("chargingchange", chargingChangeListener, false);
        battery.removeEventListener("levelchange", levelChangeListener, false);
    }
}

/*
    location and time zone simultaneously detect
    and change the settings of the phone

    HOW TO GET CURRENT POSITION DATA:

    get latitude:
        localStorage.getItem("CURRENT_LATITUDE");

        longitude:
        localStorage.getItem("CURRENT_LONGITUDE");

        time zone id:
        localStorage.getItem("CURRENT_ZONE");

 */
function locationEventListener() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                //store latitude and longitude to localStorage
                if (typeof(Storage) != "undefined") {
                    localStorage.setItem("CURRENT_LATITUDE", lat);
                    localStorage.setItem("CURRENT_LONGITUDE", lng);
                } else {
                    console.log("Not support web storage");
                    alert("Not support web storage.");
                }

                //detect current time zone and change time or do nothing
                var timestamp = new Date().getTime() / 1000;
                var google_time_zone_key = "AIzaSyBp37T05asGoDR1Yxfs4NQ3GrvQqSBD0Os";
                var google_time_zone_api = "https://maps.googleapis.com/maps/api/timezone/json";
                var timeZoneSrc = google_time_zone_api + "?location=" + lat + "," + lng + "&timestamp=" + timestamp + "&key=" + google_time_zone_key;

                //access google time zone data
                $.getJSON(timeZoneSrc, function(data) {
                    var localZoneId = localStorage.getItem("CURRENT_ZONE");
                    //first time to detect current time zone
                    if ((localZoneId == undefined) || (localZoneId == null)) {
                        localStorage.setItem("CURRENT_ZONE", data.timeZoneId);
                        var localHoursPlus = (data.dstOffset / 3600) + (data.rawOffset / 3600);
                        setDeviceTime(localHoursPlus);
                    } else if (localZoneId != data.timeZoneId) {
                        localStorage.setItem("CURRENT_ZONE", data.timeZoneId);
                        var localHoursPlus = (data.dstOffset / 3600) + (data.rawOffset / 3600);
                        setDeviceTime(localHoursPlus);
                    }
                });
            },
            function(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("An unknown error occurred.");
                        break;
                }
            }, {
                enableHighAccuracy: true,
                timeout: Infinity,
                maximumAge: 0
            });
    } else {
        alert("Not support geolocation");
    }
}

var phone = window.navigator.mozTelephony;

function phoneEventListener(check) {
    if (check) {
        phone.addEventListener("onincoming", phoneCallLimit, false);
    } else {
        phone.removeEventListener("onincoming", phoneCallLimit, false);
    }
}

function phoneCallLimit() {
    var phoneNum = phone.number;
    phone.onincoming = function() {
        var transaction = dbBlackList.transaction([DB_STORE_NAME], "readonly");
        var readDataStore = transaction.objectStore(DB_STORE_NAME);
        readDataStore.openCursor().onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
                var blph = cursor.value.phoneNum;
                if (blph == phoneNum)
                    phone.hangUp();
                cursor.continue();
            }
        };
    }
}
