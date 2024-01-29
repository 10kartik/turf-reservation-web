const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

const timeSlotsArray = [
  "6-7",
  "7-8",
  "8-9",
  "9-10",
  "10-11",
  "11-12",
  "12-13",
  "13-14",
  "14-15",
  "15-16",
  "16-17",
  "17-18",
  "18-19",
  "19-20",
  "20-21",
  "21-22",
];

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class coreConstants {
  get apiDomain() {
    return process.env.REACT_APP_API_DOMAIN || "http://localhost:8080";
  }
}

const coreConstantsObj = new coreConstants();

module.exports = { timeSlotsArray, monthsArray, daysArray, coreConstantsObj };
