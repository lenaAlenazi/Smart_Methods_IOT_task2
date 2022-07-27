
    var output = document.getElementById("output");
    var start = document.getElementById("start");

    var language_Rec = document.getElementById("language_Rec");
    var speechRecognition = speechRecognition || webkitSpeechRecognition;
    var recognizer = new speechRecognition();

    recognizer.lang = 'ar';

    language_Rec.onchange = function() {
        recognizer.lang = language_Rec.value;
    }


    start.onclick = function() {
        recognizer.start();
    }

    recognizer.onspeechend = function() {
        stop.click();
    }

    recognizer.onresult = function(event) {
        var Textbox = event.results[0][0].transcript;
        output.value = Textbox;
    }
//arduino js
let isConnectted = false;
     let port;
     let writer;
     var target_id;
     const enc = new TextEncoder();

     async function onChangespeech() {
       if (!isConnectted) {
         alert("must connect to the usb");
         return;
       }

       try {
         const commandlist = content;
         const commandSplit = commandlist.split(" ")
         const command = commandSplit.slice(-1);
         const computerText = `${command}@`;
         await writer.write(enc.encode(computerText));
       } catch (e) {
         console.log(e);

       if (e.includes("يمين") || e.includes("right")) {
           await writer.write("right");
       }
       else if (e.includes("يسار") || e.includes("left")) {
           await writer.write("left");
       }

       writer.releaseLock();
       }
     }
   async function onConnectUsb() {
     try {
       const requestOptions = {

         filters: [{ usbVendorId: 0x2341 }],
       };


       port = await navigator.serial.requestPort(requestOptions);
       await port.open({ baudRate: 115200 });
       writer = port.writable.getWriter();
       isConnectted = true;
     } catch (e) {
       console.log("err", e);
     }
   }
