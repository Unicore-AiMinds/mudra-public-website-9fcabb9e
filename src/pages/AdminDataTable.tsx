import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { FormSubmission, getSubmissionsByType, mockFormSubmissions } from '@/lib/mockData';
import { exportToExcel } from '@/lib/exportUtils';
import { StatusService } from '@/lib/statusService';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface AdminDataTableProps {
  clinicType: 'dental' | 'aesthetic';
  clinicName: string;
  brandColor: string;
}

const AdminDataTable = ({ clinicType, clinicName, brandColor }: AdminDataTableProps) => {
  const { toast } = useToast();
  
  // Data and filtering
  const allData = useMemo(() => getSubmissionsByType(clinicType), [clinicType]);
  const [filteredData, setFilteredData] = useState<FormSubmission[]>(allData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Sorting
  const [sortField, setSortField] = useState<keyof FormSubmission>('submittedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Selected submission for details
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  
  // Status update loading
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // Apply filters
  useMemo(() => {
    let filtered = [...allData];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.serviceInquiry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(item => item.submittedAt >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(item => item.submittedAt >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(item => item.submittedAt >= filterDate);
          break;
      }
    }
    
    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (aVal instanceof Date) {
        aVal = aVal.getTime();
      }
      if (bVal instanceof Date) {
        bVal = bVal.getTime();
      }
      
      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
    
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [allData, searchTerm, statusFilter, dateFilter, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof FormSubmission) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    try {
      const filename = exportToExcel(filteredData, `${clinicName.replace(/\s+/g, '_')}_submissions`);
      toast({
        title: "Export Successful",
        description: `${filteredData.length} records exported to ${filename}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      });
    }
  };

  const getSortIcon = (field: keyof FormSubmission) => {
    if (field !== sortField) {
      return <ArrowUpDown className="h-4 w-4 text-slate-400" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-slate-600" />
      : <ArrowDown className="h-4 w-4 text-slate-600" />;
  };

  const handleStatusUpdate = async (submissionId: string, newStatus: FormSubmission['status'], currentStatus: FormSubmission['status']) => {
    // Get submission details for confirmation
    const submission = allData.find(s => s.id === submissionId);
    if (!submission) return;

    const statusConfig = StatusService.getStatusConfig(newStatus);
    const currentStatusConfig = StatusService.getStatusConfig(currentStatus);
    
    // Show confirmation dialog
    setConfirmDialog({
      isOpen: true,
      title: 'Update Status',
      message: `Are you sure you want to change the status for "${submission.name}" from "${currentStatusConfig.label}" to "${statusConfig.label}"?\n\nService: ${submission.serviceInquiry}`,
      onConfirm: async () => {
        setUpdatingStatus(submissionId);
        try {
          await StatusService.updateSubmissionStatus(submissionId, newStatus);
          
          // Update the local data (in a real app, you'd refetch from the server)
          const updatedData = allData.map(submission => 
            submission.id === submissionId 
              ? { ...submission, status: newStatus }
              : submission
          );
          
          toast({
            title: "Status Updated Successfully",
            description: `${submission.name}'s status changed to ${statusConfig.label}`,
          });
          
          // Trigger re-filter
          setFilteredData(prev => prev.map(submission => 
            submission.id === submissionId 
              ? { ...submission, status: newStatus }
              : submission
          ));
          
        } catch (error) {
          toast({
            title: "Update Failed",
            description: "Could not update status. Please try again.",
            variant: "destructive",
          });
        } finally {
          setUpdatingStatus(null);
        }
      }
    });
  };

  const getStatusSelect = (submission: FormSubmission) => {
    const statusOptions = StatusService.getStatusOptions();
    const currentStatus = StatusService.getStatusConfig(submission.status);
    const isUpdating = updatingStatus === submission.id;
    
    return (
      <div className="relative">
        <select
          value={submission.status}
          onChange={(e) => handleStatusUpdate(submission.id, e.target.value as FormSubmission['status'], submission.status)}
          disabled={isUpdating}
          className={`text-xs font-medium px-2 py-1 rounded-full border cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${currentStatus.color}`}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isUpdating && (
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <div className="w-3 h-3 border border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{clinicName} Data</h1>
          <p className="text-slate-600 mt-1">
            {filteredData.length} of {allData.length} submissions
          </p>
        </div>
        <button
          onClick={handleExport}
          className={`mt-4 sm:mt-0 inline-flex items-center px-4 py-2 rounded-lg font-medium text-white transition-colors ${brandColor} hover:opacity-90`}
        >
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow-up">Follow-up</option>
              <option value="scheduled">Scheduled</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          {/* Items per page */}
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('submittedAt')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    {getSortIcon('submittedAt')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('serviceInquiry')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Service</span>
                    {getSortIcon('serviceInquiry')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {paginatedData.map((submission) => (
                <tr key={submission.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <div>
                      <div className="font-medium">{format(submission.submittedAt, 'MMM dd, yyyy')}</div>
                      <div className="text-slate-500">{format(submission.submittedAt, 'HH:mm')}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{submission.name}</div>
                    <div className="text-sm text-slate-500">{submission.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div>{submission.email}</div>
                    <div>{submission.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    <div className="max-w-xs truncate">{submission.serviceInquiry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusSelect(submission)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span> of{' '}
                  <span className="font-medium">{filteredData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronsLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronsRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Submission Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Submission ID</label>
                    <p className="text-sm text-slate-900 mt-1">{selectedSubmission.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Status</label>
                    <div className="mt-1">{getStatusSelect(selectedSubmission)}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Name</label>
                    <p className="text-sm text-slate-900 mt-1">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Submitted</label>
                    <p className="text-sm text-slate-900 mt-1">
                      {format(selectedSubmission.submittedAt, 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <p className="text-sm text-slate-900 mt-1">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Phone</label>
                    <p className="text-sm text-slate-900 mt-1">{selectedSubmission.phone}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700">Service Inquiry</label>
                  <p className="text-sm text-slate-900 mt-1">{selectedSubmission.serviceInquiry}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700">Message</label>
                  <p className="text-sm text-slate-900 mt-1 p-3 bg-slate-50 rounded-lg">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Update Status"
        type="warning"
      />
    </div>
  );
};

export default AdminDataTable;