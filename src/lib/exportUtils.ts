import * as XLSX from 'xlsx';
import { ContactSubmission } from './api';
import { format } from 'date-fns';

export const exportToExcel = (data: ContactSubmission[], filename: string) => {
  // Transform data for Excel export
  const exportData = data.map((submission, index) => ({
    'S.No': index + 1,
    'Name': submission.name,
    'Email': submission.email,
    'Phone': submission.phone,
    'Service Inquiry': submission.service_inquiry,
    'Message': submission.message,
    'Clinic': submission.clinic === 'dental_metrix' ? 'Dental Metrix' : 'Meditouch',
    'Status': submission.status.charAt(0).toUpperCase() + submission.status.slice(1),
    'Submitted Date': submission.submitted_at ? format(new Date(submission.submitted_at), 'dd/MM/yyyy') : 'N/A',
    'Submitted Time': submission.submitted_at ? format(new Date(submission.submitted_at), 'HH:mm:ss') : 'N/A',
    'Full Date & Time': submission.submitted_at ? format(new Date(submission.submitted_at), 'dd/MM/yyyy HH:mm:ss') : 'N/A'
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const columnWidths = [
    { wch: 8 },   // S.No
    { wch: 20 },  // Name
    { wch: 25 },  // Email
    { wch: 15 },  // Phone
    { wch: 30 },  // Service Inquiry
    { wch: 40 },  // Message
    { wch: 15 },  // Clinic
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
    { 'Metric': 'Dental Metrix', 'Value': data.filter(s => s.clinic === 'dental_metrix').length },
    { 'Metric': 'Meditouch', 'Value': data.filter(s => s.clinic === 'meditouch').length },
    { 'Metric': 'New Status', 'Value': data.filter(s => s.status === 'new').length },
    { 'Metric': 'Contacted Status', 'Value': data.filter(s => s.status === 'contacted').length },
    { 'Metric': 'Follow-up Status', 'Value': data.filter(s => s.status === 'follow-up').length },
    { 'Metric': 'Scheduled Status', 'Value': data.filter(s => s.status === 'scheduled').length },
    { 'Metric': 'Closed Status', 'Value': data.filter(s => s.status === 'closed').length },
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