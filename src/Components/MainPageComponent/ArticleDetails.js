import React, { useEffect } from "react";
import { connect } from "react-redux";
import {loadInitArticleDetail} from '../../ReduxStore/FeedDetails/feedActions'
import {
  useParams
} from 'react-router-dom';

const InternalArticleDetails = props => {
  const { slug } = useParams()

  useEffect(() => {
    props.loadInitArticleDetail(slug)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //拿到了评论
  console.log(props.currentComments);
  
  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>

          {/* 文章标题以及作者信息部分 */}
          {props.articleLibrary &&
            props.articleLibrary.map((article, index) => {
              return (
                article.title === props.currentArticleTitle && (
                  <div key={index}>
                    <h1>{article.title}</h1>
                    <div className='article-meta'>
                      <a href='#top'>
                        <img
                          className='author-image'
                          src={article.author.imge}
                          alt='au'
                        />
                      </a>
                      <div className='info'>
                        <a href='#top' className='author'>
                          {article.author.username}
                        </a>
                        <span className='date'>{article.author.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>

      {/* 文章内容部分 */}
      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12 article-detail'>
            {props.articleLibrary &&
              props.articleLibrary.map((article, index) => {
                return (
                  article.title === props.currentArticleTitle && (
                    <div key={index}> {article.body} </div>
                  )
                );
              })}
          </div>
        </div>
        <hr/>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDismatchToProps = dispatch => {
  return {
    loadInitArticleDetail: (slug) => dispatch(loadInitArticleDetail(slug))
  };
};

export const ArticleDetails = connect(
  mapStateToProps,
  mapDismatchToProps
)(InternalArticleDetails);
