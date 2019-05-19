// all in one script für die Integration eines Alexa device zur Steuerung mit der Homematic CCU
//
var DEVICE_ORT, DEVICE_ID, DEVICE_INSTANCE, DEVICE, CLEAN_TIME, DEVICE_MULTIROOM, Multiroom_ID, PLAYLIST;


DEVICE_ID        = 'G0xxxxxxxxxxW';//<-<-<-<-<-<-<- hier die Echo device ID eintragen
DEVICE_INSTANCE  = 0;//<-<-<-<-<-<-<- hier die Alexa2 Instanz Nummer eintragen
DEVICE           = ('alexa2.' + DEVICE_INSTANCE + '.Echo-Devices.' + DEVICE_ID);
Multiroom_ID     = '34XXXXXXXXXXXXXXXXXXXXX5b';//<-<-<-<-<-<-<- hier die Multiroom device ID eintragen
DEVICE_MULTIROOM = ('alexa2.' + DEVICE_INSTANCE + '.Echo-Devices.' + Multiroom_ID);
DEVICE_ORT       = getState(DEVICE + '.Info.name').val;
CLEAN_TIME       = 7200000;/*2 Stunden*/
PLAYLIST         = 'meine Liste';//<-<-<-<-<-<-<- hier deine Amazon Music Playlist eintragen


//#### HM SYS VAR ########
var CCU_VAR_SENDER, CCU_VAR_SENDER_INFO, CCU_VAR_NEXT_PREV, CCU_VAR_providerName, CCU_VAR_REPEAT, CCU_VAR_SHUFFLE, CCU_VAR_PROGRESS, CCU_VAR_STATUS, CCU_VAR_ONLINE, CCU_VAR_STATE, CCU_VAR_SENDER_LOGO, CCU_VAR_VOLUME, CCU_VAR_PICTURE;

//Hier die Systemvariablen einfügen Namierung steht hinter den Variablen, das XXX mit dem Ort ersetzen.
CCU_VAR_SENDER_INFO     = "hm-rega.0.12345"/*ALEXA_XXX_SENDER_INFO -> Zeichenkette*/;
CCU_VAR_SENDER          = "hm-rega.0.12345"/*ALEXA_XXX_SENDER -> Zeichenkette*/;
CCU_VAR_NEXT_PREV       = "hm-rega.0.12345"/*ALEXA_XXX_NEXT/PREV -> Logikwert (true/false)*/;
CCU_VAR_providerName    = "hm-rega.0.12345"/*ALEXA_XXX_providerName -> Zeichenkette*/;
CCU_VAR_REPEAT          = "hm-rega.0.12345"/*ALEXA_XXX_REPEAT -> Logikwert (true/false)*/;
CCU_VAR_SHUFFLE         = "hm-rega.0.12345"/*ALEXA_XXX_SHUFFLE -> Logikwert (true/false)*/;
CCU_VAR_PROGRESS        = "hm-rega.0.12345"/*ALEXA_XXX_PROGRESS -> Zahl (Minimalwert:0 / Maximalwert:100)*/;
CCU_VAR_STATUS          = "hm-rega.0.12345"/*ALEXA_XXX_STATUS -> Werteliste (AUS;PLAYING;PAUSE)*/;
CCU_VAR_ONLINE          = "hm-rega.0.12345"/*ALEXA_XXX_ONLINE -> Logikwert (online/offline)*/; 
CCU_VAR_STATE           = "hm-rega.0.12345"/*ALEXA_XXX_STATE -> Logikwert (true/false)*/;
CCU_VAR_SENDER_LOGO     = "hm-rega.0.12345"/*ALEXA_XXX_SENDER_LOGO -> Zeichenkette*/; 
CCU_VAR_VOLUME          = "hm-rega.0.12345"/*ALEXA_XXX_VOLUME -> Zahl (Minimalwert:0 / Maximalwert:100)*/;
CCU_VAR_PICTURE          = "hm-rega.0.12345"/*ALEXA_XXX_PICTURE -> Zeichenkette*/;
//CCU_VAR_                = '';


