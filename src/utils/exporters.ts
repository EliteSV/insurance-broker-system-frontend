import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const getNestedValue = (obj: any, path: (string | number)[]): any => {
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

export const exportToPDF = <T>(
  data: T[],
  columns: { title: string; dataIndex: keyof T }[],
  filename: string
) => {
  const doc = new jsPDF();
  const tableColumn = columns.map((col) => col.title);
  const tableRows: string[][] = [];

  data.forEach((item) => {
    const rowData = columns.map((col) => {
      const value = Array.isArray(col.dataIndex)
        ? getNestedValue(item, col.dataIndex)
        : item[col.dataIndex];
      return value ? value.toString() : '';
    });
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save(`${filename}.pdf`);
};

export const exportToExcel = <T>(
  data: T[],
  columns: { title: string; dataIndex: keyof T }[],
  filename: string
) => {
  const worksheetData = data.map((item) => {
    const row: Record<string, string> = {};
    columns.forEach((col) => {
      const value = Array.isArray(col.dataIndex)
        ? getNestedValue(item, col.dataIndex)
        : item[col.dataIndex];
      row[col.title] = value ? value.toString() : '';
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
