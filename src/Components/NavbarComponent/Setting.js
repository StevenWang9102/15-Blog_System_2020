import React from "react";
import { connect } from "react-redux";

const InternalSetting = props => {
  return (
    <div className='auth-page'>
      <div class='settings-page'>
        <div class='container page'>
          <div class='row'>
            <div class='col-md-6 offset-md-3 col-xs-12'>
              <h1 class='text-xs-center'>Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset class='form-group'>
                    <input
                      class='form-control'
                      type='text'
                      placeholder='URL of profile picture'></input>
                  </fieldset>
                  <fieldset class='form-group'>
                    <input
                      class='form-control form-control-lg'
                      type='text'
                      placeholder='Your Name'></input>
                  </fieldset>
                  <fieldset class='form-group'>
                    <textarea
                      class='form-control form-control-lg'
                      rows='8'
                      placeholder='Short bio about you'></textarea>
                  </fieldset>
                  <fieldset class='form-group'>
                    <input
                      class='form-control form-control-lg'
                      type='text'
                      placeholder='Email'></input>
                  </fieldset>
                  <fieldset class='form-group'>
                    <input
                      class='form-control form-control-lg'
                      type='password'
                      placeholder='Password'></input>
                  </fieldset>
                  <button class='btn btn-lg btn-primary pull-xs-right'>
                    Update Settings
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export const Setting = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSetting);
