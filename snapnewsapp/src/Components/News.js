import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

    constructor() { //special method used to initialize component's state and bind event handlers
        super(); // insure to call the parent class constructor
        // console.log("Hello I am a constructor from news component");
        this.state = {
            articles: [],
            loading: false
        }
    }

    async componentDidMount() { //lifecycle method jo component render hone k baad call hota hai
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=40ba6ef0291a442f9db8be68fad64c44";
        let data =await fetch(url); //fetching data from the url, fetch() returns a promise
        let parsedData = await data.json(); //converting the data into json format, json() also returns a promise
        console.log(parsedData);
        this.setState({ articles: parsedData.articles }) //updating the state with the fetched data 


    }
    render() {

        return (
            <div className='container my-3'>
                <h1>SnapNews - Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => { //map() highr order function that runs a function on every element of the array and returns a new array
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
