import { RequestHandler } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import * as dotenv from "dotenv";

dotenv.config();

export interface EnquiryData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  timestamp?: string;
}

export const handleEnquiry: RequestHandler = async (req, res) => {
  try {
    const { name, phone, email, message }: EnquiryData = req.body;
    console.log(" name, phone, email, message ",  name, phone, email, message )

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        error: "Name and phone number are required",
        success: false,
      });
    }

    // Create enquiry data with timestamp
    const enquiryData: EnquiryData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || "",
      message: message?.trim() || "",
      timestamp: new Date().toISOString(),
    };

    // Save to Google Sheets
    console.log(" name, phone, email, message ")
    await saveToGoogleSheets(enquiryData);
    console.log(" name, phone, email, message ------------------------")

    // Send success response
    res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully. We will contact you soon!",
      data: {
        name: enquiryData.name,
        timestamp: enquiryData.timestamp,
      },
    });
  } catch (error) {
    console.error("Error processing enquiry:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later.",
    });
  }
};

async function saveToGoogleSheets(data: EnquiryData) {
  // console.log("PRIVATE KEY", process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'))
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, {
    auth: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsByTitle["Sheet1"]

  await sheet.addRow({
    Name: data.name,
    Phone: data.phone,
    Email: data.email,
    Message: data.message,
    Timestamp: data.timestamp,
  });
}

// async function saveToGoogleSheets(data: EnquiryData) {
//   // const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!);
//   const doc = new GoogleSpreadsheet("1UU6nFCIXf1h7I3CwwH9FSt_TUc9vPWhgPN6eCt7ifP4");

//   await doc.useServiceAccountAuth({
//     // client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
//     // client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
//     client_email: "godrej-form-handler@godrej-majesty-website.iam.gserviceaccount.com",
//     private_key: ("MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5j1D6aHW5rTFO\n0ySsW2gg/oVELHYRMNDnlUu2Q2BZO+D0pCtMbAPtg7zbMIZR++7ksT1Nf0YZG2ij\nD9dM/F70Vqtaz2rRZmfPIcECFjDHUtzwfa3XpwTzpKjNO/OkD6+mt8raxyqfBnRD\nUtJEyuvNhBCgTWYf4O7CvxLWDvTqJgcvG8bZGWM7a5ilEGF2UZ25QEnVkwG7gSBm\nwarFFLs0aXDQgf/14sTtRxPPL4wfhTIXQ4Rv7KUv/QTMy3eh642/Nf5CIYrYsR+R\n+PC9KvCD+srJnHGyxG27oQ++/jdEt+Wc179pMxafzZeIysZvbA1+AfG9nUaACzrC\n3Mm6ABGfAgMBAAECggEAOiATnKz2G5iN9oQbW8YyQwuXUTigL1hcR/6zPb+zQaCJ\nIfj++yxmupLmqL51hN7nAUonysvQeHLmfxWqOppfYCh5+rM4YamzYOXQ4Md0titV\nvBuSRhgya+OrYMaj1kN3oUC3UXrL9g5+gsxBw3zRCoqQ7rXwBJJgGC7kRpteyq1f\nTnj4ex530ETT+SzvFZZYsYLtV0N/zzf+ohcDWr6N7NTri3U9XTrfknBf5Rfdge1n\nFK/Ru6Cu2DQa1ktirEAfP5znKpyFTZxa8XHimR61g3eWvrWTWh/aKpf2aafNDPVG\nmM+CK01c+gT42G2aUC6lcU510u11pWHScmtWvKh6cQKBgQD14dV6yXXv3TKTGsR7\nxDvpCQMYdGad6uRjB5TzS8KO4DjNTHlK8CIBs3ciI5qYSUs+nGRjewTaBVXD10cM\nDZo7Gp8NYjeDR8BBwuudJPNFCd8UOI9K8Xvd8kVE3MPCcysSFHsbMOg/BsBGK6zd\nlLR9vLs7jQthIB2c3wnd/Y3R6QKBgQDBMglLLLHRLzPEyFljAHeErhlRbO9MMy3L\nZk/ghCigbwpJzPmFSxWJiPLYBpeTgeRLHoGfSUxfQFCMVhIrQ0bRFMtUsSFJMewo\nhSGNd/QMd7zWZjMsEi/0U/NK3qjCMuzwfMA3S51NzDrvdJrjiEPLEE0FG8qEDz2K\nSKkLSSHKRwKBgQCbOyNKrKufbnfCdXC8bowgOEdTBhHO+v+LIbtAyoCfMSHLQs+E\npwvhJQs+a1nrcMJnWdbrEzxh5GJcDKpXCrNnQwxNJ8fCQuc23Tdg83X+DRhgLMES\nYFiCK7Tdn76bIZh8hp+d8Ad/2uRCqMou7fXxN9jA5O/dNqhbZFhXZP9HGQKBgCzJ\nhcAIr3xYHf87lwVNgWef2Ly4rU0T/ETQBip9WNHAjDkJrLrK6kZFGk8cUB1hGmST\nwOcFXhAi38l41qNy6ELmODD9E0NdsGrAWkPqkAgn5f4qGSjZWoagw6EStzq2BZnG\nweTPwbrcYrlKZfHjkBvOPpy1kaBFzDV3nMDCBnRXAoGAGoMJKDwgltANt0YqJilc\nWR2yHbtza6BVwkv14gX+K3ClIBLPHZniDtiFDgInbxpJVziDRGUEjokPjpqMhT/5\n0NA2KJGO5AA5lsdZviTZK2TZoZcgd81vyKBRaFObVyXsSY1oe2qX/DIJGBJhKnj7\nKKfBLaSFjg0aO+AeCkGYGyM=").replace(/\\n/g, '\n'),
//   });

//   await doc.loadInfo();
//   const sheet = doc.sheetsByIndex[0]; // or doc.sheetsByTitle["Sheet1"]

//   await sheet.addRow({
//     Name: data.name,
//     Phone: data.phone,
//     Email: data.email,
//     Message: data.message,
//     Timestamp: data.timestamp,
//   });
// }

// import { RequestHandler } from "express";

// export interface EnquiryData {
//   name: string;
//   phone: string;
//   email?: string;
//   message?: string;
//   timestamp?: string;
// }

// export const handleEnquiry: RequestHandler = async (req, res) => {
//   try {
//     const { name, phone, email, message }: EnquiryData = req.body;

//     // Validate required fields
//     if (!name || !phone) {
//       return res.status(400).json({
//         error: "Name and phone number are required",
//         success: false,
//       });
//     }

//     // Create enquiry data with timestamp
//     const enquiryData: EnquiryData = {
//       name: name.trim(),
//       phone: phone.trim(),
//       email: email?.trim() || "",
//       message: message?.trim() || "",
//       timestamp: new Date().toISOString(),
//     };

//     // Log enquiry data (you can replace this with Google Sheets integration)
//     console.log("New enquiry received:", enquiryData);

//     // Here you can add integration with Google Sheets API
//     // Example: await saveToGoogleSheets(enquiryData);

//     // For now, we'll simulate saving to a database/sheets
//     // You can integrate with Google Sheets API using the google-spreadsheet package
//     // or use Google Apps Script Web App to receive data

//     // Send success response
//     res.status(200).json({
//       success: true,
//       message: "Enquiry submitted successfully. We will contact you soon!",
//       data: {
//         name: enquiryData.name,
//         timestamp: enquiryData.timestamp,
//       },
//     });
//   } catch (error) {
//     console.error("Error processing enquiry:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal server error. Please try again later.",
//     });
//   }
// };

// // Function to save data to Google Sheets (example implementation)
// // You'll need to set up Google Sheets API credentials
// async function saveToGoogleSheets(data: EnquiryData) {
//   // Example implementation:
//   // 1. Install google-spreadsheet package: npm install google-spreadsheet
//   // 2. Set up Google Service Account credentials
//   // 3. Share your Google Sheet with the service account email
//   // 4. Use the following code structure:
//   /*
//   const { GoogleSpreadsheet } = require('google-spreadsheet');
//   const doc = new GoogleSpreadsheet('YOUR_SHEET_ID');
  
//   await doc.useServiceAccountAuth({
//     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY,
//   });
  
//   await doc.loadInfo();
//   const sheet = doc.sheetsByIndex[0];
  
//   await sheet.addRow({
//     Name: data.name,
//     Phone: data.phone,
//     Email: data.email,
//     Message: data.message,
//     Timestamp: data.timestamp,
//   });
//   */
// }

