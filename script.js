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
  const Japan = new AiringDate(-24, "airingTimeJST");
  const China = new AiringDate(-30, "airingTimeCST");
  allTimezones = [Japan, China];

  // Looping through the timezones to create the table
  allTimezones.forEach(function (timezone) {
    let localTime = updateTime(dateTimeGMT, timezone.offset);

    let localTimeData = localTime.toString().split(" ");
    console.log(localTimeData);
    document.getElementById(timezone.cell).innerText = localTime;
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
