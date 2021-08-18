import React, { Component } from "react";
import axios from "axios";
import "./D8Events.css";
import { validDate, formatTime } from "./D8Utils";

class EventItemDefault extends Component {
  render() {
    return (
      <div className="row d8EventRow">
        {/*<div className="d8EventDateContainer">

          <span className="d8EventDateNumber">{validDate(this.props.listNode.very_start_date, 'D')}</span>

          <div className="d8DayOfWeekMonthContainer">
            <span className="d8EventDayOfWeek">{validDate(this.props.listNode.very_start_date, 'dddd')}</span>
            <span className="d8EventMonth">{validDate(this.props.listNode.very_start_date, 'MMMM')}</span>
          </div>

    </div>*/}

        <div className="col-12 col-sm-3 col-md-5 col-lg-3 col-xl-3 d8EventImageContainer">
          {this.props.listNode.image_url !== "" && (
            <a
              href={`${this.props.listNode.alias}/?eventDate=${validDate(
                this.props.listNode.very_start_date,
                "YYYY-MM-DD"
              )}`}
            >
              <img
                src={this.props.listNode.image_url}
                alt={this.props.listNode.title}
                className="img-fluid d8EventImage"
              />
            </a>
          )}
        </div>
        {/*this.props.listNode.campus
          <p>{formatTime(validDate(this.props.listNode.very_start_date,'h:mm'), validDate(this.props.listNode.very_end_date,'h:mm'))}</p>
        */}

        <div className="col-12 col-sm-9 col-md-7 col-lg-9 col-xl-9 d8EventDetailsContainer">
          <p className="d8EventTitle">
            <a
              href={`${this.props.listNode.alias}/?eventDate=${validDate(
                this.props.listNode.very_start_date,
                "YYYY-MM-DD"
              )}`}
            >
              {this.props.listNode.title}
            </a>
          </p>
          <div className="row">
            <div className="col-6 dateTime">
              <span>
                <span
                  class="far icon-small fa-calendar location-icon"
                  title="Address Icon"
                ></span>
              </span>
              <span>
                <div class="alignTextWithIcon">
                  <span>
                    {validDate(this.props.listNode.very_start_date, "dddd")}
                    ,&nbsp;
                  </span>
                  <span>
                    {validDate(this.props.listNode.very_start_date, "MMMM")}
                    &nbsp;
                  </span>
                  <span>
                    {validDate(this.props.listNode.very_start_date, "D")}
                  </span>
                </div>
                <div>
                  <p>
                    {formatTime(
                      this.props.listNode.very_start_date,
                      this.props.listNode.very_end_date
                    )}
                  </p>
                </div>
              </span>
            </div>
            {this.props.listNode.campus && (
              <div className="col-6 d8Location">
                <span
                  class="fas icon-small fa-map-marker-alt location-icon"
                  title="Address Icon"
                ></span>
                <span class="alignTextWithIcon">
                  {this.props.listNode.campus}
                </span>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-6">
              <a
                href={this.props.listNode.ticketing_rsvp_url}
                className="register-link"
              >
                {this.props.listNode.ticketing_rsvp_txt}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class EventItemCard extends Component {
  render() {
    return (
      <div className="col col-12 col-lg-4 eventItemCard">
        <div className="card card-event">
          {!!this.props.listNode.image_url && (
            <a
              href={`${this.props.listNode.alias}/?eventDate=${validDate(
                this.props.listNode.very_start_date,
                "YYYY-MM-DD"
              )}`}
            >
              <div className="d8EventImageTop-wrapper">
                <div className="d8EventImageTop">
                  <img
                    src={this.props.listNode.image_url}
                    alt={this.props.listNode.title}
                    className="card-img-top img-fluid d8EventImage"
                  />
                </div>
              </div>
            </a>
          )}

          <div className="d8EventDetailsContainer">
            <p className="d8EventTitle">
              <a
                href={`${this.props.listNode.alias}/?eventDate=${validDate(
                  this.props.listNode.very_start_date,
                  "YYYY-MM-DD"
                )}`}
              >
                {this.props.listNode.title}
              </a>
            </p>
            <div className="row">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d8StartAndEndEventCard">
                <i className="far fa-calendar"></i>
                <div>
                  <span>
                    {validDate(this.props.listNode.very_start_date, "dddd")},{" "}
                  </span>
                  <span>
                    {validDate(this.props.listNode.very_start_date, "MMMM")}
                    &nbsp;
                  </span>
                  <span>
                    {validDate(this.props.listNode.very_start_date, "D")}
                  </span>
                  <div>
                    {formatTime(
                      this.props.listNode.very_start_date,
                      this.props.listNode.very_end_date
                    )}
                  </div>
                </div>
              </div>
              {this.props.listNode.campus && (
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="d8LocationThreeCards">
                    {this.props.listNode.campus}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class D8Events extends Component {
  state = {
    displayData: [],
  };

  componentDidMount() {
    // const feedURL = 'https://cors-anywhere.herokuapp.com/https://asuevents.asu.edu/feed-json/college-liberal-arts-and-sciences'
    const feedData = this.props.dataFromPage.feed.split(",");
    const feedURL = feedData[0];
    const feedStyle = this.props.dataFromPage.items;
    const feedTags = feedData.shift();
    var feedTagsOr = [];
    var feedTagsNot = [];
    var feedTagsAnd = [];
    for (var i = 0; i < feedData.length; i++) {
      if (feedData[i].charAt(0) == "-") {
        feedTagsNot.push(feedData[i].substring(1).toLowerCase());
      } else if (feedData[i].charAt(0) == "&") {
        feedTagsAnd.push(feedData[i].substring(1).toLowerCase());
      } else if (feedData[i].charAt(0) == "+") {
        feedTagsOr.push(feedData[i].substring(1).toLowerCase());
      }
    }
    console.log(feedData);

    axios.get(feedURL).then((response) => {
      console.log(response.data.nodes);
      var tempDisplayData = response.data.nodes;
      var finalDisplayData = [];
      //console.log(tempDisplayData);

      // Loop through feed nodes and flag them if certain tags are found
      for (var i = 0; i < tempDisplayData.length; i++) {
        tempDisplayData[i].flag = false;
        // Flag NOT tags
        console.log(feedTagsNot);
        for (var j = 0; j < feedTagsNot.length; j++) {
          //console.log(tempDisplayData[i].node.interests);
          //console.log(feedTagsNot[j]);
          if (
            tempDisplayData[i].node.interests
              .toLowerCase()
              .includes(feedTagsNot[j])
          ) {
            tempDisplayData[i].flag = true;
            //console.log("FLAGGING NODE");
            //console.log(tempDisplayData[i]);
          }
          if (
            tempDisplayData[i].node.event_units
              .toLowerCase()
              .includes(feedTagsNot[j])
          ) {
            tempDisplayData[i].flag = true;
          }
          if (
            tempDisplayData[i].node.audiences
              .toLowerCase()
              .includes(feedTagsNot[j])
          ) {
            tempDisplayData[i].flag = true;
          }
        }

        // Flag AND tags
        console.log(feedTagsAnd);
        for (var k = 0; k < feedTagsAnd.length; k++) {
          if (
            tempDisplayData[i].node.interests
              .toLowerCase()
              .includes(feedTagsAnd[k]) == false &&
            tempDisplayData[i].node.event_units
              .toLowerCase()
              .includes(feedTagsAnd[k]) == false &&
            tempDisplayData[i].node.audiences
              .toLowerCase()
              .includes(feedTagsAnd[k]) == false
          ) {
            tempDisplayData[i].flag = true;
          }
        }

        if (tempDisplayData[i].flag == false) {
          finalDisplayData.push(tempDisplayData[i]);
        }
      }

      this.setState({
        displayData: finalDisplayData,
        displayStyle: feedStyle,
        displayNot: feedTagsNot,
      });
    });
  }

  render() {
    var results = this.state.displayData.map((thisNode) => ({
      nid: thisNode.node.nid,
      title: thisNode.node.title,
      image_url: thisNode.node.image_url,
      start_date: thisNode.node.start_date,
      campus: thisNode.node.campus,
      interests: thisNode.node.interests,
      very_start_date: thisNode.node.very_start_date,
      very_end_date: thisNode.node.very_end_date,
      alias: thisNode.node.alias,
      ticketing_rsvp_url: thisNode.node.ticketing_rsvp_url,
      ticketing_rsvp_txt: thisNode.node.ticketing_rsvp_txt,
    }));

    switch (this.state.displayStyle) {
      case "Three":
        return (
          <div className="container">
            {results.slice(0, 3).map((listNode, index) => {
              return (
                <React.Fragment key={index}>
                  <EventItemDefault listNode={listNode} />
                </React.Fragment>
              );
            })}
          </div>
        );
        break;

      case "ThreeCards":
        return (
          <div className="container threeCardsContainer">
            <div className="row">
              {results.slice(0, 3).map((listNode, index) => {
                return (
                  <React.Fragment key={index}>
                    <EventItemCard listNode={listNode} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
        break;

      default:
        return (
          <div className="container">
            {results.map((listNode, index) => {
              return (
                <React.Fragment key={index}>
                  <EventItemDefault listNode={listNode} />
                </React.Fragment>
              );
            })}
          </div>
        );
    }
  }
}

export default D8Events;
