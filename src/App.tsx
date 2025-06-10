import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Terminal,
  Radar,
  Shield,
  Clock,
  Database,
  Activity
} from 'lucide-react';
import CaseFileModal from './components/CaseFileModal';
import RadarChart from './components/RadarChart';
import TerminalSimulator from './components/TerminalSimulator';
import DocumentViewer from './components/DocumentViewer';

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

const caseFiles: CaseFile[] = [
  {
    id: "CASE-001",
    title: "Experimental Design: The Germination of an Experimental Study Indulging Strawberries",
    classification: "TOP SECRET",
    status: "ACTIVE",
    alignment: "HIGH",
    lastAccessed: "2024-03-15T09:23:00Z",
    agent: "AGENT-007",
    focus: "Investigating optimal conditions for strawberry germination through controlled experimental design, focusing on temperature, humidity, and soil composition variables",
    methodology: [
      "Systematic temperature variation experiments (15°C to 30°C)",
      "Humidity level testing (40% to 80% relative humidity)",
      "Soil composition analysis with varying organic matter content",
      "Statistical analysis using ANOVA and regression models",
      "Control group implementation with standard growing conditions"
    ],
    conclusions: "Optimal germination conditions identified at 22°C with 65% humidity. Soil composition with 30% organic matter showed highest success rate (87%). Temperature variations beyond ±3°C significantly reduced germination rates. Humidity levels below 50% resulted in 40% lower success rates",
    gaps: "Limited to laboratory conditions, need for field testing across different seasons, potential genetic variations not accounted for, and long-term growth monitoring required",
    alignmentScore: {
      focus: 92,
      methodology: 95,
      analysis: 88,
      conclusions: 90,
      gaps: 85
    }
  },
  {
    id: "CASE-002",
    title: "Content Analysis: Advertising Appeals of Nike Sportswear and User Engagement",
    classification: "TOP SECRET",
    status: "ACTIVE",
    alignment: "HIGH",
    lastAccessed: "2024-03-18T14:45:00Z",
    agent: "AGENT-007",
    focus: "Comprehensive analysis of Nike's advertising strategies and their impact on user engagement across digital platforms",
    methodology: [
      "Content analysis of 100 Nike advertisements from 2020-2023",
      "Engagement metrics tracking across social media platforms",
      "A/B testing of different emotional and rational appeals",
      "User sentiment analysis through social media monitoring",
      "Cross-platform performance comparison"
    ],
    conclusions: "Emotional appeals showed 40% higher engagement rates than rational appeals. Social proof elements increased conversion by 25%. Video content outperformed static images by 60%. User-generated content showed 35% higher trust metrics",
    gaps: "Limited to digital campaigns, potential cultural bias in appeal effectiveness, need for longitudinal study, and offline impact not measured",
    alignmentScore: {
      focus: 88,
      methodology: 90,
      analysis: 92,
      conclusions: 85,
      gaps: 82
    }
  },
  {
    id: "CASE-003",
    title: "Mixed Method: Bridging the Ball Gap",
    classification: "TOP SECRET",
    status: "ACTIVE",
    alignment: "HIGH",
    lastAccessed: "2024-03-19T16:30:00Z",
    agent: "AGENT-007",
    focus: "Comprehensive investigation of ball design impact on player performance and injury prevention through combined survey and experimental approaches",
    methodology: [
      "Quantitative analysis of player performance metrics across 500 games",
      "Qualitative interviews with 50 professional athletes",
      "Biomechanical analysis of different ball designs",
      "Statistical analysis of injury rates and patterns",
      "Comparative study of traditional vs. optimized ball designs"
    ],
    conclusions: "Ball design significantly impacts player performance and safety. Key findings show a 23% reduction in injury rates with optimized ball design, 15% improvement in player accuracy, and 30% better grip feedback. New design showed 40% higher player satisfaction",
    gaps: "Limited data on long-term effects, need for more diverse sport-specific studies, potential bias in professional athlete sample, and environmental factors not fully considered",
    alignmentScore: {
      focus: 95,
      methodology: 93,
      analysis: 90,
      conclusions: 92,
      gaps: 88
    }
  }
];

