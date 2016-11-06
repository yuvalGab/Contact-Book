var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/ContactBook';


/* GET home page. */
router.get('/', function(req, res, next) { 
    mongo.connect(url, function (err, db) {
        var list = [];
        assert.equal(null, err);
        var cursor = db.collection('contacts').find();
        cursor.each(function(err, item) {
            if(item == null) {
                return;
            }
            list.push(item);
        });
        db.collection('contacts').find(function(err, docs) {
            assert.equal(null, err);
            docs.count(function(error, nbDocs) {
                db.close();
                res.render('home', {status: nbDocs, list: list});
            });
        });
    });
});


//send a new contact member to the data base
router.post('/send', function(req, res, next) {
    var newContact = {
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        email: req.body.email,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2,
        comment: req.body.comment
    };
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('contacts').insertOne(newContact, function(err, result) {
            assert.equal(null, err);
            db.close();
            res.redirect('/add');
        });
    });
});

//showed data in outcome area
var first,last;

//find contact member in database
router.post('/find', function(req, res, next) {
    var firstName = req.body.firstName.toLowerCase();
    var lastName = req.body.lastName.toLowerCase();
    var email,phone1,phone2,comment,error;
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('contacts').find( {$and: [{"firstName": firstName } , { "lastName": lastName }]} );
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                first = doc.firstName;
                last = doc.lastName;
                email = doc.email;
                phone1 = doc.phoneNumber1;
                phone2 = doc.phoneNumber2;
                comment = doc.comment;
            } else {
                error = "There is no results, check the fields again... Both first name and last name must be entered.";
            }
            db.close();
            res.render('search', {first: first, last: last, email: email, phone1: phone1, phone2: phone2, comment: comment, error: error});
        });
    });
});

//edit conact
router.post('/edit', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        assert.equal(err, null);
        var editFirst = req.body.editFirstName;
        var editLast = req.body.editLastName;
        var editEmail = req.body.editEmail;
        var editPhone1 = req.body.editPhoneNumber1;
        var editPhone2 = req.body.editPhoneNumber2;
        var editComment = req.body.editComment;
        db.collection('contacts').update({"firstName": first, "lastName": last }, {'firstName': editFirst, 'lastName': editLast, 'email': editEmail, 'phoneNumber1': editPhone1, 'phoneNumber2': editPhone2, 'comment': editComment});
        db.close; 
        res.redirect('/search');
    });
});


//delete contact
router.get('/delete', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        assert.equal(err, null);
        db.collection('contacts').remove( {$and: [{"firstName": first } , { "lastName": last }]} );
        db.close();
        res.redirect('/search');
    });
});

//delete all data
router.get('/deleteAll', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        assert.equal(err, null);
        db.collection('contacts').drop();
        db.close();
        res.redirect('/');
    });
});

module.exports = router;