//#### HM DEVICE ######### 
var CCU_DEV_CUXD, CUXD_INSTANZ, CCU_DEV_Next_Previous, CCU_DEV_MUTE, CCU_DEV_PLAY_PAUSE, CCU_DEV_Radiostation, CCU_DEV_Repeat_Shuffle, CCU_DEV_SAW_Party, CCU_DEV_Lounge_FM, CCU_DEV_FFH_Lounge,CCU_DEV_89_0, CCU_DEV_JUMP, CCU_DEV_Tropical, CCU_DEV_Merengue, CCU_DEV_Salsa; 

CCU_DEV_CUXD            = 'CUX4000033';//<-<-<-<-<-<-<- hier die CUXD device ID eintragen
CUXD_INSTANZ             = 1;//<-<-<-<-<-<-<- hier die CUXD Adapter Instanz eintragen (bsp.: hm-rpc.1 = 1)

CCU_DEV_Next_Previous   = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".2"/*ECHO_DOT_xx:Next/Previous*/;
CCU_DEV_MUTE            = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".4"/*ECHO_DOT_xx:MUTE*/;
CCU_DEV_PLAY_PAUSE      = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".1"/*ECHO_DOT_xx:PLAY/PAUSE*/;
CCU_DEV_Radiostation    = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".5"/*ECHO_DOT_xx:Default Radiostation an/aus*/;
CCU_DEV_Repeat_Shuffle  = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".15"/*ECHO_DOT_xx:Repeat/Shuffle*/;
CCU_DEV_Sender_1 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".7"/*ECHO_DOT_xx:Sender_1*/;
CCU_DEV_Sender_2 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".8"/*ECHO_DOT_xx:Sender_2*/;
CCU_DEV_Sender_3 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".9"/*ECHO_DOT_xx:Sender_3*/;
CCU_DEV_Sender_4 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".10"/*ECHO_DOT_xx:Sender_4*/;
CCU_DEV_Sender_5 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".11"/*ECHO_DOT_xx:Sender_5*/;
CCU_DEV_Sender_6 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".12"/*ECHO_DOT_xx:Sender_6*/;
CCU_DEV_Sender_7 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".13"/*ECHO_DOT_xx:Sender_7*/;
CCU_DEV_Sender_8 = "hm-rpc." + CUXD_INSTANZ + "." + CCU_DEV_CUXD + ".14"/*ECHO_DOT_xx:Sender_8*/;
//CCU_DEV_                = '';

//####Tunein Sender oder Sender Nummern eintragen eintragen! ######### 
var Sender_1, Sender_2, Sender_3, Sender_4, Sender_5, Sender_6, Sender_7, Sender_8;

Sender_1 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')
Sender_2 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')
Sender_3 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')
Sender_4 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')
Sender_5 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')
Sender_6 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')
Sender_7 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')
Sender_8 = 's12345';//<-<-<-<-<-<-<- hier die Sender Nummern eintragen (bsp.: 's12345')

/*############################################### SCRIPT ABLAUF ##############################################################################################################*/


/*++++++++++++ 2 Stunden ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/      
var ZweiStunden;

on({id: new RegExp(DEVICE + '.Player\\.currentState' + "|" + DEVICE + '.Player\\.controlPlay' + "|" + DEVICE + '.Player\\.controlPause' + "|" + DEVICE + '.Player\\.currentArtist' + "|" + DEVICE + '.Player\\.currentAlbum'), change: "ne"}, function (obj) {
    (function () {if (ZweiStunden) {clearTimeout(ZweiStunden); ZweiStunden = null;}})();
  ZweiStunden = setTimeout(function () {
    if (getState(DEVICE + '.Player.controlPlay').val === false) {
      setState(CCU_VAR_SENDER_INFO, '');
      setState(CCU_VAR_SENDER, '');
      setState(CCU_VAR_NEXT_PREV, false);
      setState(CCU_VAR_providerName, '');
      setState(CCU_VAR_REPEAT, false);
      setState(CCU_VAR_SHUFFLE, false);
      setState(CCU_VAR_PROGRESS, 0);
      setState(CCU_VAR_STATUS, 0);
      setState(CCU_VAR_PICTURE, 'https://images-na.ssl-images-amazon.com/images/I/41VXGF76krL._AC_SX215_.jpg');
      console.log('Alexa ' + DEVICE_ORT + ' Werte nach 2 Stunden leeren');
    }
  }, CLEAN_TIME);
});

/*++++++++++++ IMAGE URL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + '.Player.imageURL'/*Huge image*/, change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_PICTURE, (obj.state ? obj.state.val : ""), false);
});
on({id: DEVICE + '.Player.miniArtUrl', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if (getState(DEVICE + '.Player.imageURL').val < '1') {
    setStateDelayed(CCU_VAR_PICTURE, (obj.state ? obj.state.val : ""), 200, false);
  } else if ((getState(DEVICE + '.Player.imageURL').val === '') && (getState(DEVICE + '.Player.miniArtUrl').val === '')) {
	setState(CCU_VAR_PICTURE, 'https://images-na.ssl-images-amazon.com/images/I/41VXGF76krL._AC_SX215_.jpg');  
        }
});
// nach Start Wert schreiben
setState(CCU_VAR_PICTURE, 'https://images-na.ssl-images-amazon.com/images/I/41VXGF76krL._AC_SX215_.jpg');
console.log(String(DEVICE_ORT + ' Image URL übertragen Nach Programm Start'));

