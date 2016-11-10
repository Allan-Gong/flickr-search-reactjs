import React, {Component} from 'react';

export class Image extends Component {
  render() {
    var image = this.props.data;
    if ( image == null ) { return null; }

    return (

      <div className="thumbnail">

        <a href={image.link}>
          <img className="img-responsive" src={image.media.m} alt={image.title} />
        </a>
        <a href={image.link}><h3 className="truncate">{image.title}</h3></a>
        <i>{image.author}</i>
        <div>
          {image.tags.map(function(tag, index){
            return (<span key={index} className="tag tag-info">{tag}</span>);
          })}
        </div>

      </div>

    );
  }
}
