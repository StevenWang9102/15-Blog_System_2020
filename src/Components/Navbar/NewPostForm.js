import React, {useState} from "react";

export const NewPostForm = props => {
  const [alertText, setAlertText] = useState("");

  return (
    <form>
      <fieldset>
        {/* ------- Article Title ------- */}
        <fieldset className='form-group'>
          <input
            type='text'
            className='form-control form-control-lg'
            onChange={event => props.setTitle(event.target.value)}
            value={props.title}
            placeholder='Article Title'></input>
        </fieldset>

        {/* ------- Article Description ------- */}
        <fieldset className='form-group'>
          <input
            type='text'
            className='form-control'
            value={props.description}
            onChange={event => props.setDescription(event.target.value)}
            placeholder="What's this article about?"></input>
        </fieldset>

        {/* ------- Article Content ------- */}
        <fieldset className='form-group'>
          <textarea
            className='form-control'
            rows='8'
            value={props.content}
            onChange={event => props.setContent(event.target.value)}
            placeholder='Write your article (in markdown)'></textarea>
        </fieldset>

        {/* ------- Article Tags ------ */}
        <fieldset className='form-group'>
          <input
            type='text'
            className='form-control'
            value={props.tags}
            onChange={event => props.setTags(event.target.value)}
            placeholder='Enter tags'></input>
          <div className='tag-list'></div>
        </fieldset>

        <button
          className='btn btn-lg pull-xs-right btn-primary'
          type='button'
          onClick={() => {
            if(props.title.length===0||props.description.length===0||props.content.length===0||props.tags.length===0){
              setAlertText("* every input can not be blank")
            }else{
              props.setLoading("LOADING");
              props.onPostArticleClicked(
              props.title,
              props.description,
              props.content,
              props.tags,
              props.currentSlug
            );}
          }}>
          Publish Article
        </button>
        <div className='sign_Alert'> {alertText} </div>
      </fieldset>
    </form>
  );
};
