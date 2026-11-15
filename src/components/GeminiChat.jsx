import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import * as geminiService from '../services/geminiService';

const GeminiChat = ({ auditData, apiKey }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'What foods should I avoid?',
    'Can I take these medicines together?',
    'What are the side effects?'
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text) => {
    const questionText = text || inputValue.trim();
    if (!questionText) return;
    
    if (!apiKey) {
      setMessages((prev) => [
        ...prev, 
        { role: 'user', content: questionText }, 
        { role: 'gemini', content: '> SYSTEM ERROR: GEMINI API KEY REQUIRED.' }
      ]);
      setInputValue('');
      return;
    }

    const newMessage = { role: 'user', content: questionText };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!geminiService.askFollowUp) {
        throw new Error("askFollowUp service is not available");
      }
      const historyToPass = [...messages, newMessage];
      const response = await geminiService.askFollowUp({ messageHistory: historyToPass, context: auditData, apiKey });
      
      const answer = response.answer || response.text || (typeof response === 'string' ? response : '> NO ANSWER PROVIDED.');
      setMessages((prev) => [...prev, { role: 'gemini', content: answer }]);
      
      if (response.suggestions && Array.isArray(response.suggestions) && response.suggestions.length > 0) {
        setSuggestions(response.suggestions.slice(0, 3));
      }
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      setMessages((prev) => [...prev, { role: 'gemini', content: '> FATAL ERROR: UNABLE TO PROCESS REQUEST.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      <div 
        className="flex items-center justify-between p-6 bg-white cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Gemini Live Inquiry</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          {isExpanded ? 'Collapse' : 'Expand'}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col h-[450px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 text-sm font-medium mt-10 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm max-w-sm mx-auto">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <p>Hello! I can answer questions about your prescription or lab report.</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-md' 
                      : 'bg-white text-slate-800 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-600 border border-slate-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3 text-sm font-medium">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  <span>Processing Query...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-white border-t border-slate-100">
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-700 text-xs font-medium rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-inner"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex-shrink-0 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
