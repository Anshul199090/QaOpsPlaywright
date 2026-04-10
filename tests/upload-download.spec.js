const excelJs = require('exceljs');
import { test, expect } from '@playwright/test'

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, searchText);


    const cell = worksheet.getCell(output.row, output.col + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, col: -1 };
    worksheet.eachRow((row, rownumber) => {
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value);
            if (cell.value === searchText) {
                output.row = rownumber;
                output.col = colNumber;
            }
        })
    })
    return output;
}



test('upload download excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updatedValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", {name: 'Download'}).click();
    const download = await downloadPromise;
    const filePath = "C:/Users/anshul.bedi/Downloads/download.xlsx";
    await download.saveAs(filePath);

    await writeExcelTest(textSearch, updatedValue, {rowChange:0, colChange: 2}, "C:/Users/anshul.bedi/Downloads/download.xlsx");
    //await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/anshul.bedi/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole("row").filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);
    await page.pause();
    
})