import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
        country : "in",
        pageSize: 9,
        category : "general",
    }

    static propTypes = {
        category : PropTypes.string,
        pageSize: PropTypes.number,
        country : PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
     
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e5a7702bb6d4786a4427f4570e612e8&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsetDate = await data.json();
        console.log(parsetDate);
        this.setState({ 
            articles: parsetDate.articles,
            totalResults: parsetDate.totalResults,
            loading:false})
            
    }

    handlePreviousClick = async () => {
        console.log("Pre is clicked");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e5a7702bb6d4786a4427f4570e612e8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsetDate = await data.json();
        console.log(parsetDate);
        this.setState({
            page: this.state.page - 1,
            articles: parsetDate.articles,
            loading:false
        })
    }
    handleNextClick = async () => {
        console.log("Next button is clicked");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e5a7702bb6d4786a4427f4570e612e8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsetDate = await data.json();
            console.log(parsetDate)
            this.setState({
                page: this.state.page + 1,
                articles: parsetDate.articles,
                loading:false
            })


        }
    }
        
        render() {
            return (
                <>
                    <div className="container my-4">
                        <h1 className="text-center">NewsApp - Top Headlines.</h1>
                        {this.state.loading && <Spinner />}
                        <div className='row'>
                            {!this.state.loading && this.state.articles.map((element)=>{
                                return <div className='col-md-4' key={element.url}>
                                    <NewsItem title={element.title?element.title:""} discription={element.description?element.description:""} imageUrl={element.urlToImage ? element.urlToImage : "https://mc.webpcache.epapr.in/mcms.php?size=large&in=https://mcmscache.epapr.in/post_images/website_350/post_20721242/full.jpg"} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between fs-3 my-4 mx-5'>
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}> &larr; &larr; Previous</button>
                        <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr; &rarr;</button>
                    </div>
                </>
            );
        }
    }

export default News;
