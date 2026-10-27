import type { ContactSubmission } from '@/lib/api';

type SortField = keyof ContactSubmission;
type SortDirection = 'asc' | 'desc';

// The sorts desktop offers through its Date, Name, Service and Status column headers
const OPTIONS: { value: string; label: string; field: SortField; direction: SortDirection }[] = [
  { value: 'submitted_at-desc', label: 'Date (Newest First)', field: 'submitted_at', direction: 'desc' },
  { value: 'submitted_at-asc', label: 'Date (Oldest First)', field: 'submitted_at', direction: 'asc' },
  { value: 'name-asc', label: 'Name (A-Z)', field: 'name', direction: 'asc' },
  { value: 'name-desc', label: 'Name (Z-A)', field: 'name', direction: 'desc' },
  { value: 'service_inquiry-asc', label: 'Service (A-Z)', field: 'service_inquiry', direction: 'asc' },
  { value: 'service_inquiry-desc', label: 'Service (Z-A)', field: 'service_inquiry', direction: 'desc' },
  { value: 'status-asc', label: 'Status (A-Z)', field: 'status', direction: 'asc' },
  { value: 'status-desc', label: 'Status (Z-A)', field: 'status', direction: 'desc' },
];

interface AdminSortSelectProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onChange: (field: SortField, direction: SortDirection) => void;
}

// Phones/tablets show submissions as cards, which have no column headers to tap, so sorting
// moves into this small drop-down with the same columns.
const AdminSortSelect = ({ sortField, sortDirection, onChange }: AdminSortSelectProps) => (
  <div className="flex items-center gap-2">
    <label htmlFor="admin-sort" className="text-sm font-medium text-slate-700 whitespace-nowrap">Sort by</label>
    <select
      id="admin-sort"
      value={`${String(sortField)}-${sortDirection}`}
      onChange={(e) => {
        const option = OPTIONS.find((o) => o.value === e.target.value);
        if (option) onChange(option.field, option.direction);
      }}
      className="min-w-0 flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

export default AdminSortSelect;
