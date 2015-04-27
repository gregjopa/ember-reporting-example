/* global moment:true */

import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['repo'],
  repo: 'emberjs/ember.js',

  chartData: Ember.computed('model', function () {
    var chartData = {
      name: this.get('repo'),
      data: []
    };

    this.get('model').forEach(function (record) {
      var week = moment.unix(record.week).format('MM/DD/YYYY');
      chartData.data.push([week, record.total]);
    });

    return [chartData];
  }),

  chartOptions: Ember.computed('model', function () {
    return {
      title: {
        text: 'GitHub Commits',
        x: -20
      },
      subtitle: {
        text: 'Repo: ' + this.get('repo'),
        x: -20
      },
      xAxis: {
        title: {
          text: 'Week'
        },
        type: 'category'
      },
      yAxis: {
        title: {
          text: '# of Commits'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      }
    };
  })

});
