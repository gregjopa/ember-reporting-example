/* global moment:true */

import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (unixTimestamp) {
  return moment.unix(unixTimestamp).format('MM/DD/YYYY');
});
