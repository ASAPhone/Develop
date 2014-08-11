/**
 * This is a JS file reserved whole conditions to be used. Setting API needed
 * certified right is allowed to be used. Call the functions for using.
 */

// ---------------Audio series Beginning line---------------//
/*
 * Setting device main audio. Including content, notification,DTMF Range from 0
 * to 15.
 */

function set_DeviceMainSound(Sound_value) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'audio.volume.content' : Sound_value,
		'audio.volume.notification' : Sound_value
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device content sound volume.
 */

function set_DeviceContentSound(CTSound_value) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'audio.volume.content' : CTSound_value
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device notification sound volume.
 */

function set_DeviceNotificationSound(NTSound_value) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'audio.volume.notification' : NTSound_value
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device DTMF sound volume.
 */

function set_DeviceDTMFSound(DTMFSound_value) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'audio.volume.dtmf' : DTMFSound_value
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device telephone sound volume.(Range 0~5)
 */

function set_DeviceTelephonySound(TPSound_value) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'audio.volume.telephony' : TPSound_value
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device keyboard click sound. (True or False)
 */

function set_DeviceKeyboardSound(KBSound_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'keyboard.clicksound' : KBSound_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device alarm sound.
 */

function set_DeviceAlarmSound(ALSound_value) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'audio.volume.alarm' : ALSound_value
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device unlock-screen sound.(True or False)
 */

function set_DeviceLockscreenSound(LSSound_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'lockscreen.unlock-sound.enabled' : LSSound_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device mail-sent sound.(True or False)
 */

function set_DeviceMailSentSound(MSSound_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'mail.sent-sound.enabled' : MSSound_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device message-sent sound.(True or False)
 */

function set_DeviceMessageSentSound(MeSSound_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'mail.sent-sound.enabled' : MeSSound_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

// ---------------Audio series Ending line---------------//

// -------------Screen series Beginning line-------------//

/*
 * Setting device Screen brightness.(0~1)
 */

function set_DeviceScreenBrightness(Bright_Value) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'screen.brightness' : Bright_Value
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};

}

/*
 * Setting device Screen brightness Auto mode.(true/false)
 */

function set_DeviceScreenBrightnessAuto(Bright_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'screen.automatic-brightness' : Bright_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};

}

// -------------Screen series Ending line-------------//

// -------------Bluetooth series Beginning line-------------//

/*
 * Setting device Bluetooth switch.(true/false)
 */

function set_DeviceBluetooth(BT_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'bluetooth.enabled' : BT_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};

}

// -------------Bluetooth series Ending line-------------//

// -------------Wifi series Beginning line-------------//

/*
 * Setting device Wifi switch.(true/false)
 */

function set_DeviceWifi(WIFI_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'wifi.enabled' : WIFI_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};

}

// -------------wifi series Ending line-------------//

// -------------WAP series Beginning line-------------//

/*
 * Setting device WAP switch.(true/false)
 */

function set_DeviceWap(Wap_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'ril.data.enabled' : Wap_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};

}

// -------------WAP series Ending line-------------//

// -------------Geolocation series Beginning line-------------//

/*
 * Setting device GPS switch.(true/false)
 */

function set_DeviceGPS(GPS_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'geolocation.enabled' : GPS_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

// -------------Geolocation series Ending line-------------//

// -------------Time series Beginning line-------------//

/*
 * Setting device time.(Date Object)
 */

function set_DeviceTime(OBtime) {
	Navigatorr.mozTime.set(OBtime);
}

// -------------Time series Ending line-------------//

// -------------Vibration series Beginning line-------------//

/*
 * Setting device vibration switch.(true/false)
 */

function set_DeviceVibration(DV_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'vibration.enabled' : DV_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

/*
 * Setting device vibration.(constant time, interval time, isInterval
 * switch(bool)) Remember to call stop function to stop vibration.
 */

var vibrateInterval = null;
function startVibrate(duration) {
	navigator.vibrate(duration);
}

// 持續時間 間隔 是否重複
function set_DeviceVibrationMov(Ctime, interval, isInterval) {
	navigator.vibrate = navigator.vibrate || navigator.webkitVibrate
			|| navigator.mozVibrate || navigator.msVibrate;

	if (navigator.vibrate) {
		if (isInterval) {
			vibrateInterval = setInterval(function() {
				startVibrate(Ctime);
			}, Ctime + interval);
		} else {
			startVibrate(Ctime);
		}
	} else {
		alert("Sorry your browers is not surpport vibration API");
	}
}

/*
 * Setting device vibration stop.(called)
 */

function set_DeviceStopVibrate() {
	if (vibrateInterval)
		clearInterval(vibrateInterval);
	navigator.vibrate(0);
}

// -------------Vibration series Ending line-------------//

// -------------Device power series Beginning line-------------//

/*
 * Setting device power save mode.
 */

function set_DevicePowerSaving(PS_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'powersave.enabled' : PS_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

// -------------Device power series Ending line-------------//

// -------------Device phone call series Beginning line-------------//

/*
 * Setting device phone call ring or not.
 */

function Set_DevicePhoneCallLimited(PCL_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'ring.enabled' : PCL_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

// -------------Device phone call series Ending line-------------//

// -------------Device Camera series Beginning line-------------//

/*
 * Setting device camera switch.
 */

function Set_DeviceCamera(CM_bool) {
	var lock = Navigator.mozSettings.createLock();
	var result = lock.set({
		'camera.shutter.enabled' : CM_bool
	});

	result.onsuccess = function() {
		console.log("the settings has been changed");
	};

	result.onerror = function() {
		console.log("An error occure, the settings remain unchanged");
	};
}

// -------------Device Camera series series Ending line-------------//
