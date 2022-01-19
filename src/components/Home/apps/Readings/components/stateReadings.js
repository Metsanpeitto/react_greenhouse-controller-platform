const stateReadings = {
  headerValue: "",
  json: [],
  readings: {
    temp: "23",
    humi: "50",
    wTemp: "18",
    wPh: "6"
  },
  promiseIsResolved: "false",
  dataLineTemperature: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Temperature",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(20, 255, 100)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(20, 255, 100)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [20, 22, 24, 27, 23, 20, 18]
      },
      {
        label: "Water Temperature",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(0, 0, 255)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(0, 0, 255)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [18, 19, 20, 22, 21, 20, 19]
      }
    ]
  }
};
export default stateReadings;
