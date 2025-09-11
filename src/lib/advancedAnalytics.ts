import { FormSubmission, mockFormSubmissions } from './mockData';
import { format, subDays, startOfMonth, endOfMonth, differenceInHours } from 'date-fns';

export interface ConversionFunnel {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ServicePopularity {
  service: string;
  count: number;
  conversionRate: number;
  clinic: 'dental' | 'aesthetic';
}

export interface ResponseMetrics {
  averageResponseTime: number; // in hours
  followUpSuccessRate: number;
  conversionRate: number;
}

export interface ClinicComparison {
  dental: {
    submissions: number;
    conversionRate: number;
    avgResponseTime: number;
  };
  aesthetic: {
    submissions: number;
    conversionRate: number;
    avgResponseTime: number;
  };
}

export interface MonthlyTrend {
  month: string;
  dental: number;
  aesthetic: number;
  total: number;
  conversionRate: number;
}

export class AdvancedAnalytics {
  
  static getConversionFunnel(): ConversionFunnel[] {
    const total = mockFormSubmissions.length;
    const contacted = mockFormSubmissions.filter(s => ['contacted', 'follow-up', 'scheduled'].includes(s.status)).length;
    const followUp = mockFormSubmissions.filter(s => ['follow-up', 'scheduled'].includes(s.status)).length;
    const scheduled = mockFormSubmissions.filter(s => s.status === 'scheduled').length;

    return [
      {
        stage: 'New Inquiries',
        count: total,
        percentage: 100,
        color: '#ef4444'
      },
      {
        stage: 'Contacted',
        count: contacted,
        percentage: Math.round((contacted / total) * 100),
        color: '#3b82f6'
      },
      {
        stage: 'Follow-up',
        count: followUp,
        percentage: Math.round((followUp / total) * 100),
        color: '#f59e0b'
      },
      {
        stage: 'Scheduled',
        count: scheduled,
        percentage: Math.round((scheduled / total) * 100),
        color: '#22c55e'
      }
    ];
  }

  static getPopularServices(): ServicePopularity[] {
    // Group by service and clinic
    const serviceMap = new Map<string, { count: number; scheduled: number; clinic: 'dental' | 'aesthetic' }>();
    
    mockFormSubmissions.forEach(submission => {
      const key = `${submission.serviceInquiry}-${submission.formType}`;
      const existing = serviceMap.get(key) || { count: 0, scheduled: 0, clinic: submission.formType };
      
      existing.count += 1;
      if (submission.status === 'scheduled') {
        existing.scheduled += 1;
      }
      
      serviceMap.set(key, existing);
    });

    // Convert to array and calculate conversion rates
    const services: ServicePopularity[] = Array.from(serviceMap.entries()).map(([key, data]) => {
      const service = key.split('-')[0];
      return {
        service,
        count: data.count,
        conversionRate: data.count > 0 ? Math.round((data.scheduled / data.count) * 100) : 0,
        clinic: data.clinic
      };
    });

    // Sort by popularity (count) and return top 10
    return services.sort((a, b) => b.count - a.count).slice(0, 10);
  }

  static getResponseMetrics(): ResponseMetrics {
    const totalSubmissions = mockFormSubmissions.length;
    const contactedSubmissions = mockFormSubmissions.filter(s => ['contacted', 'follow-up', 'scheduled'].includes(s.status));
    const followUpSubmissions = mockFormSubmissions.filter(s => ['follow-up', 'scheduled'].includes(s.status));
    const scheduledSubmissions = mockFormSubmissions.filter(s => s.status === 'scheduled');

    // Simulate response times (in real app, you'd track actual timestamps)
    const avgResponseHours = Math.floor(Math.random() * 24) + 2; // 2-26 hours

    return {
      averageResponseTime: avgResponseHours,
      followUpSuccessRate: followUpSubmissions.length > 0 
        ? Math.round((scheduledSubmissions.length / followUpSubmissions.length) * 100) 
        : 0,
      conversionRate: Math.round((scheduledSubmissions.length / totalSubmissions) * 100)
    };
  }

  static getClinicComparison(): ClinicComparison {
    const dentalSubmissions = mockFormSubmissions.filter(s => s.formType === 'dental');
    const aestheticSubmissions = mockFormSubmissions.filter(s => s.formType === 'aesthetic');
    
    const dentalScheduled = dentalSubmissions.filter(s => s.status === 'scheduled').length;
    const aestheticScheduled = aestheticSubmissions.filter(s => s.status === 'scheduled').length;

    return {
      dental: {
        submissions: dentalSubmissions.length,
        conversionRate: dentalSubmissions.length > 0 
          ? Math.round((dentalScheduled / dentalSubmissions.length) * 100) 
          : 0,
        avgResponseTime: Math.floor(Math.random() * 20) + 4 // 4-24 hours
      },
      aesthetic: {
        submissions: aestheticSubmissions.length,
        conversionRate: aestheticSubmissions.length > 0 
          ? Math.round((aestheticScheduled / aestheticSubmissions.length) * 100) 
          : 0,
        avgResponseTime: Math.floor(Math.random() * 18) + 3 // 3-21 hours
      }
    };
  }

  static getMonthlyTrends(): MonthlyTrend[] {
    const trends: MonthlyTrend[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subDays(new Date(), i * 30));
      const monthEnd = endOfMonth(subDays(new Date(), i * 30));
      
      const monthSubmissions = mockFormSubmissions.filter(s => 
        s.submittedAt >= monthStart && s.submittedAt <= monthEnd
      );
      
      const dental = monthSubmissions.filter(s => s.formType === 'dental').length;
      const aesthetic = monthSubmissions.filter(s => s.formType === 'aesthetic').length;
      const scheduled = monthSubmissions.filter(s => s.status === 'scheduled').length;
      const total = monthSubmissions.length;
      
      trends.push({
        month: format(monthStart, 'MMM yyyy'),
        dental,
        aesthetic,
        total,
        conversionRate: total > 0 ? Math.round((scheduled / total) * 100) : 0
      });
    }
    
    return trends;
  }

  static getKeyMetrics() {
    const responseMetrics = this.getResponseMetrics();
    const thisMonth = this.getMonthlyTrends().slice(-1)[0];
    const lastMonth = this.getMonthlyTrends().slice(-2)[0];
    
    const growth = lastMonth && lastMonth.total > 0 
      ? Math.round(((thisMonth.total - lastMonth.total) / lastMonth.total) * 100)
      : 0;

    const activeFollowUps = mockFormSubmissions.filter(s => s.status === 'follow-up').length;

    return {
      conversionRate: responseMetrics.conversionRate,
      averageResponseTime: responseMetrics.averageResponseTime,
      thisMonthInquiries: thisMonth.total,
      monthlyGrowth: growth,
      activeFollowUps,
      followUpSuccessRate: responseMetrics.followUpSuccessRate
    };
  }

  static getHighValueInquiries() {
    // Define high-value services
    const highValueServices = [
      'Dental Implants', 'Full Mouth Rehabilitation', 'Smile Redesign',
      'Hair Transplants', 'Hifu', 'Semi Permanent Makeup'
    ];
    
    return mockFormSubmissions
      .filter(s => highValueServices.includes(s.serviceInquiry))
      .slice(0, 5)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  static getServicesNeedingFollowup() {
    return mockFormSubmissions
      .filter(s => s.status === 'contacted' || s.status === 'follow-up')
      .sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime()) // Oldest first
      .slice(0, 8);
  }
}