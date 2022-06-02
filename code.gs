function onOpen(){

  SpreadsheetApp.getUi()
  .createMenu("__MENU__")
  .addItem("openDialogPartner", "openDialogPartner")
  .addToUi()
  
}

//==========================================================================================
//====================Добавить нового партнера в список ЦФЗ=================================
//==========================================================================================
function addPartner(cityName="", id="", cityShortName="", partnerName="") {

  let space = String.fromCharCode(10);  
  let isLastCol = false;

  id = "НСБ";
  partnerName = "testPartnerName";

  let rows = cfzSheet.getRange(1, 1, 1, cfzSheet.getLastColumn()).getValues();
  let col = cfzSheet.getRange(1, 2, cfzSheet.getLastRow(), 1).getValues();

  let column = 0;

  let lastColumn = rows[0].filter(function(e){ return e.indexOf(id) >=0 }).length > 0 ? 0 : cfzSheet.getLastColumn();

  if(lastColumn > 0)
  {
    column = lastColumn+1;
    cfzSheet.insertColumnsAfter(lastColumn, 5);
    isLastCol = true;
  }

  if(lastColumn == 0)
  {
    for(let i = 0 ; i < rows[0].length ; i++)
    {
      if(rows[0][i].indexOf(id)>=0)
      {
        column = i-1;        
        cfzSheet.insertColumns(column, 5);
        break;
      }
    }
  }
  
  let rowEnd = 0;

  let rowStart = col.map(function(arr, i)
                        { 
                          return { 
                                  "name":arr[0], 
                                  "index": i+1
                                 }
                        })
                    .filter(function(e)
                        { 
                          return e.name != "" && e.name == id;
                        })
                    .map(function(obj)
                        { 
                          return obj.index;
                        })[0];



  for(let i = rowStart ; i < col.length ; i++)
  {
    if(col[i][0] != "" || (i+1) == cfzSheet.getLastRow())
    {
      rowEnd = i+1;
      (i+1) == cfzSheet.getLastRow() ? rowEnd++ : rowEnd; 
      break;
    }
  }
  

  let annotation = cfzSheet.getRange(1, column+2).setValue(partnerName + "_" + id).getA1Notation().replace(/1/, "$1");
  
  Logger.log("Параметры для создания новой компании: " + space + "cityName: " + cityName + space + "id: " + id + space + "cityShortName: " + cityShortName + space + "partnerName: " + partnerName + space + space +
             "Вставляем начиная с колонки: " + annotation + space + 
             "Начало строки: " + rowStart + space +
             "Конец строки: " + rowEnd
              );

  if(rowStart == cfzSheet.getLastRow()) { return; } 

  // return;

  let aOne = annotation.replace(/\$1/,"");
  let aTwo = cfzSheet.getRange(1, column+3).getA1Notation().replace(/1/,"");  

  let aa = cfzSheet.getRange(1, column).getA1Notation().replace(/1/,"");
  let bb = cfzSheet.getRange(1, column+4).getA1Notation().replace(/1/,"");

  Logger.log(aa + " <> " + bb);

  cfzSheet.getRange(2, column+2, 1, 2).setValues([["есть", "нужно"]]);
  cfzSheet.getRange(rowStart+1, column, 1, 2).setFormulas([["=ARRAYFORMULA($A$" + (rowStart+1) + ":$A$" + (rowEnd-1) + ")", "=ARRAYFORMULA($D$" + (rowStart+1) + ":$D$" + (rowEnd-1) + " & " + annotation + ")"]]);

  let formulasOne = [];
  let zeros = [];
  let formulasTwo = [];

  let a = "=COUNTIFS('Курьеры'!$C:$C,$ANUM, 'Курьеры'!$D:$D,ANN, 'Курьеры'!$I:$I,TRUE)"

  for(let i = rowStart+1; i<rowEnd; i++)
  {
    formulasOne.push([a.replace(/NUM/,i).replace(/ANN/,annotation)]);
    zeros.push([0]);
    formulasTwo.push(["=IF(" + (aTwo + i) + "-" + (aOne + i) + "=0,\"\"," + (aTwo + i) + "-" + (aOne + i) + ")"]);
  }

  Logger.log(rowStart + " " + rowEnd)

  isLastCol ? cfzSheet.getRange(rowStart+1, column, rowEnd-1, 5).clearFormat() : false;
  // isLastCol ? cfzSheet.getRange(rowStart+1, column, rowEnd-1, 5).setNumberFormat('#,##0') : false;

  cfzSheet.getRange(rowStart+1, column+2, formulasOne.length, 1).setValues(formulasOne).setNumberFormat('#,##0');
  cfzSheet.getRange(rowStart+1, column+3, zeros.length, 1).setValues(zeros).setNumberFormat('#,##0');
  cfzSheet.getRange(rowStart+1, column+4, formulasTwo.length, 1).setFormulas(formulasTwo).setNumberFormat('#,##0');

  // let ka = ";'ЦФЗ'!" + aa + ":" + bb + "},";

  // let allKa = mainSheet.getSheetByName("Все КА");

  // let newQuery = allKa.getRange(2, 1).getFormula().replace(/},/, ka);

  // allKa.getRange(2, 1).setFormula(newQuery);
  
}

//==========================================================================================
//========================Добавить новый город в список ЦФЗ=================================
//==========================================================================================
function addCity(){


}

//==========================================================================================
//====================Окно заполнения формы для функции addPartner()========================
//==========================================================================================
function openDialogPartner(){

  let range = cfzSheet.getRange(3, 1, cfzSheet.getLastRow()-2, 2).getValues()                              // Из диапазона A3:B
                                                                              .filter(function(e)          // отфильтровываем
                                                                                      {                    // по столбцу B не пустые значения
                                                                                        return e[1] != ""; // Вернуться строки, в которых в столбце В стоит аббревиатура города
                                                                                      });

  
  let arrayNamesKey = "";
  let arrayOptions = "";

  for(i in range)
  {
    arrayNamesKey += "\"" + range[i][0] + "\",\"" + range[i][1] + "\"," + String.fromCharCode(10);
    arrayOptions += "<option>" + range[i][0] + "</option>" + String.fromCharCode(10);
  }

  arrayNamesKey = arrayNamesKey.slice(0, arrayNamesKey.lastIndexOf(","));

  let html = HtmlService
               .createHtmlOutputFromFile('partnerDialog')
               .setTitle("Добавить партнера");

  let content = html.getContent();

  content = content.replace(/{arrayNamesKey}/, arrayNamesKey)
                   .replace(/{arrayOptions}/, arrayOptions);

  html.setContent(content);

  SpreadsheetApp
  .getUi()
  .showSidebar(html);  

}

//==========================================================================================
//====================Окно заполнения формы для функции addCity()===========================
//==========================================================================================
function openDialogCity(){


}






















