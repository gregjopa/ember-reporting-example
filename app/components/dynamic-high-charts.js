import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({

  dynamicContent: Ember.computed('content', function () {
    var chart = this.get('chart');

    if (chart) {
      // when re-rendered update the chart subtitle and series name
      var repo = this.get('content')[0].name;
      chart.series[0].update({ name: repo }, false);
      chart.setTitle(null, { text: 'Repo: ' + repo }, false);
      chart.redraw();
    }

    return this.get('content');
  }),

  dynamicChartOptions: Ember.computed('chartOptions', function () {
    // when first rendered update the chart subtitle
    var repo = this.get('content')[0].name;
    this.get('chartOptions').subtitle.text = 'Repo: ' + repo;
    return this.get('chartOptions');
  })

});
