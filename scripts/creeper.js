module.exports = function(robot) {
  robot.hear(/(.*)/i, (response) => {
    console.log('resposne.message', response.message);
    var data = JSON.stringify({
      text: response.message.text,
      user: response.message.user.profile.real_name,
      time: Date.now(),
    });
    robot.http(`http://servup.herokuapp.com/collections/${response.message.room}`)
      .header('Content-Type', 'application/json')
      .post(data);
  });
  robot.hear(/getData/i, (response) => {
    robot.http(`http://servup.herokuapp.com/collections/${response.message.room}`)
      .get()((err, res, body) => {
        if (err) return;
        var data = JSON.parse(body);
        for (var i = 0; i < data.length; i++) {
          response.send(`${data[i].user} said "${data[i].text}" this many seconds? since 1970: ${data[i].time}`);
        }
      })
  })

};