function App() {
  const [selectedCase, setSelectedCase] = useState<CaseFile | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const glitchTimer = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedCase || viewingDocument)) {
        setSelectedCase(null);
        setViewingDocument(null);
      }
      
      if (e.key >= '1' && e.key <= '3' && !selectedCase && !viewingDocument) {
        const index = parseInt(e.key) - 1;
        if (caseFiles[index]) {
          setSelectedCase(caseFiles[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCase, viewingDocument]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400';
      case 'UNDER REVIEW': return 'text-yellow-400';
      case 'COMPLETED': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getAlignmentColor = (alignment: string) => {
    switch (alignment) {
      case 'HIGH': return 'text-green-400';
      case 'PARTIAL': return 'text-yellow-400';
      case 'LOW': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'bg-red-900/30 text-red-400 border-red-500';
      case 'CLASSIFIED': return 'bg-yellow-900/30 text-yellow-400 border-yellow-500';
      case 'CONFIDENTIAL': return 'bg-blue-900/30 text-blue-400 border-blue-500';
      default: return 'bg-gray-900/30 text-gray-400 border-gray-500';
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/terminal" element={
          <div className="min-h-screen bg-black">
            <TerminalSimulator />
          </div>
        } />
        <Route path="/" element={
          <div className={`min-h-screen bg-black text-green-400 font-mono transition-all duration-300 ${glitchEffect ? 'animate-pulse' : ''}`}>
            {/* Background Grid */}
            <div className="fixed inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-green-800 bg-black/90 backdrop-blur-sm transition-all duration-300 hover:bg-black/95">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 group">
                    <Shield className="w-8 h-8 text-green-400 transition-all duration-300 group-hover:text-green-300 group-hover:scale-110" />
                    <div>
                      <h1 className="text-2xl font-bold tracking-wider transition-colors duration-300 group-hover:text-green-300">
                        RESEARCH INTELLIGENCE
                      </h1>
                      <p className="text-sm text-green-600 transition-colors duration-300 group-hover:text-green-500">
                        CASE FILE ANALYSIS SYSTEM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-green-900/20 border border-green-800/50 hover:bg-green-900/30 hover:border-green-700 transition-all duration-300 cursor-pointer">
                      <Activity className="w-4 h-4 animate-pulse" />
                      <span>SYSTEM ACTIVE</span>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-900/20 border border-gray-800/50 hover:bg-gray-900/30 hover:border-gray-700 transition-all duration-300">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Mission Control Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Case Files Overview */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-900/50 border border-green-800 rounded-lg p-6 hover:bg-gray-900/60 hover:border-green-700 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center group">
                        <FileText className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                        COMPLETED CASE FILES
                      </h2>
                      <div className="flex items-center space-x-2 text-sm px-3 py-1 rounded-lg bg-green-900/20 border border-green-800/50 hover:bg-green-900/30 transition-all duration-300">
                        <Search className="w-4 h-4" />
                        <span>CLEARANCE LEVEL: ALPHA</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {caseFiles.map((caseFile, index) => (
                        <div
                          key={caseFile.id}
                          className={`bg-black/50 border rounded-lg p-4 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 ${
                            hoveredCase === caseFile.id 
                              ? 'border-green-500 bg-green-900/10 shadow-lg shadow-green-500/30' 
                              : 'border-green-700/50 hover:border-green-500'
                          }`}
                          onMouseEnter={() => setHoveredCase(caseFile.id)}
                          onMouseLeave={() => setHoveredCase(null)}
                          onClick={() => setSelectedCase(caseFile)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedCase(caseFile);
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-green-300 font-bold transition-colors duration-300 hover:text-green-200">
                                  {caseFile.id}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded border transition-all duration-300 hover:scale-105 ${getClassificationColor(caseFile.classification)}`}>
                                  {caseFile.classification}
                                </span>
                                <span className={`text-sm transition-colors duration-300 ${getStatusColor(caseFile.status)}`}>
                                  ● {caseFile.status}
                                </span>
                                <div className="bg-green-900/30 text-green-400 px-2 py-1 text-xs rounded border border-green-500 transition-all duration-300 hover:bg-green-900/50 hover:scale-105">
                                  REVIEWED
                                </div>
                                <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded border border-gray-600">
                                  Press {index + 1}
                                </div>
                              </div>
                              <h3 className="text-white font-semibold mb-2 transition-colors duration-300 hover:text-green-300">
                                {caseFile.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                <span className="hover:text-green-400 transition-colors duration-300">Agent: {caseFile.agent}</span>
                                <span className="hover:text-green-400 transition-colors duration-300">Last Access: {caseFile.lastAccessed}</span>
                                <span className={`flex items-center transition-colors duration-300 ${getAlignmentColor(caseFile.alignment)}`}>
                                  {caseFile.alignment === 'HIGH' && <CheckCircle className="w-4 h-4 mr-1" />}
                                  {caseFile.alignment === 'PARTIAL' && <AlertTriangle className="w-4 h-4 mr-1" />}
                                  {caseFile.alignment === 'LOW' && <XCircle className="w-4 h-4 mr-1" />}
                                  ALIGNMENT: {caseFile.alignment}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCase(caseFile);
                                  }}
                                  className="bg-green-900/30 text-green-400 px-3 py-1 text-sm rounded border border-green-500 hover:bg-green-900/50 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center active:scale-95"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Analysis
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Radar Analysis */}
                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-green-800 rounded-lg p-6 hover:bg-gray-900/60 hover:border-green-700 transition-all duration-300">
                    <h3 className="text-lg font-bold mb-4 flex items-center group">
                      <Radar className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-45" />
                      ALIGNMENT RADAR
                    </h3>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <RadarChart caseFiles={caseFiles} />
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-green-800 rounded-lg p-6 hover:bg-gray-900/60 hover:border-green-700 transition-all duration-300">
                    <h3 className="text-lg font-bold mb-4 flex items-center group">
                      <Database className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                      SYSTEM STATUS
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between hover:bg-green-900/10 px-2 py-1 rounded transition-all duration-300">
                        <span>Total Cases:</span>
                        <span className="text-green-400 font-bold">{caseFiles.length}</span>
                      </div>
                      <div className="flex justify-between hover:bg-blue-900/10 px-2 py-1 rounded transition-all duration-300">
                        <span>Completed:</span>
                        <span className="text-blue-400 font-bold">{caseFiles.filter(c => c.status === 'COMPLETED').length}</span>
                      </div>
                      <div className="flex justify-between hover:bg-green-900/10 px-2 py-1 rounded transition-all duration-300">
                        <span>High Alignment:</span>
                        <span className="text-green-400 font-bold">{caseFiles.filter(c => c.alignment === 'HIGH').length}</span>
                      </div>
                      <div className="border-t border-green-800 pt-3 mt-3">
                        <div className="flex justify-between hover:bg-green-900/10 px-2 py-1 rounded transition-all duration-300">
                          <span>Avg. Score:</span>
                          <span className="text-green-400 font-bold">89.2%</span>
                        </div>
                        <div className="flex justify-between hover:bg-green-900/10 px-2 py-1 rounded transition-all duration-300">
                          <span>Review Status:</span>
                          <span className="text-green-400 font-bold animate-pulse">ALL CLEAR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Section */}
              <div className="bg-gray-900/50 border border-green-800 rounded-lg p-6 hover:bg-gray-900/60 hover:border-green-700 transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 flex items-center group">
                  <Terminal className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  ANALYSIS TERMINAL
                  <span className="ml-auto text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded border border-gray-600">
                    Press ESC to close modals
                  </span>
                </h3>
                <div className="hover:scale-[1.01] transition-transform duration-300">
                  <TerminalSimulator />
                </div>
              </div>
            </div>

            {/* Case File Modal */}
            {selectedCase && (
              <CaseFileModal
                caseFile={selectedCase}
                onClose={() => setSelectedCase(null)}
              />
            )}

            {/* Document Viewer */}
            {viewingDocument && (
              <DocumentViewer
                documentPath={viewingDocument}
                onClose={() => setViewingDocument(null)}
              />
            )}
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;