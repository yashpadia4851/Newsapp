import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, discription, imageUrl, newsUrl, date, author,source } = this.props;
        return (
            <div className='my-4 back-wrapper'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="position-absolute top-0 translate-middle badge rounded-pill bg-info text-dark" style={{left:"80%", zIndex:"1"}}>
                            {source}

                        </span></h5>
                        <p className="card-text">{discription}.</p>
                        <p className='card-text'><small className='fs-6 text-primary'>By {!author ? "Unknown" : author} On {date}</small></p>
                        <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
