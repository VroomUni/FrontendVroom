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
    return new Date().toISOString().slice(0, 10).replace("T", " ");
  } else if (selectedDateType === "tomorrow") {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10).replace("T", " ");
  } else if (selectedDateType === "customDate") {
    return customDate.toISOString().slice(0, 10).replace("T", " ");
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
  // Extract hours considering local time zone and adjust for GMT+1
  const hours = preFormattedTime.getHours() + 1;

  // Create a new Date object with adjusted hours in UTC
  const updatedDate = new Date(preFormattedTime.setHours(hours));

  // Convert to ISO 8601 string and extract the time portion (slice for desired format)
  return updatedDate.toISOString().slice(11, 19);
};

module.exports = {
  fromToObjBuilder,
  dateObjBuilder,
  daysRecurrenceObjBuilder,
  timeObjBuilder,
};
