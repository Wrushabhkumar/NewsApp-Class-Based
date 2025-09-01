import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner1';


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

    constructor() { //special method used to initialize component's state and bind event handlers
        super(); // insure to call the parent class constructor
        // console.log("Hello I am a constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() { //lifecycle method jo component render hone k baad call hota hai
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40ba6ef0291a442f9db8be68fad64c44&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url); //fetching data from the url, fetch() returns a promise
        let parsedData = await data.json(); //converting the data into json format, json() also returns a promise
        console.log(parsedData);
        this.setState({ articles: parsedData.articles,
             totalResults: parsedData.totalResults,
             loading: false
             }) //updating the state with the fetched data 


    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40ba6ef0291a442f9db8be68fad64c44&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {
        }
        else {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40ba6ef0291a442f9db8be68fad64c44&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }
    render() {

        return (
            <div className='container my-3'>
                <h1 className="text-center p-2 bg-danger text-black " style={{margin: '25px 0px'}}>SnapNews - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => { //map() highr order function that runs a function on every element of the array and returns a new array
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage? element.urlToImage:"https://s.yimg.com/ny/api/res/1.2/uAN0SsD9f4WgV9P7…ar_mechanics_642/593ab0802c75668b28821326cdae6dbf"} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>

                </div>
            </div>
        )
    }
}
