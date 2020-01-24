/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadInitArticleDetail } from "../../ReduxStore/FeedDetails/feedActions";
import { useParams } from "react-router-dom";

const InternalArticleDetails = props => {
  const { slug } = useParams();

  useEffect(() => {
    props.loadInitArticleDetail(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //拿到了评论
  //评论内容不对劲。。。。。。。。。。。。。@@@@
  console.log(props.currentComments.comments);

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
                console.log(article);
                
                return (
                  article.title === props.currentArticleTitle && (
                    <div key={index}> {article.body} </div>
                  )
                );
              })}
          </div>
        </div>
        <hr />
        {/* 文章对应的评论部分 */}
        <div className='row'>
        <div className='col-xs-12 col-md-8 offset-md-2'>
          <div className='card'>
            <div className='card-block'>
              <p className='card-text'>
                {/* 此处不确定内容对不对@@@@@@@@@@ */}
                {props.currentComments.comments && props.currentComments.comments.body}
              </p>
            </div>
            <div className='card-footer'>
              <a href='' className='comment-author'>
                <img
                  src='http://i.imgur.com/Qr71crq.jpg'
                  className='comment-author-img'
                />
              </a>
              &nbsp;
              <a href='' className='comment-author'>
                {article.author.username}
              </a>
              <span className='date-posted'>Dec 29th</span>
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
  return {
    loadInitArticleDetail: slug => dispatch(loadInitArticleDetail(slug))
  };
};

export const ArticleDetails = connect(
  mapStateToProps,
  mapDismatchToProps
)(InternalArticleDetails);
