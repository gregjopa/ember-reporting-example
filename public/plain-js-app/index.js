$(document).ready(function () {

  // default repo
  var repo = 'emberjs/ember.js';

  var draw = function (repo) {
    report.getData(repo, function (err, data) {
      if (err) {
        throw new Error(err);
      }
      report.drawChart(data, repo);
      report.drawTable(data);
    });
  };

  // initially draw the chart and table with default params
  draw(repo);


  // redraw the chart and table when select list changes
  $('#repo-list').change(function () {
    var repo = $(this).find('option:selected').val();
    draw(repo);
  });

});


var report = {

  chart: null,

  getData: function (repo, callback) {

    var params = {
      url: 'https://api.github.com/repos/' + repo + '/stats/commit_activity',
      dataType: 'json',
      method: 'GET'
    };

    $.ajax(params)
      .then(function (data) {

        var formattedData = [];

        data.forEach(function (record) {
          var week = moment.unix(record.week).format('MM/DD/YYYY');
          formattedData.push([week, record.total]);
        });

        callback(null, formattedData);

      })
      .fail(function (jqXHR, textStatus) {
        console.log('failed!');
        callback(new Error(textStatus));
      });

  },

  drawChart: function (data, repo) {

    var chart = $('#chart').highcharts();

    // check if chart already exists
    if (chart) {
      chart = $('#chart').highcharts();

      // update series data and titles
      chart.series[0].update({ name: repo, data: data }, false);
      chart.setTitle(null, { text: 'Repo: ' + repo }, false);
      chart.redraw();

    }
    else {
      $('#chart').highcharts({
        title: {
          text: 'GitHub Commits',
          x: -20
        },
        subtitle: {
          text: 'Repo: ' + repo,
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
        },
        series: [{
          name: repo,
          data: data
        }],
        credits: {
          enabled: false
        }
      });

    }

  },

  drawTable: function (data) {

    var $table = $('#table');
    $table.html('');

    var tableHeading = '<thead><tr><th>Week</th><th># of Commits</th></tr></thead>';

    var tableBody = '<tbody>';
    data.forEach(function (record) {
      tableBody += '<tr><td>' + record[0] + '</td><td>' + record[1] + '</td></tr>';
    });
    tableBody +='</tbody>';

    $table.append(tableHeading + tableBody);

  }

};
