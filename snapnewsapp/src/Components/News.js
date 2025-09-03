import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner1';
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizefirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) { //special method used to initialize component's state and bind event handlers
        super(props); // insure to call the parent class constructor
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizefirstletter(this.props.category)}- Headlines`
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url); //fetching data from the url, fetch() returns a promise
        this.props.setProgress(30);
        let parsedData = await data.json(); //converting the data into json format, json() also returns a promise
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        }) //updating the state with the fetched data 
        this.props.setProgress(100);

    }
    fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 seconds
        this.setState({ page: this.state.page + 1 }, async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url); //fetching data from the url, fetch() returns a promise
            let parsedData = await data.json(); //converting the data into json format, json() also returns a promise
            console.log(parsedData);
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            }) //updating the state with the fetched data 
        });
    }

    async componentDidMount() { //lifecycle method jo component render hone k baad call hota hai
        this.updateNews();
        this.props.setProgress(0);

    }
    render(){

        return(
            
                <div className='container my-3'>
                    <h1 className="text-center p-2 text-black " style={{ margin: '25px 0px' }}> SnapNews - Top {this.capitalizefirstletter(this.props.category)} Headlines</h1>
                    {this.state.loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div>
                            <div className="row">
                                {this.state.articles.map((element) => { //map() highr order function that runs a function on every element of the array and returns a new array
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://ichef.bbci.co.uk/news/1024/branded_news/15d1/live/177c76f0-86b9-11f0-84c3-3f41d5d4c3e3.jpg"} newsUrl={element.url} time={element.publishedAt} source={element.source.name} author={element.author} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>

                </div>
        )
    }
}
