// @flow
import { injectParameters } from './urls';
import { getAccessToken } from './auth';
import EventEmitter from 'events';

class Api extends EventEmitter {
  GET = this._makeMethod('get');
  POST = this._makeMethod('post', true);
  PUT = this._makeMethod('put', true);
  DELETE = this._makeMethod('delete');
  PATCH = this._makeMethod('patch', true);

  _makeMethod(method: string, hasBody: boolean = false) {
    return (urlTemplate: string, withAuth: boolean = true) => {
      return (data: any, filesUpload: boolean = false) => {
        const url = injectParameters(urlTemplate, data, hasBody);

        let headers: Object = {
          Accept: 'application/json',
        };

        let body: string;
        if (hasBody && !filesUpload) {
          headers['Content-Type'] = 'application/json';
          body = JSON.stringify(data);
        } else if (hasBody && filesUpload) {
          body = data;
        }

        if (withAuth) {
          headers['Authorization'] = `JWT ${getAccessToken().token}`;
        }

        return this._makeRequest(method, url, headers, body);
      };
    };
  }

  _makeRequest(method: string, url: string, headers: Object, body: ?any) {
    const mode = url.includes('authorize') ? 'no-cors' : 'cors'; // TODO fix
    const credentials = url.includes('authorize') ? 'include' : 'omit'; // TODO fix
    return fetch(url, { method, headers, body, mode, credentials: credentials })
      .then(response => {
        this.emit(`${response.status}`, url);
        return new Promise(resolve => resolve(response.text()))
          .catch(err => {
            Promise.reject({
              type: 'NetworkError',
              status: response.status,
              message: err,
            });
          })
          .then((responseBody: any) => {
            try {
              const parsedJSON = JSON.parse(responseBody);
              if (response.ok) return parsedJSON;
              if (response.status >= 500) {
                return Promise.reject({
                  type: 'ServerError',
                  status: response.status,
                  body: parsedJSON,
                });
              }
              if (response.status <= 501) {
                return Promise.reject({
                  type: 'ApplicationError',
                  status: response.status,
                  body: parsedJSON,
                });
              }
            } catch (e) {
              if (response.ok) return '';
              return Promise.reject({
                type: 'InvalidJSON',
                status: response.status,
                body: responseBody,
              });
            }
          });
      })
      .catch(err => {
        return err.type
          ? Promise.reject(err)
          : Promise.reject({
              type: 'ConnectionRefused',
              status: 500,
              body: { non_field_errors: ['Check your internet connection'] },
            });
      });
  }
}

const instance = new Api();

export default instance;
