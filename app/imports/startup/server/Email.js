import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

// Server: Define a method that the client can call.
Meteor.methods({
  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();
    Email.send({ to, from, subject, text });
  },
});

Meteor.startup(function () {
  if (Meteor.settings.defaultCredentials) {
    process.env.MAIL_URL = `smtps://${Meteor.settings.defaultCredentials.username}:${Meteor.settings.defaultCredentials.password}@smtp.gmail.com:465/`;
  }
});
