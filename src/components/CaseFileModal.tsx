import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  Target, 
  Microscope, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Users,
  Calendar,
  Shield,
  Download,
  Eye,
  ExternalLink
} from 'lucide-react';
import DocumentViewer from './DocumentViewer';

interface CaseFile {
  id: string;
  title: string;
  classification: 'TOP SECRET' | 'CLASSIFIED' | 'CONFIDENTIAL';
  status: 'ACTIVE' | 'UNDER REVIEW' | 'COMPLETED';
  alignment: 'HIGH' | 'PARTIAL' | 'LOW';
  lastAccessed: string;
  agent: string;
  focus: string;
  methodology: string[];
  conclusions: string;
  gaps: string;
  documentPath?: string;
  alignmentScore: {
    focus: number;
    methodology: number;
    analysis: number;
    conclusions: number;
    gaps: number;
  };
}

interface CaseFileModalProps {
  caseFile: CaseFile;
  onClose: () => void;
}

const CaseFileModal: React.FC<CaseFileModalProps> = ({ caseFile, onClose }) => {
  const [activeTab, setActiveTab] = useState('briefing');
  const [isVisible, setIsVisible] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewingDocument) {
          setViewingDocument(false);
        } else {
          onClose();
        }
      }
      
      // Tab navigation with numbers
      if (e.key >= '1' && e.key <= '4') {
        const tabIndex = parseInt(e.key) - 1;
        const tabIds = ['briefing', 'methodology', 'conclusions', 'reflection'];
        if (tabIds[tabIndex]) {
          setActiveTab(tabIds[tabIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, viewingDocument]);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'bg-red-900/30 text-red-400 border-red-500';
      case 'CLASSIFIED': return 'bg-yellow-900/30 text-yellow-400 border-yellow-500';
      case 'CONFIDENTIAL': return 'bg-blue-900/30 text-blue-400 border-blue-500';
      default: return 'bg-gray-900/30 text-gray-400 border-gray-500';
    }
  };

  const getAlignmentIcon = (alignment: string) => {
    switch (alignment) {
      case 'HIGH': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'PARTIAL': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'LOW': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const tabs = [
    { id: 'briefing', label: 'EXECUTIVE BRIEFING', icon: FileText, key: '1' },
    { id: 'methodology', label: 'METHODOLOGY ANALYSIS', icon: Microscope, key: '2' },
    { id: 'conclusions', label: 'FINDINGS REPORT', icon: Target, key: '3' },
    { id: 'reflection', label: 'PEER REVIEW', icon: Users, key: '4' }
  ];

  const handleViewDocument = () => {
    if (caseFile.documentPath) {
      setViewingDocument(true);
    }
  };

  const handleDownload = () => {
    if (caseFile.documentPath) {
      const link = document.createElement('a');
      link.href = caseFile.documentPath;
      link.download = caseFile.documentPath.split('/').pop() || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleOpenExternal = () => {
    if (caseFile.documentPath) {
      window.open(caseFile.documentPath, '_blank', 'noopener,noreferrer');
    }
  };

  if (viewingDocument && caseFile.documentPath) {
    return (
      <DocumentViewer
        documentPath={caseFile.documentPath}
        onClose={() => setViewingDocument(false)}
      />
    );
  }

  return (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gray-900 border border-green-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Header */}
        <div className="bg-black/50 border-b border-green-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-green-300 font-bold text-lg hover:text-green-200 transition-colors duration-300">{caseFile.id}</span>
                <span className={`px-3 py-1 text-sm rounded border transition-all duration-300 hover:scale-105 ${getClassificationColor(caseFile.classification)}`}>
                  {caseFile.classification}
                </span>
                <div className="flex items-center space-x-2">
                  {getAlignmentIcon(caseFile.alignment)}
                  <span className="text-sm">ALIGNMENT: {caseFile.alignment}</span>
                </div>
                <div className="bg-green-900/30 text-green-400 px-2 py-1 text-xs rounded border border-green-500 animate-pulse">
                  CASE CLOSED
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 hover:text-green-300 transition-colors duration-300">{caseFile.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center hover:text-green-400 transition-colors duration-300">
                  <Shield className="w-4 h-4 mr-1" />
                  Agent: {caseFile.agent}
                </span>
                <span className="flex items-center hover:text-green-400 transition-colors duration-300">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last Access: {caseFile.lastAccessed}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {caseFile.documentPath && (
                <>
                  <button
                    onClick={handleViewDocument}
                    className="bg-green-900/30 text-green-400 px-3 py-2 rounded border border-green-500 hover:bg-green-900/50 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm flex items-center active:scale-95"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Document
                  </button>
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
                </>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-red-900/30 hover:border-red-500 border border-transparent rounded p-2 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-green-800">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 ${
                  activeTab === tab.id
                    ? 'border-green-400 text-green-400 bg-green-900/20 shadow-lg'
                    : 'border-transparent text-gray-400 hover:text-green-400 hover:bg-green-900/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="text-xs bg-gray-800/50 px-1 py-0.5 rounded border border-gray-600">{tab.key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'briefing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-black/30 border border-green-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-green-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-green-400">RESEARCH FOCUS</h3>
                  <div className="bg-green-900/30 text-green-400 px-2 py-1 text-xs rounded border border-green-500 animate-pulse">
                    SCOPE VALIDATED
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed hover:text-gray-200 transition-colors duration-300">{caseFile.focus}</p>
              </div>

              <div className="bg-black/30 border border-green-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-green-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-green-400">RESEARCH GAPS STATUS</h3>
                  <div className="bg-green-900/30 text-green-400 px-2 py-1 text-xs rounded border border-green-500 animate-pulse">
                    GAPS ADDRESSED
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed hover:text-gray-200 transition-colors duration-300">{caseFile.gaps}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 border border-green-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-green-600 hover:scale-105 transition-all duration-300">
                  <h4 className="text-green-400 font-bold mb-2">ALIGNMENT METRICS</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(caseFile.alignmentScore).map(([key, score]) => (
                      <div key={key} className="flex justify-between hover:bg-green-900/10 px-2 py-1 rounded transition-all duration-300">
                        <span className="capitalize text-gray-400">{key}:</span>
                        <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-black/30 border border-blue-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-blue-600 hover:scale-105 transition-all duration-300">
                  <h4 className="text-blue-400 font-bold mb-2">CASE STATUS</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between hover:bg-blue-900/10 px-2 py-1 rounded transition-all duration-300">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400 font-bold">{caseFile.status}</span>
                    </div>
                    <div className="flex justify-between hover:bg-blue-900/10 px-2 py-1 rounded transition-all duration-300">
                      <span className="text-gray-400">Classification:</span>
                      <span className="text-blue-400 font-bold">{caseFile.classification}</span>
                    </div>
                    <div className="flex justify-between hover:bg-blue-900/10 px-2 py-1 rounded transition-all duration-300">
                      <span className="text-gray-400">Priority:</span>
                      <span className="text-green-400 font-bold animate-pulse">RESOLVED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-black/30 border border-green-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-green-600 transition-all duration-300">
                <h3 className="text-lg font-bold text-green-400 mb-4">METHODOLOGY VALIDATION</h3>
                <div className="grid grid-cols-2 gap-4">
                  {caseFile.methodology.map((method, index) => (
                    <div key={index} className="bg-gray-800/50 border border-green-600/30 rounded p-3 hover:bg-gray-800/70 hover:border-green-500/50 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{method}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs transition-colors duration-300 ${i < 4 ? 'text-green-400 hover:text-green-300' : 'text-gray-600'}`}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black/30 border border-green-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-green-600 transition-all duration-300">
                <h3 className="text-lg font-bold text-green-400 mb-4">QUALITY ASSURANCE</h3>
                <div className="space-y-3">
                  <div className="border border-green-500/50 rounded p-3 bg-green-900/10 hover:bg-green-900/20 hover:border-green-400 hover:scale-105 transition-all duration-300">
                    <div className="text-green-400 font-bold text-sm mb-1">METHODOLOGY APPROVED</div>
                    <div className="text-gray-300 text-sm">All research methods validated through peer review process</div>
                  </div>
                  <div className="border border-green-500/50 rounded p-3 bg-green-900/10 hover:bg-green-900/20 hover:border-green-400 hover:scale-105 transition-all duration-300">
                    <div className="text-green-400 font-bold text-sm mb-1">STATISTICAL VALIDATION</div>
                    <div className="text-gray-300 text-sm">Statistical significance achieved across all primary metrics</div>
                  </div>
                  <div className="border border-green-500/50 rounded p-3 bg-green-900/10 hover:bg-green-900/20 hover:border-green-400 hover:scale-105 transition-all duration-300">
                    <div className="text-green-400 font-bold text-sm mb-1">REPLICATION READY</div>
                    <div className="text-gray-300 text-sm">Methodology documented for independent replication</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conclusions' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-black/30 border border-green-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-green-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-green-400">FINAL VERDICT</h3>
                  <div className="bg-green-900/30 text-green-400 px-3 py-1 text-sm rounded border border-green-500 animate-pulse">
                    HIGH CONFIDENCE
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed hover:text-gray-200 transition-colors duration-300">{caseFile.conclusions}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center hover:bg-green-900/30 hover:border-green-600 hover:scale-105 transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2 hover:scale-110 transition-transform duration-300" />
                  <div className="text-green-400 font-bold">VALIDATED</div>
                  <div className="text-sm text-gray-400 mt-1">Research complete</div>
                </div>
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center hover:bg-green-900/30 hover:border-green-600 hover:scale-105 transition-all duration-300">
                  <Target className="w-8 h-8 text-green-400 mx-auto mb-2 hover:scale-110 transition-transform duration-300" />
                  <div className="text-green-400 font-bold">OBJECTIVES MET</div>
                  <div className="text-sm text-gray-400 mt-1">All goals achieved</div>
                </div>
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center hover:bg-green-900/30 hover:border-green-600 hover:scale-105 transition-all duration-300">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-2 hover:scale-110 transition-transform duration-300" />
                  <div className="text-green-400 font-bold">PEER APPROVED</div>
                  <div className="text-sm text-gray-400 mt-1">Review complete</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reflection' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-black/30 border border-blue-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-blue-600 transition-all duration-300">
                <h3 className="text-lg font-bold text-blue-400 mb-4">PEER REVIEW SUMMARY</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4 hover:bg-green-900/10 p-2 rounded-r transition-all duration-300">
                    <div className="text-green-400 font-bold text-sm">LEAD REVIEWER</div>
                    <div className="text-gray-300 text-sm mt-1">
                      "Exceptional research quality. Methodology is robust and findings are statistically significant. 
                      Recommend for publication consideration. All AP Research standards exceeded."
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 hover:bg-green-900/10 p-2 rounded-r transition-all duration-300">
                    <div className="text-green-400 font-bold text-sm">METHODOLOGY EXPERT</div>
                    <div className="text-gray-300 text-sm mt-1">
                      "Research design is exemplary. Statistical analysis appropriate and thorough. 
                      Gap identification and addressing demonstrates advanced research maturity."
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 hover:bg-green-900/10 p-2 rounded-r transition-all duration-300">
                    <div className="text-green-400 font-bold text-sm">ACADEMIC ADVISOR</div>
                    <div className="text-gray-300 text-sm mt-1">
                      "Outstanding work that demonstrates mastery of research process. Clear contribution 
                      to field knowledge. Presentation and documentation meet professional standards."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 border border-green-700/50 rounded-lg p-4 hover:bg-black/40 hover:border-green-600 transition-all duration-300">
                <h3 className="text-lg font-bold text-green-400 mb-4">FINAL ASSESSMENT</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700 hover:bg-green-900/10 px-2 rounded transition-all duration-300">
                    <span className="text-gray-400">Research Quality:</span>
                    <span className="text-green-400 font-bold">EXCEPTIONAL</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700 hover:bg-green-900/10 px-2 rounded transition-all duration-300">
                    <span className="text-gray-400">AP Standards Alignment:</span>
                    <span className="text-green-400 font-bold">EXCEEDS EXPECTATIONS</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700 hover:bg-green-900/10 px-2 rounded transition-all duration-300">
                    <span className="text-gray-400">Peer Review Status:</span>
                    <span className="text-green-400 font-bold">APPROVED</span>
                  </div>
                  <div className="flex justify-between items-center py-2 hover:bg-green-900/10 px-2 rounded transition-all duration-300">
                    <span className="text-gray-400">Recommendation:</span>
                    <span className="text-green-400 font-bold animate-pulse">PUBLICATION READY</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-black/50 border-t border-green-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center hover:text-green-400 transition-colors duration-300">
                <Eye className="w-4 h-4 mr-1" />
                Case Reviewed & Approved
              </span>
              <span>All Standards Met</span>
              <span className="text-xs bg-gray-800/50 px-2 py-1 rounded border border-gray-600">
                ESC to close
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {caseFile.documentPath && (
                <>
                  <a
                    href={caseFile.documentPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-900/30 text-blue-400 px-4 py-2 rounded border border-blue-500 hover:bg-blue-900/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-sm flex items-center active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Document
                  </a>
                  <a
                    href={caseFile.documentPath}
                    download
                    className="bg-green-900/30 text-green-400 px-4 py-2 rounded border border-green-500 hover:bg-green-900/50 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm flex items-center active:scale-95"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </>
              )}
              <button
                onClick={onClose}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 hover:scale-105 transition-all duration-300 text-sm active:scale-95"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseFileModal;