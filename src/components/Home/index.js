import React, { Component, Suspense } from "react";
import { withAuthorization } from "../Session";

import Calculation from "../Calculation";

import Button from "react-bootstrap/Button";

import "./index.css";

const LazyCards = React.lazy(() => import("../CardsHolder"));

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statisticsModels: [],
      showCharts: true,
      date: "",
      lot: "",
      displayCalc: true
    };

    this.handleScroll = this.handleScroll.bind(this);
  }
  myCallback = dataFromChild => {
    this.setState({ statisticsModels: dataFromChild.statisticsModels });

    if (dataFromChild.statisticsModels.length > 0) {
      this.setState({ showCharts: false });
    }
    this.setState({ date: dataFromChild.date });

    this.setState({ lot: dataFromChild.lot });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.firebase
      .backup(this.props.firebase.auth.currentUser.uid)
      .on("value", snapshot => {
        this.setState({
          statisticsModels: snapshot.val().backup,
          lot: snapshot.val().lot,
          date: snapshot.val().backup[0].Date
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.props.firebase.backup().off();
  }

  handleScroll() {
    let scrollTop = window.scrollY;
    if (scrollTop > window.outerHeight / 2 && this.state.displayCalc) {
      window.scrollTo(0, 0);
      this.setState({ displayCalc: false });
    }
  }

  render() {
    return (
      <>
        <div>
          <div
            className="calculation"
            style={{
              display: this.state.displayCalc ? "block" : "none"
            }}
          >
            <Calculation
              callback={this.myCallback}
              statisticsModels={this.state.statisticsModels}
            />
          </div>
          <div
            className="arrowBtn"
            style={{
              display: this.state.displayCalc ? "none" : "flex"
            }}
          >
            <Button
              variant="outline-light"
              onClick={() => this.setState({ displayCalc: true })}
            >
              <i className="arrow up"></i>
            </Button>
          </div>
        </div>

        {this.state.statisticsModels.length > 0 && (
          <>
            <div className="detailsBox">
              <p className="header">Details</p>
              <p>Date: {this.state.date}</p>
              <p>Lot: {this.state.lot}</p>
            </div>
            <Suspense fallback={<div className="loadingCircle"></div>}>
              <LazyCards
                className="center"
                statisticsModels={this.state.statisticsModels}
              />
            </Suspense>
          </>
        )}
      </>
    );
  }
}

const condition = authUser => !!authUser; // user is signed in

export default withAuthorization(condition)(HomePage);
