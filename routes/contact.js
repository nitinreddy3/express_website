var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
  var transporter = nodemailer.createTransport({
  	service: 'Gmail',
  	auth: {
  		user: 'username@gmail.com',
  		pass: 'password'
  	}
  });

  var mailOptions = {
  	from: 'Receiver Name',
  	to: 'user@gmail.com',
  	subject: 'New Mail',
  	text: 'You received a new mail from' + req.body.name + 'Email ' + req.body.email + ' Message: ' + req.body.message,
  	html: '<p>You got a new mail</p><ul><li>'+req.body.name+'</li><li>'+req.body.email+'</li><li>'+req.body.message+'</li></ul>'
  };

  transporter.sendMail(mailOptions, function (err, info) {
  	if(err) {
  		console.log(err);
  		res.redirect('/');
  	} else {
  		console.log('Message sent: '+info.response);
  		res.redirect('/');
  	}
  });
});
module.exports = router;
