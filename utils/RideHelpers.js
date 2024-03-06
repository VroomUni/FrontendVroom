const fromToObjBuilder = (isToSmu, destinationOrOrigin) => {
  if (isToSmu) {
    return { from: destinationOrOrigin, to: "SMU" };
  } else {
    return { from: "SMU", to: destinationOrOrigin };
  }
};

const dateObjBuilder = (selectedDateType, customDate) => {
  if (selectedDateType === "today") {
    new Date().toISOString().slice(0, 19).replace("T", " ");
  } else if (selectedDateType === "tomorrow") {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      initialDate: tomorrow.toISOString().slice(0, 19).replace("T", " "),
    };
  } else if (selectedDateType === "customDate") {
    return {
      initialDate: customDate.toISOString().slice(0, 19).replace("T", " "),
    };
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

module.exports = { fromToObjBuilder, dateObjBuilder, daysRecurrenceObjBuilder };
