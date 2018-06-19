import React from 'react';
import MainContent from './MainContent';
import withTracker from '../hocs/GoogleAnalytics';
import { BaseRoute, AuthRoute } from './Route';
import {
  rootPath,
  peoplePath,
  loginPath,
  settingsPath,
  registerPath,
  passwordResetPath,
  confirmationSentPath,
  galleryPath,
  albumsPath,
} from '../lib/paths';
import { Switch } from 'react-router-dom';
import Loadable from './common/Loadable';

const AsyncAlbum = Loadable({
  loader: () => import('./modules/Album'),
});

const AsyncHome = Loadable({
  loader: () => import('./modules/Home'),
});

const AsyncLogin = Loadable({
  loader: () => import('./modules/Auth/Login'),
});

const AsyncRegister = Loadable({
  loader: () => import('./modules/Auth/Register'),
});

const AsyncPasswordResetTrigger = Loadable({
  loader: () => import('./modules/Auth/PasswordResetTrigger'),
});

const AsyncPasswordResetConfirm = Loadable({
  loader: () => import('./modules/Auth/PasswordResetConfirm'),
});

const AsyncPasswordReset = Loadable({
  loader: () => import('./modules/Auth/PasswordReset'),
});

const AsyncSettinngs = Loadable({
  loader: () => import('./modules/Settings'),
});

const AsyncPerson = Loadable({
  loader: () => import('./modules/Person'),
});

const AsyncGallery = Loadable({
  loader: () => import('./GalleryTypeApp'),
});

export default () => {
  return (
    <Switch>
      <BaseRoute exact path={rootPath} component={withTracker(AsyncHome)} />

      <BaseRoute exact path={loginPath} component={withTracker(AsyncLogin)} />
      <BaseRoute exact path={registerPath} component={withTracker(AsyncRegister)} />
      <BaseRoute
        exact
        path={passwordResetPath}
        component={withTracker(AsyncPasswordResetTrigger)}
      />
      <BaseRoute
        exact
        path={confirmationSentPath}
        component={withTracker(AsyncPasswordResetConfirm)}
      />
      <BaseRoute
        exact
        path={`${passwordResetPath}/:uid/:token`}
        component={withTracker(AsyncPasswordReset)}
      />
      <MainContent>
        <AuthRoute exact path={galleryPath} component={withTracker(AsyncGallery)} />
        <AuthRoute exact path={`${peoplePath}/:identity_id`} component={withTracker(AsyncPerson)} />
        <AuthRoute exact path={settingsPath} component={withTracker(AsyncSettinngs)} />
        <AuthRoute exact path={`${albumsPath}/:album_id`} component={withTracker(AsyncAlbum)} />
      </MainContent>
    </Switch>
  );
};
