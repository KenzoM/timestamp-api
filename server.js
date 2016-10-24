var express = require('express');
var path = require('path')
var app = express();
var moment = require('moment');
var port = process.env.PORT ||  3000;
//homepage
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

//input of the page
app.get('/:dataString', function(req, res) {
  var dataString = req.params.dataString;
  var output;
  //Using regex, checks if the dataString has only number characters
  if(/^[0-9]*$/.test(dataString)){
    output = moment(dataString, "X")
  } else{
    output = moment.utc(dataString, "MMMM DD YYYY")
  }

  if (output.isValid()){
    res.json({
      unix: output.utc().format("X"),
      natural: output.utc().format("MMMM D, YYYY")
    });
  } else{
    res.json({
      unix: 'null',
      natural: 'null'
    });
  }
})

app.listen(port,function(){
  console.log("turn on. Port is: ", port)
})
