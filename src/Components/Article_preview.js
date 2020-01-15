import React from "react";
import { connect } from "react-redux";

const ArticlePreview = props => {
  console.log(props.articleLibrary);

  return (
    <div>
      <div class='container page'>
        <div class='row'>
          <div class='col-md-9'>
            <div class='feed-toggle'>
              <ul class='nav nav-pills outline-active'>
                <li class='nav-item'>
                  <a class='nav-link active' href=''>
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            {props.articleLibrary &&
              props.articleLibrary.map((article, index) => {
                console.log(article);
                return (
                  <div class='article-preview' key={index}>
                    <div class='article-meta'>
                      <a href='profile.html'>
                        <img src={article.author.image} alt='author' />
                      </a>
                      <div class='info'>
                        <a href='' class='author'>
                          {article.author.username}
                        </a>
                        <span class='date'>{article.updatedAt}</span>
                      </div>
                      <button class='btn btn-outline-primary btn-sm pull-xs-right'>
                        <i class='ion-heart'></i> {article.favoritesCount}
                      </button>
                    </div>
                    <a href='' class='preview-link'>
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state }; // 暂时@@@
};

const mapDismatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDismatchToProps)(ArticlePreview);
