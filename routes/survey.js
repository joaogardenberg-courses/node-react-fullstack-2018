const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/survey');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    try {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
        _user:      req.user.id,
        dateSent:   Date.now()
      });

      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();

      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/surveys', requireLogin, async ({ user: { id } }, res) => {
    const surveys = await Survey
      .find({ _user: id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', ({ body }, res) => {
    const path = new Path('/api/surveys/:surveyId/:choice');

    _.chain(body)
      .filter(({ event }) => event === 'click')
      .map(({ email, url }) => {
        const match = path.test(new URL(url).pathname);

        if (match) {
          return {
            email,
            ...match
          }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email,
              responded: false
            }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: {
            lastResponded: new Date(),
            'recipients.$.responded': true
          }
        }).exec();
      })
      .value();

    res.status(200).send({});
  });
};