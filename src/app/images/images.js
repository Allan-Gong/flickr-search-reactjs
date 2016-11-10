import React, {Component} from 'react';

import {Image} from './image';

import Masonry from 'react-masonry-component';

export class Images extends Component {
  
  render() {
    if ( this.props.images.length <= 0 ) { return null; }

    var masonryOptions = {
      columnWidth:'.masonry-brick',
      'gutter': 0,
      transitionDuration: 500
    };

    return (
        <Masonry
          className={'row masonry-container'}
          options={masonryOptions}
          elementType={'div'}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >

          {this.props.images.map((image, index) => {
            return (
              <div key={index} className="col-md-3 col-sm-6 masonry-brick">
                <Image data={image} />
              </div>
            );
          })}

      </Masonry>
    );
  }
}
