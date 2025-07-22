import React, { useState } from 'react';
import { Download, FileText, CreditCard, Settings, Info, Sparkles } from 'lucide-react';
import Button from './Button';
import { downloadCardAsPDF, downloadElementAsPDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const PDFDownloadButton = ({
  card,
  elementId,
  variant = 'button',
  className = ''
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const downloadOptions = [
    {
      id: 'full-page',
      name: 'Interactive A4 PDF',
      description: 'Full page with clickable links & QR code',
      icon: <FileText className="h-4 w-4" />,
      options: { format: 'A4', orientation: 'portrait' }
    },
    {
      id: 'business-card',
      name: 'Business Card PDF',
      description: 'Compact format with clickable elements',
      icon: <CreditCard className="h-4 w-4" />,
      options: { format: 'business-card', orientation: 'landscape' }
    },
    {
      id: 'letter',
      name: 'Letter Size PDF',
      description: 'US Letter with interactive features',
      icon: <FileText className="h-4 w-4" />,
      options: { format: 'letter', orientation: 'portrait' }
    }
  ];

  const handleDownload = async (options = {}) => {
    setIsDownloading(true);
    setShowOptions(false);
    
    try {
      toast.success('🚀 Generating Interactive PDF...', {
        duration: 2000,
        style: {
          background: '#1F2937',
          color: '#F3F4F6',
          border: '1px solid #374151'
        }
      });

      if (elementId) {
        await downloadElementAsPDF(elementId, card, options);
      } else {
        await downloadCardAsPDF(card, options);
      }

      toast.success('📄 Interactive PDF Downloaded Successfully! \n\n✨ Features:\n• Click phone numbers to call\n• Click emails to send messages\n• Click links to visit websites\n• Click WhatsApp for instant chat\n• Click payment info for UPI payments\n• Scan QR code for digital version', {
        duration: 8000,
        style: {
          maxWidth: '500px',
          background: '#059669',
          color: '#FFFFFF'
        }
      });
    } catch (error) {
      console.error('PDF download error:', error);
      toast.error('Failed to download PDF. Please try again.', {
        style: {
          background: '#DC2626',
          color: '#FFFFFF'
        }
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="outline"
          onClick={() => setShowOptions(!showOptions)}
          isLoading={isDownloading}
          className="flex items-center border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10 text-blue-300 hover:text-blue-200"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Interactive PDF
          <Sparkles className="h-4 w-4 ml-2" />
        </Button>

        {showOptions && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowOptions(false)}
            />
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-20">
              <div className="p-4">
                <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                  Choose Interactive PDF Format
                </h3>
                
                <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-xs text-blue-300">
                      <strong>Interactive PDF Features:</strong> Clickable phone numbers, emails, websites, WhatsApp links, payment buttons, and QR code for digital version access.
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {downloadOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleDownload(option.options)}
                      className="w-full flex items-start p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left border border-gray-600/30 hover:border-blue-500/30"
                      disabled={isDownloading}
                    >
                      <div className="flex-shrink-0 mt-0.5 text-blue-400">
                        {option.icon}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">
                          {option.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {option.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => handleDownload()}
      isLoading={isDownloading}
      className={`border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10 text-blue-300 hover:text-blue-200 ${className}`}
    >
      <Download className="h-4 w-4 mr-2" />
      Interactive PDF
      <Sparkles className="h-3 w-3 ml-2" />
    </Button>
  );
};

export default PDFDownloadButton;