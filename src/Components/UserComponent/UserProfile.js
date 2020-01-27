import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const UserProfile = props => {
  const { userName } = useParams();
  console.log(userName);


  
  // useparm可以取到用户姓名
  // 请求了2次



  useEffect(() => {
    props.loadUserProfileDetail(userName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div class='profile-page'>

      {/* 用户信息 */}
      <div class='user-info'>
        <div class='container'>
          <div class='row'>
            <div class='col-xs-12 col-md-10 offset-md-1'>
              <img
                src='http://i.imgur.com/Qr71crq.jpg'
                class='user-img'
                alt='au'
              />
                <h4>{userName}</h4>
              <p>
                Cofounder @GoThinkster, lived in Aol's HQ for a few months,
                kinda looks like Peeta from the Hunger Games
              </p>
              <button class='btn btn-sm btn-outline-secondary action-btn'>
                <i class='ion-plus-round'></i>
                &nbsp; Follow Eric Simons
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            {/* 副导航 */}
            <div class='articles-toggle'>
              <ul class='nav nav-pills outline-active'>
                <li class='nav-item'>
                  <a class='nav-link active' href=''>
                    My Articles
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href=''>
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {/* 一篇文章,此处需要循环map */}
            <div class='article-preview'>
              <div class='article-meta'>
                <a href=''>
                  <img src='http://i.imgur.com/Qr71crq.jpg' alt='au' />
                </a>
                <div class='info'>
                  <a href='' class='author'>
                    Eric Simons
                  </a>
                  <span class='date'>January 20th</span>
                </div>
                <button class='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i class='ion-heart'></i> 29
                </button>
              </div>
              <a href='' class='preview-link'>
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
