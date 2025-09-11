import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  CheckCircle2,
  Phone,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { getAnalytics, mockFormSubmissions, FormSubmission } from '@/lib/mockData';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(getAnalytics());
  const [recentSubmissions, setRecentSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    setAnalytics(getAnalytics());
    setRecentSubmissions(mockFormSubmissions.slice(0, 8));
  }, []);

  // Simple conversion rate calculation
  const conversionRate = Math.round((analytics.byStatus.scheduled / analytics.total) * 100);

  const pieData = [
    { name: 'Dental Metrix', value: analytics.dental, color: '#0a7490' },
    { name: 'Meditouch', value: analytics.aesthetic, color: '#5A2C8B' }
  ];

  const statusData = [
    { name: 'New', value: analytics.byStatus.new, color: '#ef4444' },
    { name: 'Contacted', value: analytics.byStatus.contacted, color: '#3b82f6' },
    { name: 'Follow-up', value: analytics.byStatus['follow-up'], color: '#f59e0b' },
    { name: 'Scheduled', value: analytics.byStatus.scheduled, color: '#22c55e' },
    { name: 'Closed', value: analytics.byStatus.closed, color: '#6b7280' }
  ];

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    description 
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    description?: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-slate-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">Simple analytics for your clinic</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600">Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}</p>
          </div>
        </div>
      </div>

      {/* Basic Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Submissions"
          value={analytics.total}
          icon={Users}
          color="from-slate-500 to-slate-600"
          description="All form submissions"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          color="from-green-500 to-green-600"
          description="New → Scheduled"
        />
        <StatCard
          title="Need Follow-up"
          value={analytics.byStatus['follow-up']}
          icon={Phone}
          color="from-orange-500 to-orange-600"
          description="Waiting for callback"
        />
        <StatCard
          title="Scheduled Today"
          value={analytics.byStatus.scheduled}
          icon={CheckCircle2}
          color="from-blue-500 to-blue-600"
          description="Appointments booked"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Inquiries by Clinic</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Status Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Submissions & Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Submissions</h3>
          <div className="space-y-3">
            {recentSubmissions.slice(0, 6).map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    submission.formType === 'dental' 
                      ? 'bg-mudra-primary/10 text-mudra-primary'
                      : 'bg-meditouch-primary/10 text-meditouch-primary'
                  }`}>
                    {submission.formType === 'dental' ? (
                      <Stethoscope className="h-5 w-5" />
                    ) : (
                      <Sparkles className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{submission.name}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{submission.serviceInquiry}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    submission.status === 'new' ? 'bg-red-100 text-red-700' :
                    submission.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                    submission.status === 'follow-up' ? 'bg-yellow-100 text-yellow-700' :
                    submission.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {submission.status === 'follow-up' ? 'Follow-up' : submission.status}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {format(submission.submittedAt, 'MMM dd, HH:mm')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Follow-up */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            Needs Follow-up
            <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
              {mockFormSubmissions.filter(s => s.status === 'contacted' || s.status === 'follow-up').length}
            </span>
          </h3>
          <div className="space-y-3">
            {mockFormSubmissions
              .filter(s => s.status === 'contacted' || s.status === 'follow-up')
              .sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime()) // Oldest first
              .slice(0, 6)
              .map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    submission.formType === 'dental' 
                      ? 'bg-mudra-primary/10 text-mudra-primary'
                      : 'bg-meditouch-primary/10 text-meditouch-primary'
                  }`}>
                    {submission.formType === 'dental' ? (
                      <Stethoscope className="h-5 w-5" />
                    ) : (
                      <Sparkles className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{submission.name}</p>
                    <p className="text-xs text-slate-600 truncate max-w-[180px]">{submission.serviceInquiry}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    submission.status === 'contacted' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {submission.status === 'follow-up' ? 'Follow-up' : submission.status}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {format(submission.submittedAt, 'MMM dd')} 
                    <span className="ml-1 text-orange-600">
                      ({Math.floor((Date.now() - submission.submittedAt.getTime()) / (1000 * 60 * 60 * 24))}d ago)
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;