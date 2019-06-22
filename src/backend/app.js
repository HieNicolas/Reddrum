var express = require('express');
var appSubscription = express();
var appIdentification = express();
var validator = require('email-validator');
var Datastore = require('nedb');
var dbSubscription = new Datastore({filename:'artifact/subscriptions.json', autoload:true});
var dbUsers = new Datastore({filename:'artifact/users.json', autoload:true});
var cors = require('cors');

var nodemailer = require('nodemailer');
var sha256 = require('sha256');
var jsonwebtoken = require('jsonwebtoken');
var bodyparser = require('body-parser');

appIdentification.use(bodyparser());

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
      html: 'Veuillez cliquez sur ce lien pour confirmer votre register ! <form action="http://localhost:3000/'+mail+'" method="get"><button type="submit">Activer</button></form>'
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

appSubscription.use(cors());
appIdentification.use(cors());

appSubscription.post('/:mail', function (req,res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
    var mail = req.params['mail'];
    var isValidMail = validator.validate(mail);
    if(isValidMail) {
      dbSubscription.insert({mail:mail, isValidated:false}, function(err, doc) {

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


appSubscription.get('/' ,function (req,res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  dbSubscription.find({isValidated:true},function (err, docs) {
    if(err)
      res.status(500).send(err);
    else
      res.status(200).json(docs.map(obj => obj.mail));
  })
});

appSubscription.get('/:mail', function (req,res) {
  var mail = req.params['mail'];
  dbSubscription.update({mail:mail}, {mail:mail, isValidated: true}, {}, function (err, numReplaced) {
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


appIdentification.get('/isLegit/:token', function(req, res) {
  var token = req.params['token'];
  jsonwebtoken.verify(token, 'key', (err, decoded) => {
    if(err) {
      res.status(401).send('Legitimite non etablie')
    } else {
      res.status(200).send({name: decoded})
    }
  })
})

appIdentification.get('/connect/:mail/:hashedPassword', function (req,res) {
  var mail = req.params['mail'];
  var hashedPassword = sha256(req.params['hashedPassword']);
  dbUsers.findOne({mail: mail}, function (err, found) {
    if(err) {
      res.status(500).send(err)
    }
    else if(found.password == hashedPassword) {
      let token = jsonwebtoken.sign(mail, 'key');
      res.status(200).send({token: token});
    } else {
      res.status(401).send('Combinaison invalide');
    }
  })
});

appIdentification.post('/register', function (req,res) {
  var user = req.body;
  user.password = sha256(user.password);

  dbUsers.findOne({mail: user.mail}, function (err, found) {
    if(err) {
      res.status(500).send(err)
    }

    if(found) {
      res.status(500).send('Utilisateur deja existant')
    } else {
      dbUsers.insert(user, function (err, inserted) {
        if(err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(inserted);
        }
      })
    }
  })


});

appSubscription.listen(3000, function () {
  console.log('Example app listening on port 3000')
});



appIdentification.listen(3001, function () {
  console.log('Example app listening on port 3001')
});


module.exports = appSubscription;
