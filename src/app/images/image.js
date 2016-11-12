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
        <a href={image.link}><h3 className="truncate" title={image.title}>{image.title}</h3></a>
        <i>{image.author}</i>
        <div>
          {image.tags.map(function(tag, index){
            var searchTermClass = tag.isSearchTerm ? 'is-search-term' : '';
            return (<span key={index} className={'tag tag-info ' + searchTermClass}>{tag.value}</span>);
          })}
        </div>

      </div>

    );
  }
}
