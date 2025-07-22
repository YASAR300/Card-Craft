import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

export const downloadCardAsPDF = async (cardData, options = {}) => {
  try {
    const {
      format = 'A4',
      orientation = 'portrait',
      quality = 2.0
    } = options;

    // First try to capture the actual card element
    const cardElement = document.getElementById('card-preview-content');
    
    if (cardElement && format !== 'business-card') {
      // Generate PDF from actual card design
      await generateFromCardElement(cardElement, cardData, options);
    } else {
      // Fallback to custom PDF generation for business card format
      await generateCustomPDF(cardData, options);
    }

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

const generateFromCardElement = async (element, cardData, options) => {
  try {
    // Hide elements that shouldn't be in PDF
    const elementsToHide = element.querySelectorAll('.no-pdf, button, .feedback-form, .contact-form');
    const originalDisplay = [];
    
    elementsToHide.forEach((el, index) => {
      originalDisplay[index] = el.style.display;
      el.style.display = 'none';
    });

    // Generate high-quality canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#111827',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: 400,
      windowHeight: element.scrollHeight
    });

    // Restore hidden elements
    elementsToHide.forEach((el, index) => {
      el.style.display = originalDisplay[index];
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: options.orientation || 'portrait',
      unit: 'mm',
      format: options.format || 'A4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit the card properly
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), (pdfHeight - 40) / (imgHeight * 0.264583));
    
    const scaledWidth = imgWidth * 0.264583 * ratio;
    const scaledHeight = imgHeight * 0.264583 * ratio;
    
    const x = (pdfWidth - scaledWidth) / 2;
    const y = 10;

    // Add the card image
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);

    // Add QR code at bottom
    await addQRCodeToBottom(pdf, pdfWidth, pdfHeight);

    // Add interactive features note
    addInteractiveNote(pdf, pdfWidth, pdfHeight);

    // Generate filename and save
    const cardName = cardData?.personalInfo?.name || 'Digital-Card';
    const sanitizedName = cardName.replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `${sanitizedName}-Digital-Card.pdf`;

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF from card element:', error);
    throw error;
  }
};

