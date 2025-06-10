import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText, Shield, ZoomIn, ZoomOut } from 'lucide-react';

interface DocumentViewerProps {
  documentPath: string;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentPath, onClose }) => {
  const fileName = documentPath.split('/').pop() || 'Document';
  const [isVisible, setIsVisible] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    setIsLoading(true);
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === '+' || e.key === '=') {
        setZoom((prev: number) => Math.min(prev + 25, 200));
      }
      if (e.key === '-') {
        setZoom((prev: number) => Math.max(prev - 25, 50));
      }
      if (e.key === '0') {
        setZoom(100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documentPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenExternal = () => {
    window.open(documentPath, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gray-900 border border-green-800 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Header */}
        <div className="bg-black/50 border-b border-green-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-green-400 hover:scale-110 transition-transform duration-300" />
              <div>
                <h2 className="text-lg font-bold text-white hover:text-green-300 transition-colors duration-300">{fileName}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 animate-pulse" />
                  <span>CLASSIFIED DOCUMENT</span>
                  <span>•</span>
                  <span>AUTHORIZED ACCESS ONLY</span>
                  <span>•</span>
                  <span className="text-green-400">Zoom: {zoom}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-gray-800/50 rounded border border-gray-600 p-1">
                <button
                  onClick={() => setZoom((prev: number) => Math.max(prev - 25, 50))}
                  className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-400 px-2">{zoom}%</span>
                <button
                  onClick={() => setZoom((prev: number) => Math.min(prev + 25, 200))}
                  className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95 text-xs"
                  title="Reset Zoom (0)"
                >
                  100%
                </button>
              </div>
              <button
                onClick={handleDownload}
                className="bg-green-900/30 text-green-400 px-3 py-2 rounded border border-green-500 hover:bg-green-900/50 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm flex items-center active:scale-95"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
              <button
                onClick={handleOpenExternal}
                className="bg-blue-900/30 text-blue-400 px-3 py-2 rounded border border-blue-500 hover:bg-blue-900/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-sm flex items-center active:scale-95"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Open External
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-red-900/30 hover:border-red-500 border border-transparent rounded p-2 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 bg-white overflow-auto">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}
          <div className="transition-transform duration-300" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
            <iframe
              src={documentPath}
              className="w-full h-full border-0"
              title={fileName}
              style={{ minHeight: '70vh', width: `${10000 / zoom}%` }}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black/50 border-t border-green-800 p-3">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="hover:text-green-400 transition-colors duration-300">Document Status: DECLASSIFIED FOR REVIEW</span>
              <span>•</span>
              <span className="hover:text-green-400 transition-colors duration-300">Security Level: ALPHA CLEARANCE</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs bg-gray-800/50 px-2 py-1 rounded border border-gray-600">
                ESC to close • +/- to zoom • 0 to reset
              </span>
              <span>Last Modified: 2024-01-15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;