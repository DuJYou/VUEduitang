import chatView from '../views/chat.art'

export const list = async (req, res, next) => {
  res.render(chatView())

  var socket = io.connect('http://10.9.49.167:8082');
  // const content = document.getElementById('content')

  

  document.querySelector('#submit')
    .addEventListener('click', function () {
      var msg2 = msg.value
      socket.emit('receive', msg2)
      msg.value = ''
      // content.innerHTML += '(我):'+ msg2 + '<br/>'
      $('#content').append('<li class="chat_list"><span class="right">'+ msg2 + '</span></li><br/>')
    }, false)

    $('#msg').on('keyup',function(e){
      if(e.keyCode===13){
          var msg2 = msg.value
          socket.emit('receive', msg2)
          msg.value = ''
          // content.innerHTML += '(我):'+ msg2 + '<br/>'
          $('#content').append('<li class="chat_list"> <span class="right">'+ msg2 + '</span></li><br/>')
      }
    })
  socket.on('message', function (msg) {
    // content.innerHTML += msg + '<br/>'
    $('#content').append('<li class="chat_list"> <span class="left">(路人):'+ msg + '</li><br/>')
  })


}