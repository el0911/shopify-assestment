import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  getPhotos(page) {
    try {
      this.props.ta()
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    if (this.state.mount) {
      this.setState({
        mount: false
      })
      return
    }

    this.setState({
      mount: true
    })

    this.getPhotos();
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      //   const lastPhoto = this.state.photos[this.state.photos.length - 1];
      //   const curPage = lastPhoto.albumId;
      this.getPhotos();
      //   this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  render() {

    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="container">
        <div style={{ minHeight: "800px" }}>
          {/* {this.state.photos.map(user => (
            <img src={user.url} height="100px" width="200px" />
          ))} */}
          {this.props.children}
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default ScrollComponent;