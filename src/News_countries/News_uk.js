import React, { Component } from "react";
import axios from "axios";
import "../News.css";
class News_uk extends Component {
  state = {
    isLoading: true,
    newsList: [],
  };
  getNews = async () => {
    const news = await axios.get(
      "http://newsapi.org/v2/top-headlines?country=gb&apiKey=f05aeb66554641759b60756e50c16608"
    );
    console.log(news);
    this.setState({
      isLoading: false,
      newsList: news.data.articles,
    });
  };
  componentDidMount() {
    this.getNews();
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
          <div className="News__date">{news.publishedAt}</div>
          <div className="News__desc">{news.description}</div>
          <a className="News__link" href={news.url}>
            See All
          </a>
        </div>
      ))
    );
  }
}

export default News_uk;
