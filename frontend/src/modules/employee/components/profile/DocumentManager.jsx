import React, { useState, useRef } from 'react';
import { FileText, Eye, Download, Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const DocumentManager = ({ documents, onDocumentReplace }) => {
  const [previewDoc, setPreviewDoc] = useState(null);
  const fileInputRef = useRef(null);
  const [activeDocId, setActiveDocId] = useState(null);

  const handleReplaceClick = (docId) => {
    setActiveDocId(docId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onDocumentReplace && activeDocId) {
      onDocumentReplace(activeDocId, file.name);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            Verified
          </span>
        );
      case 'Pending Verification':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 animate-pulse">
            <Clock className="w-3 h-3 text-amber-500" />
            Pending Verification
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
            <AlertCircle className="w-3 h-3 text-rose-500" />
            Not Uploaded
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
        <FileText className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">Documents Vault</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border border-slate-200 hover:border-indigo-300 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>{getStatusBadge(doc.status)}</div>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm truncate">{doc.name}</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Uploaded: {doc.uploadDate || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-100">
              {doc.status !== 'Not Uploaded' && (
                <>
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 hover:bg-slate-100 text-slate-600 font-bold text-[10px] rounded-lg transition border border-transparent hover:border-slate-200 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </button>
                  <button
                    onClick={() => alert(`Downloading document: ${doc.name}`)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 hover:bg-slate-100 text-slate-650 font-bold text-[10px] rounded-lg transition border border-transparent hover:border-slate-200 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </>
              )}
              <button
                onClick={() => handleReplaceClick(doc.id)}
                className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 hover:bg-slate-100 text-indigo-600 font-bold text-[10px] rounded-lg transition border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                {doc.status === 'Not Uploaded' ? 'Upload' : 'Replace'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview Modal overlay */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 animate-fade-in no-print">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-sm tracking-tight">{previewDoc.name}</h3>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-white transition font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8 text-center space-y-4">
              <FileText className="w-16 h-16 text-indigo-500 mx-auto animate-bounce" />
              <div>
                <p className="font-bold text-slate-800 text-sm">Enterprise Document Vault Preview</p>
                <p className="text-xs text-slate-500 mt-1">
                  This secure document is encrypted using AES-256 standard protocols.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-450 font-bold">Document Key:</span>
                  <span className="font-mono text-slate-800">{previewDoc.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450 font-bold">Upload Cycle:</span>
                  <span className="text-slate-800 font-semibold">{previewDoc.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450 font-bold">Audit Status:</span>
                  <span className="text-emerald-700 font-extrabold">{previewDoc.status}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 font-bold text-xs rounded-xl text-slate-700 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => { alert(`Downloading file: ${previewDoc.name}`); setPreviewDoc(null); }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
