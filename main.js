let user = rltm({
service: 'pubnub',
config: {
    publishKey: 'pub-c-0dda1bca-3013-459f-8333-32b487e74ab4',
    subscribeKey: 'sub-c-f43f4c62-5c6c-11e9-af7f-e675e2b0822b',
    uuid: 'test_user'
  }
});

room = user.join('trip-check');

function submit() {
  var boxVal = document.getElementById("dmBox").value;

  if(boxVal != "") {
    room.message({message: boxVal});
    $('#dmBox').val("");
  }
}

// room.here().then((users) => {
//     console.log('users online', users);
// });

room.on('message', (uuid, data) => {
  if(uuid == 'test_user'){
    createBoxForCurrUser(data);
  }
  else{
    createBoxForOtherUser(data);
  }
});

// room.history().then((history) => {
//   console.log('got array of all messages in channel', history);
// });
function createBoxForCurrUser(data) {
  var box = document.createElement('div');
  var dm = document.getElementById("dm");

  dm.appendChild(document.createElement('br'));

  box.style.width = "27vw";
  box.style.height = "10vh";

  box.style.textAlign = "center";
  box.style.background = "white";

  box.style.position = "relative";
  box.style.top = "100px;"

  box.style.borderRadius = "10px";

  box.innerHTML = data.message;

  dm.appendChild(box);
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        submit();
    }
});
