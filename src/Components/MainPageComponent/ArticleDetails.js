import React from 'react';
import { connect } from 'react-redux';

const InternalArticleDetails = props => {

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">

{/* 标题部分 */}
          {props.articleLibrary &&
            props.articleLibrary.map((article, index) => {
              if (article.title === props.currentArticleTitle) {
                return (
                  <div key={index}>
                    <h1>{article.title}</h1>
                    <div className="article-meta">
                      <a href="#top">
                        <img className="author-image" src={article.author.imge} alt="au" />
                      </a>
                      <div className="info">
                        <a href="#top" className="author">
                          {article.author.username}
                        </a>
                        <span className="date">{article.author.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                );
              } else return <div> </div>;
            })}
        </div>
      </div>

{/* 内容部分 */}
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12 article-detail">
              {props.articleLibrary &&
                props.articleLibrary.map((article, index) => {
                  if (article.title === props.currentArticleTitle) {
                    return <div key={index}> {article.body} </div>;
                  } else return <div> </div>
                })}
          </div>
        </div>
        <hr/>

{/* 评论部分 */}
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows="3"></textarea>
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                  alt="author"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="#top" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                    alt="author"
                  />
                </a>
                &nbsp;
                <a href="#top" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit"></i>
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDismatchToProps = dispatch => {
  return {};
};

export const ArticleDetails = connect(
  mapStateToProps,
  mapDismatchToProps
)(InternalArticleDetails);
