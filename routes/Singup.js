var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/get',passport.authenticate('jwt', { session: false}), function(req, res, next) {
  console.log('Header',req.headers);
  res.send("Hey There");
});


// router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//       Book.create(req.body, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//       });
//     } else {
//       return res.status(403).send({success: false, msg: 'Unauthorized.'});
//     }
//   });

  router.get('/dash', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log('Header',req.headers);
    var token = getToken(req.headers);
    if (token) {
      Book.find(function (err, books) {
        if (err) return next(err);
        res.json(books);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
module.exports = router;
