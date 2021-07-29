import React, { Component } from 'react';
import moment from 'moment';


export const validDate = (dateData, dateFormat) => {
  let returnDate = moment.utc(dateData).format(dateFormat);
  if(returnDate === "Invalid date") {
    dateData = dateData.split(':');
    returnDate = moment.utc(dateData[0]).format(dateFormat);
    console.log(dateData[1]);
    console.log(dateFormat);
    if(dateData[1] === "00Z" && dateFormat === 'h:mm') {
      returnDate = "All day";
    }
  }
  if(returnDate === "Invalid date") {
    returnDate = "";
  }
  return returnDate;
}

//adjusted for D8
export const formatTime = (startTime, endTime) => {
  if(startTime === endTime) {
    return startTime;
  }
  else {
    return startTime.slice(11, 16) + " - " + endTime.slice(11, 16);
  }
}

