const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('./users');

passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

router.get('/reg', (req, res) => {
  res.render('register', { error: req.flash('error') });
});
router.get('/', (req, res) => {
  res.render('login', { error: req.flash('error') });
});
router.get('/adminL', (req, res) => {
  res.render('adminLogin', { error: req.flash('error') });
});
router.get('/adminS', (req, res) => {
  res.render('adminSignup', { error: req.flash('error') });
});

router.get('/adminsHome', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('adminHome', { user });
});
router.get('/dashboard', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('dashboard', { user });
});
router.get('/adminsProf', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('adminsProf', { user });
});
router.get('/home', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('index', { user });
});
router.get('/col', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('col', { user });
});
router.get('/about', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('about', { user });
});
router.get('/contact', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('contact', { user });
});
router.get('/faq', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('faq', { user });
});
router.get('/furniture', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('furniture', { user });
});
router.get('/check', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('check', { user });
});
router.get('/shoes', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('shoes', { user });
});
router.get('/bags', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('bags', { user });
});
router.get('/gift', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('gift', { user });
});
router.get('/jew', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('jew', { user });
});
router.get('/wint', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('wint', { user });
});
router.get('/cos', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('cos', { user });
});
router.get('/bs', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('bs', { user });
});
router.get('/wish', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('wish', { user });
});
router.get('/comp', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('compare', { user });
});
router.get('/blog', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('blog', { user });
});
router.get('/cart', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('cart', { user });
});
router.get('/cart1', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('cart1', { user });
});
router.get('/cart2', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('cart2', { user });
});
router.get('/404', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('404', { user });
});
router.get('/off', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('offers', { user });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true,
  })
);

router.post(
  '/adminL',
  passport.authenticate('local', {
    successRedirect: '/adminsHome',
    failureRedirect: '/adminL',
    failureFlash: true,
  })
);

router.post('/reg', function (req, res, next) {
  const userdata = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });

  userModel.register(userdata, req.body.password, function (err, user) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/reg');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/home');
    });
  });
});

router.post('/adminS', function (req, res, next) {
  const userdata = new userModel({
    id: req.body.id,
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    role: 'admin',
  });

  userModel.register(userdata, req.body.password, function (err, user) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/adminS');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/adminsHome');
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
