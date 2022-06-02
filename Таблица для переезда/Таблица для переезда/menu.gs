//=================================================================================
//==============Добавляем кнопку МЕНЮ в панель инструментов========================
//==============если у кого возникнет необходимост ручного=========================
//==============обновления списка сотрудников======================================
//=================================================================================
function menu() {
  SpreadsheetApp.getUi().createMenu("__MENU__")
  .addItem("Выгрузить список работающих", "updateEmployeesSheets")
  .addItem("Выгрузить список НЕ работающих", "updateNotEmployeesSheet")
  .addItem("Выгрузить нарушения", "updateViolationsSheet")
  .addToUi();
}
