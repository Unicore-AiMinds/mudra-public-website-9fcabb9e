import { FormSubmission } from './mockData';

// In a real app, this would make API calls to update the database
export class StatusService {
  static updateSubmissionStatus(submissionId: string, newStatus: FormSubmission['status']): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real app, this would update the database
        // For now, we'll just return success
        resolve(true);
      }, 500);
    });
  }

  static getStatusOptions(): { value: FormSubmission['status']; label: string; description: string; color: string }[] {
    return [
      {
        value: 'new',
        label: 'New',
        description: 'Form just submitted, needs initial review',
        color: 'bg-red-100 text-red-700 border-red-200'
      },
      {
        value: 'contacted',
        label: 'Contacted',
        description: 'Staff has reached out to patient',
        color: 'bg-blue-100 text-blue-700 border-blue-200'
      },
      {
        value: 'follow-up',
        label: 'Follow-up',
        description: 'Need to call back or waiting for patient response',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
      },
      {
        value: 'scheduled',
        label: 'Scheduled',
        description: 'Appointment booked and confirmed',
        color: 'bg-green-100 text-green-700 border-green-200'
      },
      {
        value: 'closed',
        label: 'Closed',
        description: 'Not interested or did not convert',
        color: 'bg-gray-100 text-gray-700 border-gray-200'
      }
    ];
  }

  static getStatusConfig(status: FormSubmission['status']) {
    const options = this.getStatusOptions();
    return options.find(option => option.value === status) || options[0];
  }
}