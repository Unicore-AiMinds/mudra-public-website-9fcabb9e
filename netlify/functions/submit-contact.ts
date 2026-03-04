import type { Handler } from '@netlify/functions';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;

// Verify reCAPTCHA token with Google
async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(token)}`,
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, serviceInquiry, message, formType, captchaToken } = body;

    // Validate required fields
    if (!name?.trim() || !phone?.trim() || !serviceInquiry?.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Missing required fields' }),
      };
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'CAPTCHA verification required' }),
      };
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'CAPTCHA verification failed. Please try again.' }),
      };
    }

    // Map formType to clinic
    const clinic = formType === 'dental' ? 'dental_metrix' : 'meditouch';

    // Insert into Supabase using service role key (bypasses RLS)
    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service_inquiry: serviceInquiry.trim(),
        message: message?.trim() || '',
        clinic,
        status: 'new',
      }),
    });

    if (!supabaseResponse.ok) {
      const errorData = await supabaseResponse.json().catch(() => ({}));
      console.error('Supabase insert error:', errorData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: 'Failed to save submission' }),
      };
    }

    const data = await supabaseResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: Array.isArray(data) ? data[0] : data }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Internal server error' }),
    };
  }
};

export { handler };
