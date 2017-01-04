'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The calMailToAttendeesController', function() {

  var $controller, _;
  var ctrl, attendeesTest, attendeesMailTest;

  beforeEach(function() {
    attendeesTest = [
      { email: 'other1@example.com', partstat: 'NEEDS-ACTION', clicked: false },
      { email: 'other2@example.com', partstat: 'ACCEPTED', clicked: true },
      { email: 'other3@example.com', partstat: 'DECLINED', clicked: false }
    ];

    attendeesMailTest = 'other1@example.com,other2@example.com,other3@example.com';

    angular.mock.module('esn.calendar');

    angular.mock.inject(function(___, _$controller_) {
      _ = ___;
      $controller = _$controller_;
    });

    ctrl = initController();
  });

  function initController() {
    return $controller('calMailToAttendeesController');
  }

  describe('The getEmailAddressesFromUsers function', function() {

    it('should initialize mail-to-attendees', function() {
      expect(ctrl.getEmailAddressesFromUsers(attendeesTest)).to.equal(attendeesMailTest);
    });

    it('should initialize mail-to-attendees without duplicates', function() {
      var attendees = angular.copy(attendeesTest);

      attendees.push(attendeesTest[1]);

      expect(ctrl.getEmailAddressesFromUsers(attendees)).to.equal(attendeesMailTest);
    });
  });
});
