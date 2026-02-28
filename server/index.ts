import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { databaseService, ContactSubmission, ContactSubmissionFilters } from '../src/lib/database.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Verify reCAPTCHA token with Google
async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not set in environment');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

// Submit new contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, serviceInquiry, message, formType, captchaToken } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !serviceInquiry || !message || !formType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        error: 'CAPTCHA verification required'
      });
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return res.status(400).json({
        success: false,
        error: 'CAPTCHA verification failed. Please try again.'
      });
    }

    // Map formType to clinic
    const clinic = formType === 'dental' ? 'dental_metrix' : 'meditouch';

    const submission = databaseService.insertSubmission({
      name,
      email,
      phone,
      service_inquiry: serviceInquiry,
      message,
      clinic,
      status: 'new'
    });

    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get all submissions with filtering (Admin)
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const filters: ContactSubmissionFilters = {
      clinic: req.query.clinic as any,
      status: req.query.status as string,
      search: req.query.search as string,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc'
    };

    const result = databaseService.getSubmissions(filters);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update submission status (Admin)
app.put('/api/admin/submissions/:id/status', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    if (!status || !['new', 'contacted', 'follow-up', 'scheduled', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    const updated = databaseService.updateSubmissionStatus(id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    const submission = databaseService.getSubmissionById(id);

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Delete submission (Admin)
app.delete('/api/admin/submissions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid submission ID'
      });
    }

    const deleted = databaseService.deleteSubmission(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get analytics data (Admin)
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const analytics = databaseService.getAnalytics();

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get submission by ID (Admin)
app.get('/api/admin/submissions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const submission = databaseService.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  databaseService.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  databaseService.close();
  process.exit(0);
});