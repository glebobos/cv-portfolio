import puppeteer from 'puppeteer';
import { exec } from 'child_process';

const PORT = 4173; // Default Vite preview port

const server = exec(`npm run preview -- --port ${PORT}`);

server.stdout.on('data', async (data) => {
  if (data.includes('Local')) {
    console.log('Server started, generating PDF...');
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: 'dist/resume.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });
      await browser.close();
      console.log('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      process.exit(1);
    } finally {
      server.kill();
      process.exit(0);
    }
  }
});

server.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
  server.kill();
  process.exit(1);
});
