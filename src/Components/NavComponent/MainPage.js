import React from "react";

const MainPage = props => {
  return (
    <div>
    
      <div class='home-page'>
        <div class='banner'>
          <div class='container'>
            <h1 class='logo-font'>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class='container page'>
          <div class='row'>
            <div class='col-md-9'>
              <div class='feed-toggle'>
                <ul class='nav nav-pills outline-active'>
                  <li class='nav-item'>
                    <a class='nav-link disabled' href='https://www.baidu.com/'>
                      Your Feed
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a class='nav-link active' href='https://www.baidu.com/'>
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <div class='article-preview'>
                <div class='article-meta'>
                  <a href='profile.html'>
                    <img src='http://i.imgur.com/Qr71crq.jpg' alt=''/>
                  </a>
                  <div class='info'>
                    <a href='https://www.baidu.com/' class='author'>
                      Eric Simons
                    </a>
                    <span class='date'>January 20th</span>
                  </div>
                  <button class='btn btn-outline-primary btn-sm pull-xs-right'>
                    <i class='ion-heart'></i> 29
                  </button>
                </div>
                <a href='https://www.baidu.com/' class='preview-link'>
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div class='article-preview'>
                <div class='article-meta'>
                  <a href='profile.html'>
                    <img src='http://i.imgur.com/N4VcUeJ.jpg' alt="img"/>
                  </a>
                  <div class='info'>
                    <a href='https://www.baidu.com/' class='author'>
                      Albert Pai
                    </a>
                    <span class='date'>January 20th</span>
                  </div>
                  <button class='btn btn-outline-primary btn-sm pull-xs-right'>
                    <i class='ion-heart'></i> 32
                  </button>
                </div>
                <a href='https://www.baidu.com/' class='preview-link'>
                  <h1>
                    The song you won't ever stop singing. No matter how hard you
                    try.
                  </h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>
            </div>

            <div class='col-md-3'>
              <div class='sidebar'>
                <p>Popular Tags</p>

                <div class='tag-list'>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    programming
                  </a>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    javascript
                  </a>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    emberjs
                  </a>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    angularjs
                  </a>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    react
                  </a>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    mean
                  </a>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    node
                  </a>
                  <a href='https://www.baidu.com/' class='tag-pill tag-default'>
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
