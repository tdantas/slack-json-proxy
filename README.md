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

 every path you request will be mapped to PROXY_ENDPOINT/PATH  
 
 
```  
 PROXY_ENDPOINT=http://example.com   
 
 https://example.com/api/api.test  -> https://example.com/api/api.test   
 https://example.com/auth.test    -> https://example.com/auth.test   

```


