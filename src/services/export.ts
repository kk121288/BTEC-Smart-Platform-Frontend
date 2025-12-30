import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export data to Excel file
 */
export function exportToExcel(data: Record<string, unknown>[], filename: string, sheetName: string = 'Sheet1') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Export data to CSV file
 */
export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export data to PDF file
 */
export function exportToPDF(
  data: Record<string, unknown>[],
  filename: string,
  options: {
    title?: string;
    columns?: string[];
    orientation?: 'portrait' | 'landscape';
  } = {}
) {
  const { title = 'Report', columns, orientation = 'portrait' } = options;

  const doc = new jsPDF(orientation);

  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  // Prepare table data
  const headers = columns || (data.length > 0 ? Object.keys(data[0]) : []);
  const rows = data.map((item) => headers.map((header) => item[header] || ''));

  // Add table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 255, 204],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
    },
  });

  doc.save(`${filename}.pdf`);
}

/**
 * Export chart as image
 */
export function exportChartAsImage(chartRef: HTMLCanvasElement, filename: string) {
  if (!chartRef) {
    console.error('Chart reference not found');
    return;
  }

  const url = chartRef.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = url;
  link.click();
}
