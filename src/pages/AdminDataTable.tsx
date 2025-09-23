import { useState, useMemo, useEffect } from 'react';
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
  ArrowDown,
  Trash2
} from 'lucide-react';
import { apiClient, ContactSubmission } from '@/lib/api';
import { exportToExcel } from '@/lib/exportUtils';
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
  const [allData, setAllData] = useState<ContactSubmission[]>([]);
  const [filteredData, setFilteredData] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Sorting
  const [sortField, setSortField] = useState<keyof ContactSubmission>('submitted_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Selected submission for details
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  
  // Status update loading
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Delete loading
  const [deletingSubmission, setDeletingSubmission] = useState<string | null>(null);
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clinic = clinicType === 'dental' ? 'dental_metrix' : 'meditouch';

        const response = await apiClient.getSubmissions({
          clinic,
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          sortBy: sortField,
          sortOrder: sortDirection
        });

        if (response.success && response.data) {
          setAllData(response.data);
          setFilteredData(response.data);
          setTotalCount(response.total || 0);
          setTotalPages(response.totalPages || 1);
        } else {
          setError('Failed to fetch submissions');
        }
      } catch (err) {
        setError('Failed to fetch submissions');
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clinicType, currentPage, itemsPerPage, searchTerm, statusFilter, sortField, sortDirection]);

  // Since API handles filtering, this is mainly for local date filtering if needed
  useMemo(() => {
    let filtered = [...allData];

    // Date filter (local filtering for real-time updates)
    if (dateFilter !== 'all') {
      const now = new Date();
      let filterDate = new Date();

      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(item => {
            const submittedDate = new Date(item.submitted_at || '');
            return submittedDate >= filterDate;
          });
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(item => {
            const submittedDate = new Date(item.submitted_at || '');
            return submittedDate >= filterDate;
          });
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(item => {
            const submittedDate = new Date(item.submitted_at || '');
            return submittedDate >= filterDate;
          });
          break;
      }
    }

    setFilteredData(filtered);
  }, [allData, dateFilter]);

  // Pagination is handled by API, so we use the data as-is
  const paginatedData = filteredData;

  const handleSort = (field: keyof ContactSubmission) => {
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

  const handleStatusUpdate = async (submissionId: number, newStatus: ContactSubmission['status'], currentStatus: ContactSubmission['status']) => {
    // Get submission details for confirmation
    const submission = allData.find(s => s.id === submissionId);
    if (!submission) return;

    const statusLabels: Record<string, string> = {
      'new': 'New',
      'contacted': 'Contacted',
      'follow-up': 'Follow-up',
      'scheduled': 'Scheduled',
      'closed': 'Closed'
    };

    // Show confirmation dialog
    setConfirmDialog({
      isOpen: true,
      title: 'Update Status',
      message: `Are you sure you want to change the status for "${submission.name}" from "${statusLabels[currentStatus]}" to "${statusLabels[newStatus]}"?\n\nService: ${submission.service_inquiry}`,
      onConfirm: async () => {
        setUpdatingStatus(submissionId.toString());
        try {
          const response = await apiClient.updateSubmissionStatus(submissionId, newStatus);

          if (response.success) {
            // Update the local data
            const updatedData = allData.map(submission =>
              submission.id === submissionId
                ? { ...submission, status: newStatus }
                : submission
            );
            setAllData(updatedData);

            toast({
              title: "Status Updated Successfully",
              description: `${submission.name}'s status changed to ${statusLabels[newStatus]}`,
            });
          } else {
            toast({
              title: "Update Failed",
              description: response.error || "Failed to update status",
              variant: "destructive",
            });
          }
          
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

  const handleDeleteSubmission = async (submissionId: number) => {
    const submission = allData.find(s => s.id === submissionId);
    if (!submission) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Submission',
      message: `Are you sure you want to permanently delete the submission from "${submission.name}"?\n\nService: ${submission.service_inquiry}\n\nThis action cannot be undone.`,
      onConfirm: async () => {
        setDeletingSubmission(submissionId.toString());
        try {
          const response = await apiClient.deleteSubmission(submissionId);

          if (response.success) {
            // Remove from local data
            const updatedData = allData.filter(s => s.id !== submissionId);
            setAllData(updatedData);
            setFilteredData(prevFiltered => prevFiltered.filter(s => s.id !== submissionId));

            toast({
              title: "Submission Deleted",
              description: `${submission.name}'s submission has been permanently deleted.`,
            });

            // Refresh data to update pagination and analytics
            window.location.reload();
          } else {
            toast({
              title: "Delete Failed",
              description: response.error || "Failed to delete submission",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Delete submission error:', error);
          toast({
            title: "Delete Failed",
            description: "Could not delete submission. Please try again.",
            variant: "destructive",
          });
        } finally {
          setDeletingSubmission(null);
        }
      }
    });
  };

  const getStatusSelect = (submission: ContactSubmission) => {
    const statusOptions = [
      { value: 'new', label: 'New', color: 'bg-red-100 text-red-700 border-red-200' },
      { value: 'contacted', label: 'Contacted', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { value: 'follow-up', label: 'Follow-up', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      { value: 'scheduled', label: 'Scheduled', color: 'bg-green-100 text-green-700 border-green-200' },
      { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-700 border-gray-200' }
    ];

    const currentStatus = statusOptions.find(opt => opt.value === submission.status) || statusOptions[0];
    const isUpdating = updatingStatus === submission.id?.toString();
    
    return (
      <div className="relative">
        <select
          value={submission.status}
          onChange={(e) => handleStatusUpdate(submission.id!, e.target.value as ContactSubmission['status'], submission.status)}
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
                  onClick={() => handleSort('submitted_at')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    {getSortIcon('submitted_at')}
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
                  onClick={() => handleSort('service_inquiry')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Service</span>
                    {getSortIcon('service_inquiry')}
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
                      <div className="font-medium">
                        {submission.submitted_at ? format(new Date(submission.submitted_at), 'MMM dd, yyyy') : 'N/A'}
                      </div>
                      <div className="text-slate-500">
                        {submission.submitted_at ? format(new Date(submission.submitted_at), 'HH:mm') : 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{submission.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div>{submission.email}</div>
                    <div>{submission.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    <div className="max-w-xs truncate">{submission.service_inquiry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusSelect(submission)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteSubmission(submission.id!)}
                        disabled={deletingSubmission === submission.id?.toString()}
                        className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingSubmission === submission.id?.toString() ? (
                          <div className="w-4 h-4 mr-1 border border-red-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="h-4 w-4 mr-1" />
                        )}
                        Delete
                      </button>
                    </div>
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
                <div className="grid grid-cols-1 gap-4">
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
                      {selectedSubmission.submitted_at ? format(new Date(selectedSubmission.submitted_at), 'MMM dd, yyyy HH:mm') : 'N/A'}
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
                  <p className="text-sm text-slate-900 mt-1">{selectedSubmission.service_inquiry}</p>
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