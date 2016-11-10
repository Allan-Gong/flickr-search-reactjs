import React, {Component} from 'react';
import jsonp from 'jsonp';
import {Header} from './header';
import {Footer} from './footer';
import {Images} from './images/images';

export class Main extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      showLoading: false
    };

    // this.searchImages = this.searchImages.bind(this);
    // this.showLoading = this.showLoading.bind(this);
    // this.hideLoading = this.hideLoading.bind(this);

  }

  showLoading = () => {
    this.setState({showLoading: true});
  }

  hideLoading = () => {
    this.setState({showLoading: false});
  }

  searchImages = (event) => {

    console.log('searchImages() called');

    var self = this;

    self.showLoading();

    var searchTerm = event.target.value;

    if (searchTerm.length < 3) { return; }

    jsonp(
      'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=any&jsoncallback=jsonFlickrFeed&tags=' + searchTerm,
      {param: 'jsoncallback', name: 'jsonFlickrFeed'},
      function (err, data) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(data);
          self.setState({images: data.items});
        }
      }
    );
  }

  render() {
    return (

      <div className="container">

        <Header searchImages={this.searchImages} />
        <Images images={this.state.images} hideLoading={this.hideLoading} />

        { this.state.showLoading ? <div className="loading">Loading&#8230;</div> : null }

      </div>

    );
  }
}
