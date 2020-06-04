import React, { Component } from "react";
import axios from "axios";
import "../News.css";

class News_business extends Component {
  state = {
    isLoading: true,
    newsList: [],
  };
  getNews = async () => {
    const news = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    console.log(news);
    this.setState({
      isLoading: false,
      newsList: news.data.articles,
    });
  };
  componentDidMount() {
    this.getNews();
    // check proxy
    axios.get("/api/test").then((response) => console.log(response.data));
  }
  render() {
    const { isLoading, newsList } = this.state;
    return isLoading ? (
      <div className="loading">Loading...</div>
    ) : (
      newsList.map((news, index) => (
        <div className="News__data" key={index}>
          <h3 className="News__title">{news.title}</h3>
          <img className="News__img" src={news.urlToImage} alt={news.title} />
          <hr />
          <div className="News__date">{news.publishedAt.substring(0, 10)}</div>
          <div className="News__time">{news.publishedAt.substring(11, 16)}</div>
          <div className="News__desc">{news.description}</div>
          <a
            className="News__link"
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            See All
          </a>
        </div>
      ))
    );
  }
}

export default News_business;