/*++++++++++++ device MUTE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var VOLUME_MERKEN;
// MUTE/UNMUTE
on({id: CCU_DEV_MUTE + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if (getState(DEVICE + '.Player.volume').val >= 1) {
    VOLUME_MERKEN = getState(DEVICE + '.Player.volume').val;
    setStateDelayed(DEVICE + '.Player.volume', 0, 150, false);
  } else {
    setState(DEVICE + '.Player.volume', VOLUME_MERKEN);
  }
});
on({id: CCU_DEV_MUTE + '.PRESS_LONG', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if (getState(DEVICE + '.Player.volume').val >= 1) {
    VOLUME_MERKEN = getState(DEVICE + '.Player.volume').val;
    setStateDelayed(DEVICE + '.Player.volume', 0, 150, false);
  } else {
    setState(DEVICE + '.Player.volume', VOLUME_MERKEN);
  }
});

/*++++++++++++ device NEXT_BACK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// voheriger Titel "alexa2.0.Echo-Devices.xxx.Player.controlNext"/*controlNext*/
on({id: CCU_DEV_Next_Previous + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if (getState(DEVICE + '.Player.contentType').val === 'TRACKS' || getState(DEVICE + '.Player.contentType').val === 'PODCASTS' || getState(DEVICE + '.Player.contentType').val === 'CUSTOM_STATION') {
    setState(DEVICE + '.Player.controlPrevious', true);
  }
});
// nächster Titel
on({id: CCU_DEV_Next_Previous + '.PRESS_LONG', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if (getState(DEVICE + '.Player.contentType').val === 'TRACKS' || getState(DEVICE + '.Player.contentType').val === 'PODCASTS' || getState(DEVICE + '.Player.contentType').val === 'CUSTOM_STATION') {
    setState(DEVICE + '.Player.controlNext', true);
  }
});

