var express = require('express');
var app = express()
var validator = require('email-validator');
var Datastore = require('nedb');
var db = new Datastore({filename:'artifact/subscriptions.json', autoload:true});
var cors = require('cors');

var nodemailer = require('nodemailer');


var sendMail = function(mail) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'reddrum.contact@gmail.com',
        pass: 'reddrum123'
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    var message = {
      from: 'reddrum.contact@gmail.com',
      to: mail,
      subject: 'Inscription newletter',
      html: 'Veuillez cliquez sur ce lien pour confirmer votre inscription ! <form action="http://localhost:3000/'+mail+'" method="get"><button type="submit">Activer</button></form>'
    }

    transporter.sendMail(message, (err, info) => {
      console.log(err)
      console.log(info)
      if(err) {reject(err)}
      else {resolve()}
    });
    resolve()
  })
};

app.use(cors());

app.post('/:mail', function (req,res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
    var mail = req.params['mail'];
    var isValidMail = validator.validate(mail);
    if(isValidMail) {
      db.insert({mail:mail, isValidated:false}, function(err, doc) {

        res.header('Content-type', 'text/plain');
        sendMail(mail)
          .then(() => {
            res.status(200).send({message: mail + ' à bien été ajouté, en attente de validation'});
          })
          .catch((err) => {
            res.status(500).send(err);
          })
      });
    } else {
      res.header('Content-type', 'text/plain');
      res.status(422).send('email invalide')
    }

})


app.get('/' ,function (req,res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  db.find({isValidated:true},function (err, docs) {
    if(err)
      res.status(500).send(err);
    else
      res.status(200).json(docs.map(obj => obj.mail));
  })
});

app.get('/:mail', function (req,res) {
  var mail = req.params['mail'];
  db.update({mail:mail}, {mail:mail, isValidated: true}, {}, function (err, numReplaced) {
    if(err) {
      res.status(500).send(err)
    }
    else if(numReplaced == 0) {
      res.status(404).send('not found');
    } else {
      res.status(200).send(mail + ' à bien été validé');
    }
  })
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
});

module.exports = app;
