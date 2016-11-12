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

    const internalServerErrorItem = {
      'title': 'Opps, an error occurred with Flickr web service: 502',
      'author': 'System administrator',
      'link': 'javascript:;',
      'media': { 'm': '' },
      'tags': [
        {value: 'error', isSearchTerm: false},
        {value: '502', isSearchTerm: true}
      ]
    };

    jsonp(
      `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=any&jsoncallback=jsonFlickrFeed&tags=${searchTerm}`,
      {param: 'jsoncallback', name: 'jsonFlickrFeed'},
      (err, data) => {
        var images = [];

        try{
          if (err) {
            images = [internalServerErrorItem];
          } else {
            if (data.items == null || data.items.length <= 0) {
              images = [{
                'title': `Opps, your search for ${searchTerm} returned no results`,
                'author': 'System administrator',
                'link': 'javascript:;',
                'media': { 'm': '' },
                'tags': [{value:'no-results', isSearchTerm: true}]
              }];
            } else {
              images = data.items.map(function(item){
                var strTags = item.tags;
                var splitedTags = strTags.split(' ');

                item.tags = splitedTags.map(function(strTag){
                  return { value: strTag, isSearchTerm: strTag == searchTerm ? true : false };
                });

                return item;
              });
            }
          }
        }
        catch(exception) {
          console.log(exception);
          images: [internalServerErrorItem];
        }
        finally {
          self.hideLoading();
        }

        self.setState({images: images});
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
