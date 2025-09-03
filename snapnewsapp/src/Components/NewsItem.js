import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, time, source, author } = this.props;
    return (

      <div>
        <div className="card my-3">
           <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'90%'}}>{source}
              <span className="visually-hidden">unread messages</span>
            </span>
          <img src={imageUrl} className="card-img-top" alt="no img" />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className=" text-body-danger">{author} {new Date(time).toUTCString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-light">Read More</a>
            {/* <span href={newsUrl} target='_blank' className="btn btn-sm text-bg-light">Read More</span> */}
          </div>
        </div>
      </div>
    )
  }
}