/*++++++++++++ NEXT_BACK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + '.Player.providerName', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") === 'TuneIn-Bücher und Podcasts' || (obj.state ? obj.state.val : "") === 'Amazon Music') {
    if (getState(DEVICE + '.Player.imageURL').val === 'https://cdn-radiotime-logos.tunein.com/_0q.jpg?t=636358') {
      setState(CCU_VAR_NEXT_PREV, false);
    } else {
      if (getState(CCU_VAR_NEXT_PREV).val === false) {
        setState(CCU_VAR_NEXT_PREV, true);
      }
    }
  } else if ((obj.state ? obj.state.val : "") !== 'TuneIn-Bücher und Podcasts' && (obj.state ? obj.state.val : "") !== 'Amazon Music') {
    if (getState(CCU_VAR_NEXT_PREV).val === true) {
      setState(CCU_VAR_NEXT_PREV, false);
    }
  }
});
// nach Programmstart an ccu2 übermitteln
if (getState(DEVICE + '.Player.providerName').val === 'TuneIn-Bücher und Podcasts' || getState(DEVICE + '.Player.providerName').val === 'Amazon Music') {
  if (getState(DEVICE + '.Player.imageURL').val === 'https://cdn-radiotime-logos.tunein.com/_0q.jpg?t=636358') {
    setState(CCU_VAR_NEXT_PREV, false);
  } else {
    if (getState(CCU_VAR_NEXT_PREV).val === false) {
      setState(CCU_VAR_NEXT_PREV, true);
    }
  }
} else if (getState(DEVICE + '.Player.providerName').val !== 'TuneIn-Bücher und Podcasts' && getState(DEVICE + '.Player.providerName').val !== 'Amazon Music') {
  if (getState(CCU_VAR_NEXT_PREV).val === true) {
    setState(CCU_VAR_NEXT_PREV, false);
  }
}

/*++++++++++++ online ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + '.online', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") !== getState(CCU_VAR_ONLINE).val) {
    setState(CCU_VAR_ONLINE, (obj.state ? obj.state.val : ""));
  }
});

/*++++++++++++ device PAUSE_PLAY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: CCU_DEV_PLAY_PAUSE + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(DEVICE + '.Player.controlPause', true);
  setState(CCU_VAR_STATUS, 2);
  setState(CCU_VAR_STATE, false);
});
on({id: CCU_DEV_PLAY_PAUSE + '.PRESS_LONG', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(DEVICE + '.Player.controlPlay', true);
  setState(CCU_VAR_STATUS, 1);
});

/*++++++++++++ PROGRESS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + ".Player.mediaProgressPercent", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") !== getState(CCU_VAR_PROGRESS).val) {
    setState(CCU_VAR_PROGRESS, (obj.state ? obj.state.val : ""));
  }
});

/*++++++++++++ Playlist ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: CCU_DEV_Radiostation + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if (getState(DEVICE_MULTIROOM + ".Player.currentState").val === true) {
    setState(DEVICE_MULTIROOM + ".Player.controlPause", true);
    setStateDelayed(DEVICE + ".Music-Provider.Amazon-Music-Playlist", PLAYLIST, 1000, false);
  } else {
    setState(DEVICE + ".Music-Provider.Amazon-Music-Playlist", PLAYLIST);
  }
});

/*++++++++++++ letzter Radiosender ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: CCU_DEV_Radiostation + '.PRESS_LONG', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if (getState(DEVICE_MULTIROOM + ".Player.currentState").val === true) {
    setState(DEVICE_MULTIROOM + ".Player.controlPause", true);
    setStateDelayed(DEVICE + ".Player.TuneIn-Station"/*TuneIn-Station*/, getState(DEVICE + ".Player.TuneIn-Station").val, 1000, false);
  } else {
    setState(DEVICE + ".Player.TuneIn-Station"/*TuneIn-Station*/, getState(DEVICE + ".Player.TuneIn-Station").val);
  }
});

/*++++++++++++ device REPEAT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: CCU_DEV_Repeat_Shuffle + ".PRESS_SHORT", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  getState(DEVICE + ".Player.controlRepeat", function (err, state) {
      setState(DEVICE + ".Player.controlRepeat", state ? !state.val : true);
  });
});

/*++++++++++++ REPEAT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + ".Player.controlRepeat", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") != getState(CCU_VAR_REPEAT).val) {
    setState(CCU_VAR_REPEAT, (obj.state ? obj.state.val : ""));
  }
});

/*++++++++++++ device SHUFFLE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: CCU_DEV_Repeat_Shuffle + ".PRESS_LONG", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  getState(DEVICE + ".Player.controlShuffle", function (err, state) {
      setState(DEVICE + ".Player.controlShuffle", state ? !state.val : true);
  });
});

/*++++++++++++ SHUFFLE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + ".Player.controlShuffle", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") != getState(CCU_VAR_SHUFFLE).val) {
    setState(CCU_VAR_SHUFFLE, (obj.state ? obj.state.val : ""));
  }
});

/*++++++++++++ SENDER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// Sender 1
on({id: CCU_DEV_Sender_1 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + '.Player.TuneIn-Station', Sender_1);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});
// Sender 2
on({id: CCU_DEV_Sender_2 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + ".Player.TuneIn-Station", Sender_2);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});
// Sender 3
on({id: CCU_DEV_Sender_3 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + ".Player.TuneIn-Station", Sender_3);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});
// Sender 4
on({id: CCU_DEV_Sender_4 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + ".Player.TuneIn-Station", Sender_4);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});
// Sender 5
on({id: CCU_DEV_Sender_5 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + ".Player.TuneIn-Station", Sender_5);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});
// Sender 6
on({id: CCU_DEV_Sender_6 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + ".Player.TuneIn-Station", Sender_6);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});
// Sender 7
on({id: CCU_DEV_Sender_7 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + ".Player.TuneIn-Station", Sender_7);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});
// Sender 8
on({id: CCU_DEV_Sender_8 + '.PRESS_SHORT', change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  setState(CCU_VAR_SENDER_LOGO, 'null');
  setState(DEVICE + '.Player.TuneIn-Station', Sender_8);
  setState(CCU_VAR_SENDER, 'Stream wird geladen ...');
  setState(CCU_VAR_SENDER_INFO, ' ');
});


/*++++++++++++ State ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

var timeout;


on({id: DEVICE + ".Player.currentState", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") !== getState(CCU_VAR_STATE).val) {
    setState(CCU_VAR_STATE, (obj.state ? obj.state.val : ""));
  }
});
// idle
on({id: new RegExp(DEVICE + '.Player\\.controlPause' + "|" + DEVICE + '.Player\\.controlPlay'), change: "ne"}, function (obj) {
    timeout = setTimeout(function () {
    if (getState(DEVICE + ".Player.controlPause").val === false && getState(DEVICE + ".Player.controlPlay").val === false) {
      setState(CCU_VAR_STATUS, 0);
    }
  }, 5000);
});
// play
on({id: DEVICE + ".Player.controlPlay", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") === true) {
    if (getState(CCU_VAR_STATUS).val !== 1) {
      setState(CCU_VAR_STATUS, 1);
      if (getState(CCU_VAR_STATE).val == true) {
        setState(CCU_VAR_STATE, false);
      }
    }
  }
});
// pause
on({id: DEVICE + ".Player.controlPause"/*controlPause*/, change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") === true) {
    if (getState(CCU_VAR_STATUS).val !== 2) {
      setState(CCU_VAR_STATUS, 2);
      setStateDelayed(CCU_VAR_STATE, false, 1000, false);
    }
  }
});

