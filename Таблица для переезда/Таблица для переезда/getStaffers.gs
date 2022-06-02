//================================================================================
//================Собираем список сотрудников из указанных городов(cities)========
//================в зависимости от статуса(status) работает или не работает=======
//================================================================================
function getStaffers(cities, status){

  let token = new Token();
  token.getAccessToken();

  var request = new Request();
  request.setMethod("get");
  request.setHeaders({"Authorization" : "Bearer " +  token.accessToken})

  let pageMark = "";
  let employees = [];

  do{
    
    request.setUrl(``);
    try{
      var message = JSON.parse(UrlFetchApp.fetch(request.url, request.requestOptions).getContentText());    
    }
    catch(e){
      token.updateAccessToken();
      request.setHeaders({"Authorization" : "Bearer " +  token.accessToken});      
      var message = JSON.parse(UrlFetchApp.fetch(request.url, request.requestOptions).getContentText());
    }
    employees = employees.concat(message.staffers);
    pageMark = message.paging.hasMore ? "&pageMark="+message.paging.nextPageMark : "";
  }
  while(pageMark)

  let deleteToken = token.deleteAccessToken();

  Logger.log(`Результат удаления токена - ${deleteToken}`);

  return employees;

}


function getViolations(cities){

  let token = new Token();
  token.getAccessToken();

  var request = new Request();
  request.setMethod("get");
  request.setHeaders({"Authorization" : "Bearer " +  token.accessToken})

  let pageMark = "";
  let violations = [];

  do{
    
    request.setUrl(``);
    try{
      var message = JSON.parse(UrlFetchApp.fetch(request.url, request.requestOptions).getContentText());    
    }
    catch(e){
      Logger.log(e);
      token.updateAccessToken();
      request.setHeaders({"Authorization" : "Bearer " +  token.accessToken});      
      var message = JSON.parse(UrlFetchApp.fetch(request.url, request.requestOptions).getContentText());
    }

    violations = violations.concat(message.violations);
    pageMark = message.paging.hasMore ? "&pageMark="+message.paging.nextPageMark : "";
  }
  while(pageMark)

  let deleteToken = token.deleteAccessToken();

  Logger.log(`Результат удаления токена - ${deleteToken}`);

  return violations;

}




