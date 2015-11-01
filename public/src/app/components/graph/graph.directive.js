export function GraphDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/graph/graph.html',
    scope: {
    },
    controller: GraphController,
    controllerAs: 'g',
    bindToController: true
  };

  return directive;
}

class GraphController {
  chart;
  chartCursor;
  chartData;
  day;
  firstDate;
  constructor (healthService) {
    'ngInject';
    this.chartData = [];
    this.healthService = healthService;
    this.firstDate = new Date();
    this.day = 0;
      var chart;
      var chartData = [];
      var chartCursor;
      var day = 0;
      var firstDate = new Date();


      firstDate.setDate(firstDate.getDate() - 500);

// generate some random data, quite different range
      function generateChartData() {
          for (day = 0; day < 0; day++) {
              var newDate = new Date(firstDate);
              newDate.setDate(newDate.getDate() + day);

              var visits = Math.round(Math.random() * 40) - 20;

              chartData.push({
                  date: newDate,
                  visits: visits
              });
          }
      }

// create chart
      window.setTimeout(()=> {
              // generate some data first
              generateChartData();

              // SERIAL CHART
              chart = new AmCharts.AmSerialChart();
              chart.pathToImages = "http://www.amcharts.com/lib/images/";
              chart.marginTop = 0;
              chart.marginRight = 10;
              chart.autoMarginOffset = 5;
              chart.zoomOutButton = {
                  backgroundColor: '#000000',
                  backgroundAlpha: 0.15
              };
              chart.dataProvider = chartData;
              chart.categoryField = "date";

              // AXES
              // category
              var categoryAxis = chart.categoryAxis;
              categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
              categoryAxis.minPeriod = "ss"; // our data is daily, so we set minPeriod to DD
              categoryAxis.dashLength = 1;
              categoryAxis.gridAlpha = 0.15;
              categoryAxis.axisColor = "#DADADA";

              // value
              var valueAxis = new AmCharts.ValueAxis();
              valueAxis.axisAlpha = 0.2;
              valueAxis.dashLength = 1;
              chart.addValueAxis(valueAxis);

              // GRAPH
              var graph = new AmCharts.AmGraph();
              graph.title = "flow";
              graph.valueField = "flow";
              graph.bullet = "round";
              graph.bulletBorderColor = "#0352b5";
              graph.bulletBorderThickness = 2;
              graph.lineThickness = 2;
              graph.lineColor = "#0352b5";
              graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
              chart.addGraph(graph);

              // GRAPH
              var graph = new AmCharts.AmGraph();
              graph.title = "Low threshold";
              graph.valueField = "low";
              //graph.bullet = "none";
              graph.bulletBorderColor = "#44e533";
              graph.lineColor = "#44e533";
              graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
              chart.addGraph(graph);

              // GRAPH
              var graph = new AmCharts.AmGraph();
              graph.title = "High threshold";
              graph.valueField = "high";
              graph.bullet = "none";


              graph.lineThickness = 2;
              graph.lineColor = "#bc1928";
              graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
              chart.addGraph(graph);

              // CURSOR
              chartCursor = new AmCharts.ChartCursor();
              chartCursor.cursorPosition = "mouse";
              chart.addChartCursor(chartCursor);

              // SCROLLBAR
              var chartScrollbar = new AmCharts.ChartScrollbar();
              chartScrollbar.graph = graph;
              chartScrollbar.scrollbarHeight = 40;
              chartScrollbar.color = "#FFFFFF";
              chartScrollbar.autoGridCount = true;
              chart.addChartScrollbar(chartScrollbar);

              // WRITE
              chart.write("chartdiv");

              // set up the chart to update every second
              this.healthService.subscribeForUpdates((data)=>{
                  this.healthState = data;
                  // normally you would load new datapoints here,
                  // but we will just generate some random values
                  // and remove the value from the beginning so that
                  // we get nice sliding graph feeling

                  // remove datapoint from the beginning
                  if(chart.dataProvider.length > 120){
                    chart.dataProvider.shift();
                  }

                  //var visits = Math.round(Math.random() * 40) - 20;
                  chart.dataProvider.push({
                      date: new Date(),
                      flow: data.flow,
                      high: data.hi,
                      low: data.lo
                  });
                  chart.validateData();
              })

      }, 2000);
    };
}
