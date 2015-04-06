var express = require('express');
var bodyParser = require('body-parser');
var pg = require("pg");
var db = require("./models");
var methodOverride = require("method-override");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))

// Refactor connection and query code

app.get('/articles', function(req,res) {
	db.Article.findAll().then(function(articles) {
		res.render('articles/index', {articlesList: articles});
	})
  ;
});

app.get('/articles/new', function(req,res) {
  res.render('articles/new');
});

app.get('/articles/:id/edit', function(req,res) {
  var id = req.params.id;
  db.Article.find(id).then(function(editting) {res.render('articles/edit', {articleToEdit: editting, id: id})});
});

app.post('/articles', function(req,res) {
  var title = req.body.articleTitle;
  var author = req.body.articleAuthor;
  var content = req.body.articleContent;
  db.Article.create({title: title, author: author, content: content, fiction: true})
  .then(function(postArticle) {
  	res.redirect('/articles')
	});
});

app.get('/articles/:id', function(req, res) {
	var id = req.params.id;
 	db.Article.find(id).then(function (articles) {res.render('articles/article', {articleToDisplay: articles})});
  
})

app.delete('/articles/:id', function(req,res) {
	var id = req.params.id;
  	db.Article.find(id).then(function(deletedArticle) {
  		deletedArticle.destroy().then(function(redirect) {
  			res.redirect('/articles');
  		});
  	});
});

app.put('/articles/:id', function(req,res) {
  var articleId = req.params.id;
  var title = req.body.articleTitle;
  var author = req.body.articleAuthor;
  var content = req.body.articleContent;
  db.Article.find(articleId).then(function (article) {
  	article.updateAttributes({
  		title: title,
  		author: author,
  		content: content}).then(function(edit) {
  			res.redirect('/articles/'+articleId);
			});
		});
});

app.get('/', function(req,res) {
  res.render('site/index');
});

app.get('/about', function(req,res) {
  res.render('site/about');
});

app.get('/contact', function(req,res) {
  res.render('site/contact');
});

app.listen(3000, function() {
  console.log('Listening');
});
