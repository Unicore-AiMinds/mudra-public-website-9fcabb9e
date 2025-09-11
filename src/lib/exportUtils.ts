import * as XLSX from 'xlsx';
import { FormSubmission } from './mockData';
import { format } from 'date-fns';

export const exportToExcel = (data: FormSubmission[], filename: string) => {
  // Transform data for Excel export
  const exportData = data.map((submission, index) => ({
    'S.No': index + 1,
    'Submission ID': submission.id,
    'Name': submission.name,
    'Email': submission.email,
    'Phone': submission.phone,
    'Service Inquiry': submission.serviceInquiry,
    'Message': submission.message,
    'Type': submission.formType === 'dental' ? 'Dental Metrix' : 'Meditouch',
    'Status': submission.status.charAt(0).toUpperCase() + submission.status.slice(1),
    'Submitted Date': format(submission.submittedAt, 'dd/MM/yyyy'),
    'Submitted Time': format(submission.submittedAt, 'HH:mm:ss'),
    'Full Date & Time': format(submission.submittedAt, 'dd/MM/yyyy HH:mm:ss')
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const columnWidths = [
    { wch: 8 },   // S.No
    { wch: 15 },  // Submission ID
    { wch: 20 },  // Name
    { wch: 25 },  // Email
    { wch: 15 },  // Phone
    { wch: 30 },  // Service Inquiry
    { wch: 40 },  // Message
    { wch: 15 },  // Type
    { wch: 12 },  // Status
    { wch: 12 },  // Date
    { wch: 10 },  // Time
    { wch: 18 }   // Full Date & Time
  ];
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Submissions');

  // Add summary sheet
  const summaryData = [
    { 'Metric': 'Total Submissions', 'Value': data.length },
    { 'Metric': 'Dental Metrix', 'Value': data.filter(s => s.formType === 'dental').length },
    { 'Metric': 'Meditouch', 'Value': data.filter(s => s.formType === 'aesthetic').length },
    { 'Metric': 'New Status', 'Value': data.filter(s => s.status === 'new').length },
    { 'Metric': 'Contacted Status', 'Value': data.filter(s => s.status === 'contacted').length },
    { 'Metric': 'Scheduled Status', 'Value': data.filter(s => s.status === 'scheduled').length },
    { 'Metric': 'Completed Status', 'Value': data.filter(s => s.status === 'completed').length },
    { 'Metric': 'Export Date', 'Value': format(new Date(), 'dd/MM/yyyy HH:mm:ss') }
  ];

  const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
  summaryWorksheet['!cols'] = [{ wch: 20 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');

  // Generate and download file
  const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
  const finalFilename = `${filename}_${timestamp}.xlsx`;
  XLSX.writeFile(workbook, finalFilename);

  return finalFilename;
};