/*++++++++++++ volume ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + ".Player.volume", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") !== getState(CCU_VAR_VOLUME).val) {
    setState(CCU_VAR_VOLUME, parseFloat((obj.state ? obj.state.val : "")));
  }
});

on({id: CCU_VAR_VOLUME, change: "ne"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") !== getState(DEVICE + ".Player.volume").val) {
    setState(DEVICE + ".Player.volume", (obj.state ? obj.state.val : ""));
  }
});

/*++++++++++++ SENDER_LOGO ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id:  DEVICE + ".Player.radioStationId", change: "any"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  if ((obj.state ? obj.state.val : "") != getState(CCU_VAR_SENDER_LOGO).val) {
    setState(CCU_VAR_SENDER_LOGO, (obj.state ? obj.state.val : ""));
  }
});

/*++++++++++++ Title Artist decoded ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

on({id: DEVICE + '.Player.currentArtist'}, function (obj) {
	var s=getState(DEVICE + '.Player.currentArtist').val;
	s=replaceAll(s,'ä','&auml;');
	s=replaceAll(s,'ö','&ouml;');
	s=replaceAll(s,'ü','&uuml;');
	s=replaceAll(s,'Ä','&Auml;');
	s=replaceAll(s,'Ö','&Ouml;');
	s=replaceAll(s,'Ü','&Uuml;');
	s=replaceAll(s,'Â'||'À'||'Å'||'Ã','A');
    s=replaceAll(s,'â'||'à'||'å'||'ã','a');
    s=replaceAll(s,'Ç','C');
    s=replaceAll(s,'ç','c');
    s=replaceAll(s,'É'||'Ê'||'È'||'Ë','E');
    s=replaceAll(s,'é'||'ê'||'è'||'ë','e');
    s=replaceAll(s,'Ó'||'Ô'||'Ò'||'Õ'||'Ø','O');
    s=replaceAll(s,'ó'||'ô'||'ò'||'õ','o');
    s=replaceAll(s,'Š','S');
    s=replaceAll(s,'š','s');
    s=replaceAll(s,'Ú'||'Û'||'Ù','U');
    s=replaceAll(s,'ú'||'û'||'ù','u');
    s=replaceAll(s,'Ý'||'Ÿ','Y');
    s=replaceAll(s,'ý'||'ÿ','y');
    s=replaceAll(s,'Ž','Z');
    s=replaceAll(s,'ž','z');
    s=replaceAll(s,':',' ');
    s=replaceAll(s,'',' ');
    s=replaceAll(s,'ß','ss');
    s=replaceAll(s,'?',' ');
    s=replaceAll(s,'’',"'");
	setState(CCU_VAR_SENDER_INFO,s);
});

function replaceAll(string, token, newtoken) {
    if(token!=newtoken)
    while(string.indexOf(token) > -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

on({id: DEVICE + '.Player.currentTitle'}, function (obj) {
	var s=getState(DEVICE + '.Player.currentTitle').val;
	s=replaceAll(s,'ä','&auml;');
	s=replaceAll(s,'ö','&ouml;');
	s=replaceAll(s,'ü','&uuml;');
	s=replaceAll(s,'Ä','&Auml;');
	s=replaceAll(s,'Ö','&Ouml;');
	s=replaceAll(s,'Ü','&Uuml;');
	s=replaceAll(s,'Â'||'À'||'Å'||'Ã','A');
    s=replaceAll(s,'â'||'à'||'å'||'ã','a');
    s=replaceAll(s,'Ç','C');
    s=replaceAll(s,'ç','c');
    s=replaceAll(s,'É'||'Ê'||'È'||'Ë','E');
    s=replaceAll(s,'é'||'ê'||'è'||'ë','e');
    s=replaceAll(s,'Ó'||'Ô'||'Ò'||'Õ'||'Ø','O');
    s=replaceAll(s,'ó'||'ô'||'ò'||'õ','o');
    s=replaceAll(s,'Š','S');
    s=replaceAll(s,'š','s');
    s=replaceAll(s,'Ú'||'Û'||'Ù','U');
    s=replaceAll(s,'ú'||'û'||'ù','u');
    s=replaceAll(s,'Ý'||'Ÿ','Y');
    s=replaceAll(s,'ý'||'ÿ','y');
    s=replaceAll(s,'Ž','Z');
    s=replaceAll(s,'ž','z');
    s=replaceAll(s,':',' ');
    s=replaceAll(s,'',' ');
    s=replaceAll(s,'ß','ss');
    s=replaceAll(s,'?',' ');
    s=replaceAll(s,'’',"'");
	setState(CCU_VAR_SENDER,s);
});

function replaceAll(string, token, newtoken) {
    if(token!=newtoken)
    while(string.indexOf(token) > -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

on({id: DEVICE + '.Player.providerName'}, function (obj) {
	var s=getState(DEVICE + '.Player.providerName').val;
	s=replaceAll(s,'ä','&auml;');
	s=replaceAll(s,'ö','&ouml;');
	s=replaceAll(s,'ü','&uuml;');
	s=replaceAll(s,'Ä','&Auml;');
	s=replaceAll(s,'Ö','&Ouml;');
	s=replaceAll(s,'Ü','&Uuml;');
	s=replaceAll(s,'Â'||'À'||'Å'||'Ã','A');
    s=replaceAll(s,'â'||'à'||'å'||'ã','a');
    s=replaceAll(s,'Ç','C');
    s=replaceAll(s,'ç','c');
    s=replaceAll(s,'É'||'Ê'||'È'||'Ë','E');
    s=replaceAll(s,'é'||'ê'||'è'||'ë','e');
    s=replaceAll(s,'Ó'||'Ô'||'Ò'||'Õ'||'Ø','O');
    s=replaceAll(s,'ó'||'ô'||'ò'||'õ','o');
    s=replaceAll(s,'Š','S');
    s=replaceAll(s,'š','s');
    s=replaceAll(s,'Ú'||'Û'||'Ù','U');
    s=replaceAll(s,'ú'||'û'||'ù','u');
    s=replaceAll(s,'Ý'||'Ÿ','Y');
    s=replaceAll(s,'ý'||'ÿ','y');
    s=replaceAll(s,'Ž','Z');
    s=replaceAll(s,'ž','z');
    s=replaceAll(s,':',' ');
    s=replaceAll(s,'',' ');
    s=replaceAll(s,'ß','ss');
    s=replaceAll(s,'?',' ');
    s=replaceAll(s,'’',"'");
	//hier könnten weitere Zeilen mir replaceAll z.B. für Umlaute stehen
	setState(CCU_VAR_providerName,s);
});

function replaceAll(string, token, newtoken) {
    if(token!=newtoken)
    while(string.indexOf(token) > -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}
