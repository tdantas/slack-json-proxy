[![Build Status](https://travis-ci.org/tdantas/slack-json-proxy.svg?branch=master)](https://travis-ci.org/tdantas/slack-json-proxy)

# slack-json-proxy

Slack JSON Proxy will map your `JSON payload` to `application/x-www-form-urlencoded`

### configure
 update `.env` file
  
   ```
     PROXY_ENDPOINT=https://slack.com/api
     PORT=3000
   ```

### start

  ```
  npm start
  ```
  
### test

  ```
  npm test
  ```
  
### How the mapping works ?

 every `path` you request will be mapped to PROXY_ENDPOINT/`path`  
 
 
```  
 PROXY_ENDPOINT=http://slack.com/api   
 
 https://host/api/api.test  -> https://slack.com/api/api.test   
 https://host/auth.test    -> https://slack.com/auth.test   

```


