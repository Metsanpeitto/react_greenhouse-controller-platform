const defaultInputs = {
  //days-in-veg,days-in-flo-hour-on-veg-hour-on-flo,water-temp-max,water-temp-min,water-ph-max,water-ph-min
  // ,tamp-max,temp-min,humi-max,humi-min

  daysinveg: {
    value: 15,
    comment: "How many days in vegetative"
  },
  daysinflo: {
    value: 45,
    comment: "How many days in flowering"
  },
  houronveg: {
    value: 22,
    comment: "Time when lights go On"
  },
  houronflo: {
    value: 22,
    comment: "Time when lights go Off"
  },
  watertempmax: {
    value: 24,
    comment: "Maximun temperature before Alarm"
  },
  watertempmin: {
    value: 10,
    comment: "Limit to switch-On the water heater"
  },
  waterphmax: {
    value: 7,
    comment: "Maximun PH before Alarm"
  },
  waterphmin: {
    value: 6,
    comment: "Minimun Ph before Alarm"
  },
  tempmax: {
    value: 24,
    comment: "Trigger to switch-On the Fan"
  },
  tempmin: {
    value: 18,
    comment: "Minimun temperature before Alarm"
  },
  humimax: {
    value: 80,
    comment: "Maximun humidity before Alarm"
  },
  humimin: {
    value: 40,
    comment: "Minimun humidity before Alarm"
  }
};

export default defaultInputs;
