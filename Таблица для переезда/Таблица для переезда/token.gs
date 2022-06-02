//===============================================================
class Token{
  constructor(){
    this.accessToken = "";
    this.refreshToken = "";
  }
}
//===============================================================
Token.prototype.getAccessToken = function(){

  let request = new Request();
  request.setMethod("post");
  request.setPayload(JSON.stringify())
  request.setHeaders({"Content-Type" : "application/json"});
  request.setUrl(`${url}oauth/token`);

  let message = JSON.parse(UrlFetchApp.fetch(request.url, request.requestOptions));

  this.setAccessToken(message.accessToken);
  this.setRefreshToken(message.refreshToken);
}
//===============================================================
Token.prototype.updateAccessToken = function(){
  
  let request = new Request();
  request.setMethod("post");
  request.setPayload(JSON.stringify({"refreshToken":this.refreshToken}))
  request.setHeaders({"Content-Type" : "application/json"});
  request.setUrl(`${url}oauth/token/refresh`);

  let message = JSON.parse(UrlFetchApp.fetch(request.url, request.requestOptions));

  this.setAccessToken(message.accessToken);
  this.setRefreshToken(message.refreshToken);
}
//===============================================================
Token.prototype.deleteAccessToken = function(){

  let request = new Request();
  request.setMethod("delete");
  request.setHeaders({"Authorization" : "Bearer " +  this.accessToken});
  request.setUrl(`${url}oauth/token`);

  return UrlFetchApp.fetch(request.url, request.requestOptions).getResponseCode();
}
//===============================================================
Token.prototype.setAccessToken = function(accessToken){
  return this.accessToken = accessToken;
}
//===============================================================
Token.prototype.setRefreshToken = function(refreshToken){
  return this.refreshToken = refreshToken;
}
