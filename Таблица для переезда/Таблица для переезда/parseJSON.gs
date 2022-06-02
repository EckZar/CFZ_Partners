function parseJSON(obj){

    obj.internship ? obj : obj.internship = {
                                              "plannedDate": "",
                                              "status": "",
                                              "darkstoreTitle": "", 
                                              "role": ""
                                            };

    return [
            `${obj.name.lastName} ${obj.name.firstName} ${obj.name.middleName}`.replace("undefined", ""),// ФИО сотрудника с удалением undefined подстрок,
            obj.mobile,
            findMasks(obj.staffPartner),
            parseDateDate(obj.internship.plannedDate),
            parseDateTime(obj.internship.plannedDate),
            statusCodes[obj.internship.status],
            obj.internship.darkstoreTitle,
            role[obj.internship.role],
            transport[obj.vehicle.type],
            obj.internship.status == "rejected" ? rejectionReasonsCodes[obj.internship.rejectionReason] : obj.internship.status == "failed" ? failureReasonsCodes[obj.internship.failureReason] : "",
            obj.darkstoreCity,
            obj.darkstoreTitle,            
            parseDateDate(obj.profileCreatedAt),
            parseDateDate(obj.stateModifiedAt)
          ] 

}

//🟩 Работает🟥 Перестал работать

function parseJSONEmployee(obj){

    return [
              `${obj.name.lastName} ${obj.name.firstName} ${obj.name.middleName}`.replace("undefined", ""), // ФИО сотрудника с удалением undefined подстрок
              obj.darkstoreTitle, // ЦФЗ 
              obj.darkstoreCity, // Город
              findMasks(obj.staffPartner), // Аутсорсер
              obj.profileCreatedAt, // Дата создания УЗ
              obj.internship ? "Да": "Нет", // Наличие стажировки
              obj.mobile, // Телефон
              obj.state == "working" ? "🟩 Работает" : "", // Статус Работает если поле state == working, для работающих поле state может возвращать "new", тогда оставляем значение пустым
              obj.vehicle ? transport[obj.vehicle.type] : "", // Транспорт
              "",
              "",
              obj.stateModifiedAt // Дата изменения статуса
            ];
}

function parseJSONNotEmployee(obj){

    return [
              `${obj.name.lastName} ${obj.name.firstName} ${obj.name.middleName}`.replace("undefined", ""),// ФИО сотрудника с удалением undefined подстрок,
              obj.darkstoreTitle, // ЦФЗ
              obj.darkstoreCity, // Город
              findMasks(obj.staffPartner), // Аутсорсер
              obj.stateModifiedAt, // Дата изменения статуса
              obj.mobile, // Телефон
              "🟥 Перестал работать", // Статус
              obj.vehicle ? transport[obj.vehicle.type] : "", // Транспорт
              "",
              "",
              obj.profileCreatedAt, // Дата создание УЗ
              obj.inactivityReason ? fireReason[obj.inactivityReason] : "", // Причина увольнения
              obj.internship ? "Да": "Нет" // Наличие стажировки
            ]; 
}

function parseDateDate(date){

  if(date)
  {
    date = new Date(date);
  }
  else
  {
    return ""
  }

  date = new Date(date);
  return date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
}

function parseDateTime(date){
  
  if(date)
  {
    date = new Date(date);
  }
  else
  {
    return ""
  }

  let minutes = date.getMinutes(); 
  minutes == 0 ? minutes = "00" : minutes;
  return date.getHours() + ":" + minutes;
}





