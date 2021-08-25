import React, { Component, Fragment } from "react";
import axios from "axios";
import "./D8Events.css";
import { validDate, formatTime } from "./D8Utils";

class EventItemDefault extends Component {
  render() {
    const campus = (this.props.listNode.campus || "").trim();

    return (
      <div className="row d8EventRow">
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
            {!!campus && (
              <div className="col-6 d8Location">
                <span
                  class="fas icon-small fa-map-marker-alt location-icon"
                  title="Address Icon"
                ></span>
                <span class="alignTextWithIcon">{campus}</span>
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
    const campus = (this.props.listNode.campus || "").trim();

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
              {!!campus && (
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="d8LocationThreeCards">{campus}</div>
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
    let feedTagsOr = [];
    let feedTagsNot = [];
    let feedTagsAnd = [];
    for (let i = 0; i < feedData.length; i++) {
      if (feedData[i].charAt(0) == "-") {
        feedTagsNot.push(feedData[i].substring(1).toLowerCase());
      } else if (feedData[i].charAt(0) == "&") {
        feedTagsAnd.push(feedData[i].substring(1).toLowerCase());
      } else if (feedData[i].charAt(0) == "+") {
        feedTagsOr.push(feedData[i].substring(1).toLowerCase());
      }
    }

    axios.get(feedURL).then((response) => {
      let tempDisplayData = response.data.nodes;
      let finalDisplayData = [];

      // Loop through feed nodes and flag them if certain tags are found
      for (let i = 0; i < tempDisplayData.length; i++) {
        tempDisplayData[i].flag = false;
        // Flag NOT tags
        for (let j = 0; j < feedTagsNot.length; j++) {
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
          if (
            tempDisplayData[i].node.event_topics
              .toLowerCase()
              .includes(feedTagsNot[j])
          ) {
            tempDisplayData[i].flag = true;
          }
        }

        // Flag AND tags
        for (let k = 0; k < feedTagsAnd.length; k++) {
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
    const results = this.state.displayData.map((thisNode) => ({
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

    const { displayStyle } = this.state;
    const {
      moreButtonLabel,
      moreButtonUrl,
      moreButtonColor,
      title = "Events",
    } = this.props.dataFromPage;

    const buttonUrl = moreButtonUrl || "https://news.asu.edu/";
    const buttonLabel = moreButtonLabel || "More events";
    const buttonColor = moreButtonColor || "gold";

    let eventList = results;
    let containerClasses = "";
    let headerClasses = "";
    let EventComponet = EventItemDefault;

    switch (displayStyle) {
      case "Three":
        eventList = results.slice(0, 3);
        containerClasses = "threeContainer";
        headerClasses = "p-0";
        EventComponet = EventItemDefault;
        break;

      case "ThreeCards":
        eventList = results.slice(0, 3);
        containerClasses = "threeCardsContainer";
        EventComponet = EventItemCard;
        break;
    }

    return (
      <div className={"container " + containerClasses}>
        <div className={`col d8EventListHeader ${headerClasses}`}>
          <h2>{title}</h2>
          <a
            className={`btn btn-${buttonColor} d8MoreButton`}
            role="button"
            href={buttonUrl}
          >
            {buttonLabel}
          </a>
        </div>
        <div className="contentContainer">
          {eventList.map((listNode, index) => {
            return (
              <Fragment key={index}>
                <EventComponet listNode={{ ...listNode }} />
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default D8Events;
