import { UploadRequestOption, UploadRequestError, UploadProgressEvent } from "./interface";

function getError(option: UploadRequestOption, xhr: XMLHttpRequest) {
    const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`;
    const err = new Error(msg) as UploadRequestError;
    err.status = xhr.status;
    err.method = option.method;
    err.url = option.action;
    return err;
  }
  
  function getBody(xhr: XMLHttpRequest) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }
  
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }
  
  export default function upload(option: UploadRequestOption) {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
  
    if (option.onProgress && xhr.upload) {
      xhr.upload.onprogress = function progress(e: UploadProgressEvent) {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100;
        }
        option.onProgress&&option.onProgress(e);
      };
    }
  
    // eslint-disable-next-line no-undef
    const formData = new FormData();
  
    if (option.data) {
      Object.keys(option.data).forEach(key => {
        const value = (option.data as any)[key];
        // support key-value array data
        if (Array.isArray(value)) {
          value.forEach(item => {
            // { list: [ 11, 22 ] }
            // formData.append('list[]', 11);
            formData.append(`${key}[]`, item);
          });
          return;
        }
  
        formData.append(key, (option.data as any)[key]);
      });
    }
  
    // eslint-disable-next-line no-undef
    if (option.file instanceof Blob) {
      formData.append(option.filename as string, option.file, option.file.name);
    } else {
      formData.append(option.filename as string, option.file);
    }
  
    xhr.onerror = function error(e) {
     option.onError&&option.onError(e);
    };
  
    xhr.onload = function onload() {
 
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError&&option.onError(getError(option, xhr), getBody(xhr));
      }
  
      return option.onSuccess&&option.onSuccess(getBody(xhr), xhr);
    };
  
    xhr.open(option.method, option.action, true);
  
    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }
  
    const headers = option.headers || {};
  

    if (headers['X-Requested-With'] !== null) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
  
    Object.keys(headers).forEach(h => {
      if (headers[h] !== null) {
        xhr.setRequestHeader(h, headers[h]);
      }
    });
  
    xhr.send(formData);
  
    return {
      abort() {
        xhr.abort();
      },
    };
  }