function updateEmployeesSheets() {  // Функция обновления списка листов работающих курьеров

  // Отправляем параметры для запроса в getStaffers и получаем списки работающих сотрудников
  let working = getStaffers("cities=UFA&cities=NCH&cities=TLT&cities=SAM&cities=KZ", "&stafferStates=working&stafferStates=new");
  
  // удаление прошлых записей
  clearSheet(workingEmployees);   
  
  // Возвращенные списки сотрдуников преобразуем в двумерный массик для заполнения таблицы
  working = working.map(obj => parseJSONEmployee(obj)).filter(row => row[0] != "undefined"); // Фильтруем массив по полю ФИО что бы удалить строки где ФИО undefined

  // Полученный массив вставляем на лист "Работающие курьеры"
  workingEmployees.getRange(2, 1, working.length, working[0].length).setValues(working);
  try{
    deleteEmptyRows(workingEmployees);
  }
  catch(e){}

}

function updateNotEmployeesSheet(){ // Функция обновления списка листов не работающих курьеров

  // Отправляем параметры для запроса в getStaffers и получаем списки не работающих сотрудников
  let notWorking = getStaffers("cities=UFA&cities=NCH&cities=TLT&cities=SAM&cities=KZ", "&stafferStates=not_working");

  clearSheet(notWorkingloyees);   

  // Похожая ситуация и с неработающими сотрудниками, есть пара отличий
  notWorking = notWorking.map(obj => parseJSONNotEmployee(obj)).filter(row => row[0] != "undefined"); // Фильтруем массив по полю ФИО что бы удалить строки где ФИО undefined
  
  // Полученный массив вставляем на лист "Неработающие курьеры"
  try
  {
    notWorkingloyees.getRange(2, 1, notWorking.length, notWorking[0].length).setValues(notWorking);
    deleteEmptyRows(notWorkingloyees);
  }  
  catch(e){}

}

//🟩 Работает🟥 Перестал работать

// Функция очищает листы работающие и неработающие курьеры
function clearSheet(sheet){    
  try{
    sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).clear();
  }
  catch(e){} 
}

function findMasks(outsorse){
  try{
    outsorse = outsorse.split("_"); // Лидер Консалт_КНД => ["Лидер Консалт", "КНД"]
    let mask = masks.filter(function(row){ return outsorse[0] == row[0]}) // Ищем имя аутсорса в массиве по первому столбцу  
    mask.length>0 ? mask = mask[0][1] + "_" + outsorse[1] : mask = outsorse.join("_");    
    return  mask;
  }
  catch(e){return outsorse + "_!"}
}

function updateViolationsSheet(){ // Функция обновления списка нарушений сотрудниками на листе нарушения

  Logger.log("Start");

  clearSheet(violationsSheet);

  let violations = getViolations("cities=UFA&cities=NCH&cities=TLT&cities=SAM&cities=KZ");

  violations = violations.map(obj => [
                obj.violationDate,
                obj.violationTitle,
                obj.isViolationCritical === "yes" ? "Да":"Нет",
                obj.violationComment,
                obj.fullName,// ФИО сотрудника с удалением undefined подстрок,
                obj.darkstoreTitle, // ЦФЗ                
                findMasks(obj.staffPartner), // Аутсорсер
                obj.darkstoreCity, // Город
              ]);

  try{
  violationsSheet.getRange(2, 1, violations.length, violations[0].length).setValues(violations);
  deleteEmptyRows(violationsSheet);
  }
  catch(e){}
}


function deleteEmptyRows(sheet){
  let length = sheet.getRange("A:A").getValues().filter(cell => cell != "").length;
  let nums = sheet.getMaxRows() - length;
  sheet.deleteRows(length+1, nums);
}

function updateInternshipSheet(){

  // Отправляем параметры для запроса в getStaffers и получаем списки работающих сотрудников
  let stuffers = getStaffers("cities=UFA&cities=NCH&cities=TLT&cities=SAM&cities=KZ", "&stafferStates=working&stafferStates=not_working&stafferStates=new");
  
  // удаление прошлых записей
  clearSheet(internshipSheet);
  
  // Возвращенные списки сотрдуников преобразуем в двумерный массив для заполнения таблицы
  stuffers = stuffers.filter(obj => obj.internship); 

  // Logger.log(stuffers);

  stuffers = stuffers.map(obj => parseJSON(obj))

  try{
  internshipSheet.getRange(2, 1, stuffers.length, stuffers[0].length).setValues(stuffers);
  deleteEmptyRows(internshipSheet);
  }
  catch(e){}
}
