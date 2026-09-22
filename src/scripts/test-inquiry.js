const { Pool } = require('pg');

async function testInquiry() {
  console.log('Testing inquiry insertion directly against PostgreSQL database mtsoffshore...');
  const pool = new Pool({
    connectionString: 'postgresql://postgres:theovine@localhost:5432/mtsoffshore',
  });

  try {
    const testData = {
      name: 'Capt. Jonathan Vance',
      email: 'j.vance@chevronoffshore.com',
      phone: '+65 9876 5432',
      company: 'Chevron Marine Logistics',
      message: 'Requesting tender proposal for Kumul SPM Buoy changeout campaign Q3 2026.',
      service_interest: 'SPM / CALM Buoy Overhaul & Maintenance',
    };

    const res = await pool.query(
      `INSERT INTO contact_inquiries (name, email, phone, company, message, service_interest, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *;`,
      [testData.name, testData.email, testData.phone, testData.company, testData.message, testData.service_interest]
    );

    console.log('Inquiry successfully saved to database!');
    console.log('Saved Record ID:', res.rows[0].id, 'Name:', res.rows[0].name, 'Email:', res.rows[0].email);

    const countRes = await pool.query('SELECT count(*) FROM contact_inquiries;');
    console.log(`Total records in contact_inquiries table: ${countRes.rows[0].count}`);
  } catch (err) {
    console.error('Error during inquiry test:', err);
  } finally {
    await pool.end();
  }
}

testInquiry();
