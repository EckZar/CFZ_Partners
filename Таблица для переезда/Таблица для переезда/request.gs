class Request{
  constructor(){
    this.requestOptions = {
                            method:"",
                            headers:"",
                            payload:""
                          };
    this.url = "";
  }
}
//===============================================================
Request.prototype.setMethod = function(method){  
  return this.requestOptions.method = method;
}
//===============================================================
Request.prototype.setHeaders = function(header){
  return this.requestOptions.headers = header
}
//===============================================================
Request.prototype.setPayload = function(payload){
  return this.requestOptions.payload = payload
}
//===============================================================
Request.prototype.setUrl = function(url){
  return this.url = url;
}