const generateCustomPDF = async (cardData, options) => {
  try {
    const pdf = new jsPDF({
      orientation: options.orientation || 'landscape',
      unit: 'mm',
      format: options.format === 'business-card' ? [85.6, 53.98] : (options.format || 'A4')
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    if (options.format === 'business-card') {
      await generateBusinessCardDesign(pdf, cardData, pageWidth, pageHeight);
    } else {
      await generateFullPageDesign(pdf, cardData, pageWidth, pageHeight);
    }

    // Generate filename and save
    const cardName = cardData?.personalInfo?.name || 'Digital-Card';
    const sanitizedName = cardName.replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `${sanitizedName}-Digital-Card.pdf`;

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating custom PDF:', error);
    throw error;
  }
};

const generateBusinessCardDesign = async (pdf, cardData, pageWidth, pageHeight) => {
  // Create gradient background similar to card
  const primaryColor = hexToRgb(cardData.design?.primaryColor || '#3B82F6');
  const secondaryColor = hexToRgb(cardData.design?.secondaryColor || '#1E40AF');

  // Background gradient effect
  for (let i = 0; i < pageHeight; i += 2) {
    const ratio = i / pageHeight;
    const r = Math.round(primaryColor.r + (secondaryColor.r - primaryColor.r) * ratio);
    const g = Math.round(primaryColor.g + (secondaryColor.g - primaryColor.g) * ratio);
    const b = Math.round(primaryColor.b + (secondaryColor.b - primaryColor.b) * ratio);
    
    pdf.setFillColor(r, g, b);
    pdf.rect(0, i, pageWidth, 2, 'F');
  }

  // Profile section
  if (cardData.personalInfo?.profileImage) {
    try {
      const profileImg = await loadImageAsBase64(cardData.personalInfo.profileImage);
      // Circular profile image effect
      pdf.addImage(profileImg, 'PNG', 5, 5, 15, 15);
    } catch (error) {
      // Fallback circle for profile
      pdf.setFillColor(255, 255, 255, 0.2);
      pdf.circle(12.5, 12.5, 7.5, 'F');
    }
  }

  // Company logo
  if (cardData.personalInfo?.companyLogo) {
    try {
      const logoImg = await loadImageAsBase64(cardData.personalInfo.companyLogo);
      pdf.addImage(logoImg, 'PNG', pageWidth - 18, 3, 12, 8);
    } catch (error) {
      console.warn('Could not load company logo');
    }
  }

  // Name and designation with proper styling
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  const name = cardData.personalInfo?.name || 'Your Name';
  pdf.text(name, 25, 12);
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  const designation = cardData.personalInfo?.designation || 'Your Designation';
  pdf.text(designation, 25, 17);
  
  const company = cardData.personalInfo?.company || 'Your Company';
  pdf.setFontSize(7);
  pdf.text(company, 25, 21);

  // Contact information with icons
  pdf.setFontSize(6);
  let yPos = 30;
  
  if (cardData.personalInfo?.phone) {
    pdf.setTextColor(255, 255, 255);
    pdf.textWithLink(`📞 ${cardData.personalInfo.phone}`, 5, yPos, {
      url: `tel:${cardData.personalInfo.phone}`
    });
    yPos += 4;
  }
  
  if (cardData.personalInfo?.email) {
    pdf.textWithLink(`✉️ ${cardData.personalInfo.email}`, 5, yPos, {
      url: `mailto:${cardData.personalInfo.email}`
    });
    yPos += 4;
  }
  
  if (cardData.personalInfo?.website) {
    pdf.textWithLink(`🌐 ${cardData.personalInfo.website}`, 5, yPos, {
      url: cardData.personalInfo.website
    });
  }

  // QR code
  try {
    const qrCodeDataUrl = await generateQRCode();
    if (qrCodeDataUrl) {
      pdf.addImage(qrCodeDataUrl, 'PNG', pageWidth - 18, pageHeight - 18, 15, 15);
      pdf.setFontSize(4);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Scan for', pageWidth - 18, pageHeight - 20);
      pdf.text('Digital Card', pageWidth - 18, pageHeight - 18.5);
    }
  } catch (error) {
    console.warn('Could not add QR code');
  }
};

const generateFullPageDesign = async (pdf, cardData, pageWidth, pageHeight) => {
  // Create header with gradient background
  const primaryColor = hexToRgb(cardData.design?.primaryColor || '#3B82F6');
  const secondaryColor = hexToRgb(cardData.design?.secondaryColor || '#1E40AF');

  // Header gradient
  for (let i = 0; i < 50; i += 2) {
    const ratio = i / 50;
    const r = Math.round(primaryColor.r + (secondaryColor.r - primaryColor.r) * ratio);
    const g = Math.round(primaryColor.g + (secondaryColor.g - primaryColor.g) * ratio);
    const b = Math.round(primaryColor.b + (secondaryColor.b - primaryColor.b) * ratio);
    
    pdf.setFillColor(r, g, b);
    pdf.rect(0, i, pageWidth, 2, 'F');
  }

  // Profile image
  if (cardData.personalInfo?.profileImage) {
    try {
      const profileImg = await loadImageAsBase64(cardData.personalInfo.profileImage);
      pdf.addImage(profileImg, 'PNG', pageWidth - 45, 5, 35, 35);
    } catch (error) {
      console.warn('Could not load profile image');
    }
  }

  // Name and details
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(cardData.personalInfo?.name || 'Your Name', 20, 25);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text(cardData.personalInfo?.designation || 'Your Designation', 20, 35);
  
  pdf.setFontSize(14);
  pdf.text(cardData.personalInfo?.company || 'Your Company', 20, 42);

  let yPos = 65;

  // Contact section with card-like styling
  pdf.setFillColor(55, 65, 81); // Gray background like card
  pdf.rect(15, yPos - 5, pageWidth - 30, 60, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('📞 Contact Information', 20, yPos + 5);
  
  yPos += 15;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  
  if (cardData.personalInfo?.phone) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Phone:', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(96, 165, 250); // Blue color like card
    pdf.textWithLink(cardData.personalInfo.phone, 45, yPos, {
      url: `tel:${cardData.personalInfo.phone}`
    });
    pdf.setTextColor(255, 255, 255);
    yPos += 8;
  }
  
  if (cardData.personalInfo?.email) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Email:', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(96, 165, 250);
    pdf.textWithLink(cardData.personalInfo.email, 45, yPos, {
      url: `mailto:${cardData.personalInfo.email}`
    });
    pdf.setTextColor(255, 255, 255);
    yPos += 8;
  }
  
  if (cardData.personalInfo?.website) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Website:', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(96, 165, 250);
    pdf.textWithLink(cardData.personalInfo.website, 45, yPos, {
      url: cardData.personalInfo.website
    });
    pdf.setTextColor(255, 255, 255);
    yPos += 8;
  }

  yPos += 20;

  // Add other sections with card-like styling
  if (cardData.services && cardData.services.length > 0) {
    pdf.setFillColor(55, 65, 81);
    pdf.rect(15, yPos - 5, pageWidth - 30, 40, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🛠️ Our Services', 20, yPos + 5);
    
    yPos += 15;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    cardData.services.slice(0, 3).forEach((service, index) => {
      pdf.text(`• ${service.title || service}`, 25, yPos);
      yPos += 6;
    });
    
    yPos += 15;
  }

  // QR Code section at bottom
  await addQRCodeToBottom(pdf, pageWidth, pageHeight);
};

const addQRCodeToBottom = async (pdf, pageWidth, pageHeight) => {
  try {
    const qrCodeDataUrl = await generateQRCode();
    if (qrCodeDataUrl) {
      // QR Code background
      pdf.setFillColor(55, 65, 81);
      pdf.rect(pageWidth - 70, pageHeight - 80, 60, 70, 'F');
      
      // QR Code
      pdf.addImage(qrCodeDataUrl, 'PNG', pageWidth - 65, pageHeight - 75, 50, 50);
      
      // QR Code label
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('📱 Scan for Digital Card', pageWidth - 65, pageHeight - 20);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(156, 163, 175);
      pdf.text('Interactive • Always Updated', pageWidth - 65, pageHeight - 15);
    }
  } catch (error) {
    console.warn('Could not add QR code');
  }
};

const addInteractiveNote = (pdf, pageWidth, pageHeight) => {
  // Interactive features note
  pdf.setFillColor(59, 130, 246);
  pdf.rect(0, pageHeight - 8, pageWidth, 8, 'F');
  pdf.setFontSize(10);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🚀 Interactive PDF - Click links above | Scan QR for full digital experience', 10, pageHeight - 3);
};

const generateQRCode = async () => {
  try {
    const cardUrl = window.location.href;
    return await QRCode.toDataURL(cardUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#1F2937',
        light: '#FFFFFF'
      }
    });
  } catch (error) {
    console.warn('Could not generate QR code:', error);
    return '';
  }
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 59, g: 130, b: 246 };
};

const loadImageAsBase64 = (url) => {
  return new Promise((resolve, reject) => {
    if (url.startsWith('data:')) {
      resolve(url);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
};

export const downloadElementAsPDF = async (elementId, cardData, options = {}) => {
  try {
    return await downloadCardAsPDF(cardData, options);
  } catch (error) {
    console.error('Error generating PDF from element:', error);
    throw error;
  }
};