import * as EventEmitter from 'events';

import { HttpMethod, HttpStatus } from '../meta/types/Http';
import { getAccessToken } from './auth';
import { toFormData } from './form';
import { injectParameters } from './urls';

class Api extends EventEmitter {
  GET = this._makeMethod(HttpMethod.GET);
  POST = this._makeMethod(HttpMethod.POST, true);
  PUT = this._makeMethod(HttpMethod.PUT, true);
  DELETE = this._makeMethod(HttpMethod.DELETE);
  PATCH = this._makeMethod(HttpMethod.PATCH, true);

  _makeMethod(method: HttpMethod, hasBody: boolean = false) {
    return (urlTemplate: string, withAuth: boolean = true) => {
      return (data?: any, filesUpload: boolean = false) => {
        const url = injectParameters(urlTemplate, data, hasBody);

        const headers: HeadersInit = {
          Accept: 'application/json',
        };

        let body = null;
        if (hasBody && !filesUpload) {
          headers['Content-Type'] = 'application/json';
          body = JSON.stringify(data);
        } else if (hasBody && filesUpload) {
          body = toFormData(data);
        }

        if (withAuth) {
          headers.Authorization = `JWT ${getAccessToken().token}`;
        }

        return this._makeRequest(method, url, headers, body);
      };
    };
  }

  _makeRequest(
    method: HttpMethod,
    url: string,
    headers: HeadersInit,
    body: string | FormData | null,
  ) {
    const mode = url.includes('authorize') ? 'no-cors' : 'cors'; // TODO fix
    const credentials = url.includes('authorize') ? 'include' : 'omit'; // TODO fix

    return fetch(url, {
      method,
      headers,
      body,
      mode,
      credentials,
    })
      .then((response: any) => {
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
              if (response.ok) {
                return parsedJSON;
              }
              if (response.status >= HttpStatus.SERVER_ERROR) {
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
              if (response.ok) {
                return '';
              }
              return Promise.reject({
                type: 'InvalidJSON',
                status: response.status,
                body: responseBody,
              });
            }
          });
      })
      .catch((err: any) => {
        return err.type
          ? Promise.reject(err)
          : Promise.reject({
              type: 'ConnectionRefused',
              status: HttpStatus.SERVER_ERROR,
              body: { non_field_errors: ['Check your internet connection'] },
            });
      });
  }
}

const instance = new Api();

export default instance;
