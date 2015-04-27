import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({

  contentDidChange: Ember.observer('content.@each.isLoaded', function() {
    var chart = this.get('chart');

    if (chart) {
      // when re-rendered update the chart subtitle and series name
      var repo = this.get('content')[0].name;
      chart.series[0].update({ name: repo, data: this.get('content')[0].data }, false);
      chart.setTitle(null, { text: 'Repo: ' + repo }, false);
      chart.redraw();
    }

  })

});
