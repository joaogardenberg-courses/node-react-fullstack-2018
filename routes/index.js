module.exports = (app) => {
  require('./auth')(app);
  require('./billing')(app);
  require('./survey')(app);

  require('./client')(app);
};
