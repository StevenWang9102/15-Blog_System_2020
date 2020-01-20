import { connect } from 'react-redux';


const InternalfetchInitCommentData = (props) => {
    
    return fetch (`https://conduit.productionready.io/api/articles/:slug?=${props.currentArticleSlug}/comments`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("get comments failed");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const mapStateToProps = state => {
    return { ...state };
  };
  
  const mapDismatchToProps = dispatch => {
    return {};
  };
  
  export const fetchInitCommentData = connect(
    mapStateToProps,
    mapDismatchToProps
  )(InternalfetchInitCommentData);
  