import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log("✅ Email:", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log("✅ Sheet ID:", process.env.GOOGLE_SHEET_ID);
    console.log("✅ Sheet ID:", process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'));

    // console.log("🔍 GOOGLE_PRIVATE_KEY Raw:", process.env.GOOGLE_PRIVATE_KEY?.slice(0, 30));
    // console.log("🔍 After replace:", process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').slice(0, 30));

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, {
      auth: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
    });

    await doc.loadInfo();
    console.log("✅ Connected to sheet:", doc.title);
  } catch (err) {
    console.error("❌ Google Auth failed:", err);
  }
}

test();