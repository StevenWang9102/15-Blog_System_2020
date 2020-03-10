import React from "react";
import { Link } from "react-router-dom";

export const SettingForm = ({
    image,
    name,
    bio,
    email,
    passWord,
    setImage,
    setName,
    setBio,
    setEmail,
    setPassWord,
    setLoading,
    onUpdateSettingClicked,
    logOutButtonClicked,
    removeUserFromSession
}) => {
  return (
    <form>
      <fieldset className='form-group'>
        <input
          className='form-control'
          type='text'
          onChange={event => setImage(event.target.value)}
          value={image}
          placeholder='URL of profile picture'></input>
      </fieldset>

      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          type='text'
          onChange={event => setName(event.target.value)}
          value={name}
          placeholder='Your Name'></input>
      </fieldset>

      <fieldset className='form-group'>
        <textarea
          className='form-control form-control-lg'
          onChange={event => setBio(event.target.value)}
          value={bio}
          rows='8'
          placeholder='Short bio about you'></textarea>
      </fieldset>

      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          onChange={event => setEmail(event.target.value)}
          value={email}
          type='text'
          placeholder='Email'></input>
      </fieldset>

      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          type='password'
          onChange={event => setPassWord(event.target.value)}
          value={passWord}
          placeholder='Password'></input>
      </fieldset>

      <button
        className='btn btn-lg btn-primary pull-xs-right'
        type='button'
        onClick={() => {
          setLoading("LOADING");
          onUpdateSettingClicked({
            image,
            name,
            bio,
            email,
            passWord
          });
        }}>
        Update Settings
      </button>

      <hr className='hr-setting' />

      <Link to='/home' className='logout-button'>
        <button
          type='button'
          className='btn btn-lg btn-danger'
          onClick={() => {
            removeUserFromSession();
            logOutButtonClicked("log_out");
          }}>
          click here to logout
        </button>
      </Link>
    </form>
  );
};
