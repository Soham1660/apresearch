import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TerminalSimulator: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'RESEARCH ANALYSIS TERMINAL v2.1.0',
    'Authorized access granted. Type "help" for available commands.',
    'Press SPACE to focus terminal input',
    'Press F to toggle fullscreen',
    ''
  ]);
  const [currentPath] = useState('~/research-intel');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add keyboard event listener for space key and fullscreen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isTyping) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTyping]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      navigate('/terminal');
    } else {
      navigate('/');
    }
    setIsFullscreen(!isFullscreen);
  };

  const commands = {
    help: () => [
      'Available commands:',
      '  analyze    - Run analysis on current case files',
      '  status     - Display system status and case overview',
      '  gap        - Identify research gaps in active cases',
      '  methodology - Review methodology strength ratings',
      '  conclusion - Display key findings summary',
      '  limitations - List acknowledged study limitations',
      '  cite       - Generate citation for selected research',
      '  reflection - Access team reflection notes',
      '  clear      - Clear terminal screen',
      '  help       - Show this help message',
      ''
    ],
    analyze: () => [
      'ANALYSIS COMPLETE',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Case CASE-001: Experimental Design Study',
      '  ✓ Methodology robust (95% confidence)',
      '  ✓ Statistical significance achieved',
      '  ✓ Temperature and humidity correlations validated',
      '',
      'Case CASE-002: Content Analysis Study',
      '  ✓ Methodology validated (90% confidence)',
      '  ✓ Multi-platform analysis complete',
      '  ✓ Engagement metrics validated',
      '',
      'Case CASE-003: Mixed Method Study',
      '  ✓ Methodology strengthened (93% confidence)',
      '  ✓ Quantitative and qualitative data integrated',
      '  ✓ Performance metrics validated',
      '',
      'RECOMMENDATION: All cases meet publication standards',
      ''
    ],
    status: () => [
      'SYSTEM STATUS REPORT',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `Timestamp: ${new Date().toLocaleString()}`,
      'Classification Level: ALPHA',
      'Active Cases: 3',
      '  • CASE-001: Experimental Design [HIGH] ✓',
      '  • CASE-002: Content Analysis [HIGH] ✓',
      '  • CASE-003: Mixed Method [HIGH] ✓',
      '',
      'System Health: OPERATIONAL',
      'Security Status: SECURE',
      'Review Status: ALL APPROVED',
      'Last Backup: 2024-03-19 16:30:00',
      ''
    ],
    gap: () => [
      'RESEARCH GAP ANALYSIS',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'CASE-001 Gap Resolution:',
      '  ✓ Laboratory to field testing transition planned',
      '  ✓ Seasonal variation study initiated',
      '  ✓ Genetic diversity analysis scheduled',
      '',
      'CASE-002 Gap Resolution:',
      '  ✓ Cross-cultural validation in progress',
      '  ✓ Long-term impact assessment planned',
      '  ✓ Offline impact measurement framework developed',
      '',
      'CASE-003 Gap Resolution:',
      '  ✓ Long-term performance tracking initiated',
      '  ✓ Environmental factor analysis scheduled',
      '  ✓ Cross-sport validation planned',
      '',
      'Status: RESEARCH GAPS BEING SYSTEMATICALLY ADDRESSED',
      ''
    ],
    methodology: () => [
      'METHODOLOGY STRENGTH ASSESSMENT',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'CASE-001 Methods:',
      '  Temperature Control: ★★★★★',
      '  Humidity Testing: ★★★★★',
      '  Soil Analysis: ★★★★★',
      '  Statistical Modeling: ★★★★★',
      '  Control Implementation: ★★★★★',
      '',
      'CASE-002 Methods:',
      '  Content Analysis: ★★★★★',
      '  Engagement Tracking: ★★★★☆',
      '  A/B Testing: ★★★★★',
      '  Sentiment Analysis: ★★★★☆',
      '  Cross-Platform Analysis: ★★★★★',
      '',
      'CASE-003 Methods:',
      '  Performance Metrics: ★★★★★',
      '  Athlete Interviews: ★★★★☆',
      '  Biomechanical Analysis: ★★★★★',
      '  Injury Rate Analysis: ★★★★☆',
      '  Design Comparison: ★★★★★',
      '',
      'Overall Assessment: ROBUST methodology across all cases',
      ''
    ],
    conclusion: () => [
      'KEY FINDINGS SUMMARY',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'CASE-001 Conclusions:',
      '  • Optimal temperature: 22°C (87% success rate)',
      '  • Ideal humidity: 65% (p<0.001)',
      '  • Soil composition: 30% organic matter optimal',
      '  • Temperature sensitivity: ±3°C critical range',
      '',
      'CASE-002 Conclusions:',
      '  • Emotional appeals: 40% higher engagement',
      '  • Social proof: 25% conversion increase',
      '  • Video content: 60% better performance',
      '  • User-generated content: 35% higher trust',
      '',
      'CASE-003 Conclusions:',
      '  • Injury reduction: 23% with new design',
      '  • Accuracy improvement: 15%',
      '  • Grip feedback: 30% better',
      '  • Player satisfaction: 40% higher',
      '',
      'Meta-Analysis: HIGH confidence findings across all studies',
      ''
    ],
    limitations: () => [
      'LIMITATIONS ASSESSMENT & RESOLUTION',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'CASE-001 Limitations → Resolution:',
      '  ✗ Lab-only conditions → ✓ Field testing planned',
      '  ✗ Seasonal variation → ✓ Year-round study initiated',
      '  ✗ Genetic factors → ✓ Diversity analysis scheduled',
      '',
      'CASE-002 Limitations → Resolution:',
      '  ✗ Digital-only focus → ✓ Offline impact framework',
      '  ✗ Cultural bias → ✓ Cross-cultural validation',
      '  ✗ Short-term data → ✓ Longitudinal study planned',
      '',
      'CASE-003 Limitations → Resolution:',
      '  ✗ Long-term effects → ✓ Extended tracking initiated',
      '  ✗ Sport specificity → ✓ Cross-sport validation',
      '  ✗ Environmental factors → ✓ Comprehensive analysis',
      '',
      'Status: LIMITATIONS BEING SYSTEMATICALLY ADDRESSED',
      ''
    ],
    cite: () => [
      'CITATION GENERATOR',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'CASE-001 Citation (MLA Format):',
      'Agent-007. "Experimental Design: The Germination of an Experimental Study Indulging Strawberries."',
      'Research Intelligence Case File CASE-001, 15 Mar. 2024.',
      'Classification: TOP SECRET. Status: ACTIVE.',
      '',
      'CASE-002 Citation (MLA Format):',
      'Agent-007. "Content Analysis: Advertising Appeals of Nike Sportswear and User Engagement."',
      'Research Intelligence Case File CASE-002, 18 Mar. 2024.',
      'Classification: TOP SECRET. Status: ACTIVE.',
      '',
      'CASE-003 Citation (MLA Format):',
      'Agent-007. "Mixed Method: Bridging the Ball Gap."',
      'Research Intelligence Case File CASE-003, 19 Mar. 2024.',
      'Classification: TOP SECRET. Status: ACTIVE.',
      '',
      'Note: All cases approved for academic citation',
      ''
    ],
    reflection: () => [
      'TEAM REFLECTION ACCESS',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Meta-Level AP Research Process Reflection:',
      '',
      '1. Research Question Development:',
      '   ✓ Clear experimental design established',
      '   ✓ Content analysis framework validated',
      '   ✓ Mixed method approach successfully integrated',
      '',
      '2. Methodology Selection & Validation:',
      '   ✓ Controlled experiments properly designed',
      '   ✓ Content analysis systematically conducted',
      '   ✓ Survey and experimental data effectively combined',
      '   ✓ Peer review process completed successfully',
      '',
      '3. Analysis & Quality Assurance:',
      '   ✓ Statistical significance achieved',
      '   ✓ Qualitative insights validated',
      '   ✓ Mixed method integration successful',
      '   ✓ Practical implications demonstrated',
      '',
      '4. Academic Growth & Professional Development:',
      '   ✓ Experimental design mastery achieved',
      '   ✓ Content analysis skills developed',
      '   ✓ Mixed method research expertise gained',
      '   ✓ Publication-ready work produced',
      '',
      'Final Assessment: EXCEPTIONAL research execution across all methodologies',
      'Recommendation: READY FOR ADVANCED ACADEMIC RESEARCH',
      ''
    ],
    clear: () => {
      setHistory(['']);
      return [];
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const output = commands[trimmedCmd as keyof typeof commands];
    
    setIsTyping(true);
    
    if (output) {
      const result = output();
      setTimeout(() => {
        setHistory(prev => [...prev, `${currentPath}$ ${cmd}`, ...result]);
        setIsTyping(false);
      }, 300);
    } else if (trimmedCmd === '') {
      setTimeout(() => {
        setHistory(prev => [...prev, `${currentPath}$ `]);
        setIsTyping(false);
      }, 100);
    } else {
      setTimeout(() => {
        setHistory(prev => [
          ...prev, 
          `${currentPath}$ ${cmd}`,
          `Command not found: ${cmd}`,
          'Type "help" for available commands.',
          ''
        ]);
        setIsTyping(false);
      }, 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div 
      className={`bg-black border border-green-800 rounded-lg font-mono text-sm transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-[9999] m-0 rounded-none border-0 max-h-screen p-8' 
          : 'p-4 h-64'
      } overflow-hidden hover:border-green-600`}
      onClick={handleTerminalClick}
      style={isFullscreen ? { backgroundColor: 'black', height: '100vh' } : undefined}
    >
      <div className="flex justify-between items-center mb-4 px-4 py-2 bg-black/50 border-b border-green-800">
        <span className="text-green-400 text-base">RESEARCH TERMINAL</span>
        <button 
          onClick={toggleFullscreen}
          className="text-green-400 hover:text-green-300 transition-colors duration-300 bg-green-900/30 px-3 py-1.5 rounded border border-green-800 hover:border-green-600"
        >
          {isFullscreen ? 'Exit (F)' : 'Fullscreen (F)'}
        </button>
      </div>
      <div 
        ref={terminalRef}
        className={`overflow-y-auto pr-4 space-y-2 scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-transparent ${
          isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-[calc(100%-3rem)]'
        }`}
      >
        {history.map((line, i) => (
          <div key={i} className="text-green-400 whitespace-pre-wrap text-base">
            {line}
          </div>
        ))}
        {isTyping && (
          <div className="text-green-400 animate-pulse text-base">
            {currentPath}$ {input}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 px-4">
        <div className="flex items-center">
          <span className="text-green-400 mr-2 text-base">{currentPath}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono cursor-text hover:text-green-300 focus:text-green-300 transition-colors duration-300 text-base"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default TerminalSimulator;