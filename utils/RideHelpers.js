const fromToObjBuilder = (isToSmu, destinationOrOrigin) => {
  if (isToSmu) {
    return { from: destinationOrOrigin, to: "SMU" };
  } else {
    return { from: "SMU", to: destinationOrOrigin };
  }
};

const dateObjBuilder = (selectedDateType, customDate) => {
  // console.log("date type =" + selectedDateType);
  // console.log("date value =" + customDate);

  if (selectedDateType === "today") {
    return new Date();
  } else if (selectedDateType === "tomorrow") {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);
    return tomorrow;
  } else if (selectedDateType === "customDate") {
    return customDate;
  }
};

const daysRecurrenceObjBuilder = days => {
  //count how many recurrent days
  const trueRecurrentDays = Object.keys(days).filter(day => days[day]);
  if (trueRecurrentDays.length === 0) {
    return { type: "once" };
  } else if (trueRecurrentDays.length === 7) {
    return { type: "everyday" };
  }
  return {
    type: "weekly",
    daysOfWeek: Object.fromEntries(trueRecurrentDays.map(day => [day, true])),
  };
};

const timeObjBuilder = preFormattedTime => {
// Extract hours, minutes, and seconds
const hours = String(preFormattedTime.getHours()).padStart(2, '0'); // padStart ensures two digits
const minutes = String(preFormattedTime.getMinutes()).padStart(2, '0');
const seconds = String(preFormattedTime.getSeconds()).padStart(2, '0');

// Format time in 24-hour mode
const time24h = `${hours}:${minutes}:${seconds}`;
  return time24h
};

module.exports = {
  fromToObjBuilder,
  dateObjBuilder,
  daysRecurrenceObjBuilder,
  timeObjBuilder,
};
