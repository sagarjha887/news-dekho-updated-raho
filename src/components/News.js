import React, { Component } from 'react'
import Newscom from './Newscom'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
// import { render } from "react-dom";
// import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: 'general',
  }
  static propTypes = {
    category: PropTypes.string,
  }
  uppercaseFirstLetter=(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  constructor(props){
    super(props);
    this.state={
      articles: [],
      page:1,
      loading:false,
      totalResults:0
     
    }
    
    document.title = `${this.uppercaseFirstLetter(this.props.category)}-NewsDekho`;
  }
    async componentDidMount(){
      this.props.setProgress(10);
     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=bd1ef4c2ca614bc5b3c49fb0e5b0ee43&page=1 &pageSize=10`;
     this.setState({loading:true});
     let data= await fetch(url);
      let parseddata=  await data.json()
      this.props.setProgress(75);
      console.log(parseddata);
    this.setState({articles: parseddata.articles , totalResults:parseddata.totalResults , loading:false})
    this.props.setProgress(100);
  }
  privClick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=bd1ef4c2ca614bc5b3c49fb0e5b0ee43&page=${this.state.page-1}&pageSize=10`;
    this.setState({loading:true});
    let data= await fetch(url);
   
      let parseddata=  await data.json()
      console.log(parseddata);
    // this.setState({articles: parseddata.articles})
    this.setState({
      page: this.state.page-1,
      articles: parseddata.articles,
      loading:false
      })
  }
  nextClick=async()=>{
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){}
    else{
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=bd1ef4c2ca614bc5b3c49fb0e5b0ee43&page=1&pageSize=10`;
    this.setState({loading:true});
    let data= await fetch(url);
      let parseddata=  await data.json()
      console.log(parseddata);
    // this.setState({articles: parseddata.articles})
this.setState({
page: this.state.page+1,
articles: parseddata.articles,
loading:false
})
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center my-5 margin-top: 10rem;">Top Headlines on-{this.uppercaseFirstLetter(this.props.category)}</h1>
        {this.state.loading &&<Spinner/>}
        <div className="row">
        {/* <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.lenght!=this.state.totalResults}
          loader=<Spinner/>
        > */}
             
          
       { this.state.articles.map((element)=>{
          return <div className="col md-4" key={element.url}>
          <Newscom title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} source={element.source.name} author={element.author} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div> 
        })}
         {/* </InfiniteScroll> */}
        </div>
       
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark " onClick={this.privClick}>&laquo; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark " onClick={this.nextClick}>Next &raquo;</button>
        
      </div>
      </div>

    )
  }
}

export default News
