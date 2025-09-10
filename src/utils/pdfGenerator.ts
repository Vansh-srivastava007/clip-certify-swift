import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Certificate } from '@/types';

export const generateCertificatePDF = async (certificate: Certificate): Promise<void> => {
  // Create a temporary div with the certificate content
  const certificateElement = document.createElement('div');
  certificateElement.innerHTML = `
    <div style="
      width: 800px;
      height: 600px;
      padding: 40px;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      color: white;
      font-family: 'Arial', sans-serif;
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 8px solid #fbbf24;
    ">
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                    linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), 
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
        background-size: 30px 30px;
        background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
        opacity: 0.3;
      "></div>
      
      <div style="position: relative; z-index: 1;">
        <!-- Government of India Header -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          padding: 10px 20px;
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          border: 2px solid #fbbf24;
        ">
          <div style="
            width: 60px;
            height: 60px;
            background: #fbbf24;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #1e40af;
            font-weight: bold;
          ">🇮🇳</div>
          <div style="text-align: center;">
            <div style="font-size: 14px; font-weight: bold; color: #fbbf24;">GOVERNMENT OF INDIA</div>
            <div style="font-size: 12px; color: #ffffff;">MINISTRY OF YOUTH AFFAIRS & SPORTS</div>
            <div style="font-size: 10px; color: #ffffff;">ATHLETIC CERTIFICATION AUTHORITY</div>
          </div>
          <div style="
            width: 60px;
            height: 60px;
            background: #fbbf24;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #1e40af;
            font-weight: bold;
          ">⚡</div>
        </div>

        <h1 style="
          font-size: 42px;
          font-weight: bold;
          margin: 0 0 15px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        ">CERTIFICATE</h1>
        
        <h2 style="
          font-size: 32px;
          margin: 0 0 40px 0;
          color: #fbbf24;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        ">OF ATHLETIC ACHIEVEMENT</h2>
        
        <div style="
          font-size: 24px;
          margin: 30px 0;
          line-height: 1.6;
        ">
          This certifies that
        </div>
        
        <div style="
          font-size: 36px;
          font-weight: bold;
          margin: 20px 0 40px 0;
          padding: 15px 30px;
          border: 3px solid white;
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        ">${certificate.userName}</div>
        
        <div style="
          font-size: 20px;
          margin: 20px 0;
          line-height: 1.6;
        ">
          has demonstrated excellence in
        </div>
        
        <div style="
          font-size: 28px;
          font-weight: bold;
          margin: 20px 0;
          color: #34d399;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        ">${certificate.customActivity || certificate.activity}</div>
        
        <div style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 40px;
          font-size: 14px;
        ">
          <div>
            <div style="font-weight: bold; margin-bottom: 5px;">Performance Score</div>
            <div style="
              font-size: 20px;
              color: #fbbf24;
              font-weight: bold;
            ">${certificate.score}/100</div>
          </div>
          
          <div>
            <div style="font-weight: bold; margin-bottom: 5px;">Date Issued</div>
            <div>${certificate.date}</div>
          </div>
          
          <div>
            <div style="font-weight: bold; margin-bottom: 5px;">Certificate ID</div>
            <div style="font-family: monospace; font-size: 10px;">${certificate.id}</div>
          </div>
        </div>
        
        <!-- Government Seal and Signature -->
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid rgba(255,255,255,0.3);
        ">
          <div style="text-align: center;">
            <div style="
              width: 80px;
              height: 80px;
              background: rgba(255,255,255,0.1);
              border: 3px solid #fbbf24;
              border-radius: 50%;
              margin: 0 auto 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
            ">🏛️</div>
            <div style="font-size: 10px; font-weight: bold;">OFFICIAL SEAL</div>
            <div style="font-size: 8px;">GOI CERTIFIED</div>
          </div>
          
          <div style="text-align: center; flex: 1;">
            <div style="
              background: rgba(255,255,255,0.1);
              padding: 10px 20px;
              border-radius: 10px;
              border: 1px solid #fbbf24;
              margin: 0 20px;
            ">
              <div style="font-size: 12px; font-weight: bold; color: #fbbf24;">VERIFIED & AUTHENTICATED</div>
              <div style="font-size: 10px;">This certificate is officially recognized by</div>
              <div style="font-size: 10px; font-weight: bold;">Government of India Sports Ministry</div>
            </div>
          </div>
          
          <div style="text-align: center;">
            <div style="
              width: 80px;
              height: 40px;
              background: rgba(255,255,255,0.1);
              border: 2px solid #fbbf24;
              border-radius: 5px;
              margin: 0 auto 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
            ">✓</div>
            <div style="font-size: 10px; font-weight: bold;">AUTHORIZED</div>
            <div style="font-size: 8px;">SIGNATURE</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add to document temporarily
  certificateElement.style.position = 'fixed';
  certificateElement.style.top = '-10000px';
  certificateElement.style.left = '-10000px';
  document.body.appendChild(certificateElement);
  
  try {
    // Convert to canvas
    const canvas = await html2canvas(certificateElement, {
      width: 800,
      height: 600,
      scale: 2,
      backgroundColor: null,
      logging: false
    });
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 297; // A4 landscape width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Download the PDF
    pdf.save(`${certificate.userName}_${certificate.activity}_Certificate.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(certificateElement);
  }
};

export const generateScore = (): number => {
  // Generate a random score between 60-100 (realistic performance range)
  return Math.floor(Math.random() * 41) + 60;
};