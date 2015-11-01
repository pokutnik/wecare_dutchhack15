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
              var flowGraph = new AmCharts.AmGraph();
          flowGraph.title = "flow";
          flowGraph.valueField = "flow";
          flowGraph.bullet = "round";
          flowGraph.bulletBorderColor = "#0352b5";
          flowGraph.bulletBorderThickness = 2;
          flowGraph.lineThickness = 5;
          flowGraph.lineColorField = "linecolor";
          flowGraph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
          chart.addGraph(flowGraph);

              // GRAPH
              var lo = new AmCharts.AmGraph();
                lo.title = "Low threshold";
                lo.valueField = "low";
              //graph.bullet = "none";
          lo.bulletBorderColor = "#44e533";
          lo.lineColor = "#44e533";
          lo.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
              chart.addGraph(lo);

              // GRAPH
              var hi = new AmCharts.AmGraph();
              hi.title = "High threshold";
              hi.valueField = "high";
              hi.bullet = "none";
              hi.lineThickness = 2;
              hi.lineColor = "#bc1928";
              hi.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
              chart.addGraph(hi);

              // CURSOR
              chartCursor = new AmCharts.ChartCursor();
              chartCursor.cursorPosition = "mouse";
              chart.addChartCursor(chartCursor);

              // SCROLLBAR
              var chartScrollbar = new AmCharts.ChartScrollbar();
              chartScrollbar.graph = hi;
              chartScrollbar.scrollbarHeight = 40;
              chartScrollbar.color = "#FFFFFF";
              chartScrollbar.autoGridCount = true;
              chart.addChartScrollbar(chartScrollbar);

              // WRITE
              chart.write("chartdiv");

              // set up the chart to update every second
              this.healthService.subscribeForUpdates((data)=>{
                  this.healthState = data;

                  //search for raw emotions in the emotion sentence string
                  this.emotion = data.emotion.split(";")[0].replace(/\s+/g, '');
                  let color;
                  //TODO alpha verhouding tot emotie?
                  switch (this.emotion){
                      case "Happy" :
                            color = "#44e533";
                          break;
                      case "Angry" :
                          color = "#bc1928";
                      default:
                          color = "#0352b5";
                          break;
                  }

                  // remove datapoint from the beginning
                  if(chart.dataProvider.length > 300){
                    chart.dataProvider.shift();
                  }

                  //var visits = Math.round(Math.random() * 40) - 20;
                  let point = {
                      date: new Date(),
                      flow: data.flow,
                      high: data.hi,
                      low: data.lo,
                      linecolor: color
                  };

                  chart.dataProvider.push(point);
                  chart.validateData();
              })

      }, 2000);
    };
}
