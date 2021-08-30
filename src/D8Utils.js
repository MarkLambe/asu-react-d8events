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
function standardizeTime(date) {
  let standardizedDate = date.split("T");
  standardizedDate =
    standardizedDate.length > 1
      ? standardizedDate.join("T")
      : `${standardizedDate[0].split(":")[0]}T00:00:00Z`;
  return standardizedDate;
}

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
  let formatedStartTime = standardizeTime(startTime);
  let formatedEndTime = standardizeTime(endTime);
  formatedStartTime = formatAMPM(
    new Date(
      new Date(
        new Date(formatedStartTime).toLocaleString("en-US", {
          timeZone: "UTC",
        })
      )
    )
  );
  formatedEndTime = formatAMPM(
    new Date(
      new Date(
        new Date(formatedEndTime).toLocaleString("en-US", {
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
