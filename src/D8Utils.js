import moment from "moment";

export const validDate = (dateData, dateFormat) => {
  let returnDate = moment.utc(dateData).format(dateFormat);
  if (returnDate === "Invalid date") {
    dateData = dateData.split(":");
    returnDate = moment.utc(dateData[0]).format(dateFormat);
    console.log(dateData[1]);
    console.log(dateFormat);
    if (dateData[1] === "00Z" && dateFormat === "h:mm") {
      returnDate = "All day";
    }
  }
  if (returnDate === "Invalid date") {
    returnDate = "";
  }
  return returnDate;
};

//adjusted for D8
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "p.m." : "a.m.";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

export const formatTime = (startTime, endTime) => {
  const formatedStartTime = formatAMPM(
    new Date(
      new Date(
        new Date(startTime).toLocaleString("en-US", {
          timeZone: "UTC",
        })
      )
    )
  );
  const formatedEndTime = formatAMPM(
    new Date(
      new Date(
        new Date(endTime).toLocaleString("en-US", {
          timeZone: "UTC",
        })
      )
    )
  );
  if (startTime === endTime) {
    return formatedStartTime;
  } else {
    return `${formatedStartTime} - ${formatedEndTime}`;
  }
};
