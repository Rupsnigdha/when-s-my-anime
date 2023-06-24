class AiringDate {
  constructor(offset, cell) {
    this.offset = offset;
    this.cell = cell;
  }
}

function updateTime(dateTimeGMT, offset) {
  let localTime = new Date(dateTimeGMT.getTime() + 3600000 * offset);
  return localTime;
}

function submit() {
  // Getting the GMT Time from the user
  const submittedTime = document.getElementById("airingTimeGMT").value;
  const dateTimeGMT = new Date(submittedTime);

  // Array of objects of different timezones
  const pacificDaylightTime = new AiringDate(-7, "airingTimePDT");
  const centralDaylightTime = new AiringDate(-5, "airingTimeCDT");
  const EasternDaylightTime = new AiringDate(-4, "airingTimeEDT");
  const BritishSummerTime = new AiringDate(+1, "airingTimeBST");
  const centralEuropeanSummerTime = new AiringDate(+2, "airingTimeCEST");
  const indianStandardTime = new AiringDate(+5.5, "airingTimeIST");
  const philippineTime = new AiringDate(+8, "airingTimePHT");
  const japanStandardTime = new AiringDate(+9, "airingTimeJST");
  const australianCentralStandardTime = new AiringDate(+9.5, "airingTimeACST");
  allTimezones = [
    pacificDaylightTime,
    centralDaylightTime,
    EasternDaylightTime,
    BritishSummerTime,
    centralEuropeanSummerTime,
    indianStandardTime,
    philippineTime,
    japanStandardTime,
    australianCentralStandardTime,
  ];

  // Looping through the timezones to create the table
  allTimezones.forEach(function (timezone) {
    let localTime = updateTime(dateTimeGMT, timezone.offset);
    let localTimeData = localTime.toString().split(" ");
    switch (localTimeData[0]) {
      case "Mon":
        localTimeData[0] = "Monday";
        break;
      case "Tue":
        localTimeData[0] = "Tuesday";
        break;
      case "Wed":
        localTimeData[0] = "Wednesday";
        break;
      case "Thu":
        localTimeData[0] = "Thursday";
        break;
      case "Fri":
        localTimeData[0] = "Friday";
        break;
      case "Sat":
        localTimeData[0] = "Saturday";
        break;
      case "Sun":
        localTimeData[0] = "Sunday";
        break;
    }
    switch (localTimeData[1]) {
      case "Jan":
        localTimeData[1] = "January";
        break;
      case "Feb":
        localTimeData[1] = "February";
        break;
      case "Mar":
        localTimeData[1] = "March";
        break;
      case "Apr":
        localTimeData[1] = "April";
        break;
      case "May":
        localTimeData[1] = "May";
        break;
      case "Jun":
        localTimeData[1] = "June";
        break;
      case "Jul":
        localTimeData[1] = "July";
        break;
      case "Aug":
        localTimeData[1] = "August";
        break;
      case "Sep":
        localTimeData[1] = "September";
        break;
      case "Oct":
        localTimeData[1] = "October";
        break;
      case "Nov":
        localTimeData[1] = "November";
        break;
      case "Dec":
        localTimeData[1] = "December";
        break;
    }

    let localTimeString = `${localTimeData[0]}, ${localTimeData[1]} ${localTimeData[2]} ${localTimeData[3]} at ${localTimeData[4]}`;
    document.getElementById(timezone.cell).innerText = localTimeString;
  });
}

function copyTable() {
  let range, selected;

  if (document.createRange && window.getSelection) {
    range = document.createRange();
    selected = window.getSelection();
    selected.removeAllRanges();

    let copiedTable = document.getElementById("results");
    try {
      range.selectNodeContents(copiedTable);
      selected.addRange(range);
    } catch (e) {
      range.selectNode(copiedTable);
      selected.addRange(range);
    }
    document.execCommand("copy");
  }
  selected.removeAllRanges();
}

button = document.getElementById("submit");
button.addEventListener("click", submit);

copy = document.getElementById("copy");
copy.addEventListener("click", copyTable);
