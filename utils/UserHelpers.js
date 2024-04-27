const isPreferenceAttrMatch = (attribute, driverPref, passengerPref) => {
  //if passenger pref on the given attr is null , then he doesnt care => match
  if (passengerPref[attribute] === null) {
    return true;
  }
  return driverPref[attribute] === passengerPref[attribute];
};

const enumeratePreferences = (attribute, isYesOrNo) => {
  let value;
  switch (attribute) {
    case "boysOnly":
      value = "Boys Only";
      break;
    case "girlsOnly":
      value = "Girls Only";
      break;
    case "foodFriendly":
      value = isYesOrNo ? "Food" : "No Food";
      break;
    case "smoking":
      value = isYesOrNo ? "Smoking" : "No Smoking";
      break;
    case "talkative":
      value = isYesOrNo ? "Talkative" : "Not Talkative";
      break;
    case "loudMusic":
      value = isYesOrNo ? "Loud Music" : "No Loud Music";
      break;
    default:
      value = "Unknown Attribute";
  }
  return value;
};

module.exports = { isPreferenceAttrMatch, enumeratePreferences };
