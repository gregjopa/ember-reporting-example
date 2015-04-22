import Ember from 'ember';
import ajax from 'ic-ajax';

var IndexRoute = Ember.Route.extend({

  queryParams: {
    repo: {
      refreshModel: true
    }
  },

  model: function (params) {
    var repo = params.repo || 'emberjs/ember.js';

    var ajaxParams = {
      url: 'https://api.github.com/repos/' + repo + '/stats/commit_activity',
      dataType: 'json',
      method: 'GET'
    };

    return ajax(ajaxParams)
      .then(function (data) {
        return data;
      });
  }

});

export default IndexRoute;
