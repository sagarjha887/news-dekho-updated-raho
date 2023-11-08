import React from 'react'

const Newscom=(props)=> {

    let {title , description, imageUrl , newsUrl, author, date,source}= props;
    return (
      <div>
       <div className="card" style={{width:"18rem"}}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}> {source}</span>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body" >
  
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {date}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-dark">Go somewhere</a>
  </div>
</div>
      </div>
    )
  
}

export default Newscom
