import React, {Component} from 'react';
import jsonp from 'jsonp';
import {Header} from './header';
import {Images} from './images/images';

export class Main extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      showLoading: false
    };
  }

  showLoading = () => {
    this.setState({showLoading: true});
  }

  hideLoading = () => {
    this.setState({showLoading: false});
  }

  searchImages = (event) => {
    const self = this;

    const searchTerm = event.target.value;

    if (searchTerm.length < 3) {
      self.setState({images: []});
      return;
    }

    self.showLoading();

    jsonp(
      `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=any&jsoncallback=jsonFlickrFeed&tags=${searchTerm}`,
      {param: 'jsoncallback', name: 'jsonFlickrFeed'},
      (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(data);
          self.setState({images: data.items});
        }
        self.hideLoading();
      }
    );
  }

  render() {
    return (

      <div className="container">

        <Header handleChange={this.searchImages}/>
        <Images images={this.state.images}/>

        {this.state.showLoading ? <div className="loading">Loading&#8230;</div> : null}

      </div>

    );
  }
}
