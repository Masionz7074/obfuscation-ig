import React, { useState, DragEvent } from 'react';
import { isObfuscated, deobfuscateCode } from './utils/deobfuscator';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [deobfuscatedContent, setDeobfuscatedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer?.files[0];

    if (uploadedFile && 
        (uploadedFile.name.endsWith('.js') || 
         uploadedFile.name.endsWith('.json') || 
         uploadedFile.name.endsWith('.ts') || 
         uploadedFile.name.endsWith('.mcaddon') || 
         uploadedFile.name.endsWith('.mcpack'))) {
      setFile(uploadedFile);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const content = await file.text();

      if (isObfuscated(content)) {
        const deobfuscated = await deobfuscateCode(content);
        setDeobfuscatedContent(deobfuscated);
      } else {
        setDeobfuscatedContent('File is not obfuscated');
      }
    } catch (error) {
      console.error('File processing error:', error);
      setDeobfuscatedContent('Error processing file');
    }
    setIsLoading(false);
  };

  const downloadDeobfuscated = () => {
    const blob = new Blob([deobfuscatedContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `deobfuscated_${file?.name || 'file'}`;
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-space-blue-300">
          Minecraft File Deobfuscator
        </h1>

        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileUpload}
          className="border-2 border-dashed border-space-blue-600 rounded-xl p-12 text-center hover:border-space-blue-400 transition-colors"
        >
          {!file ? (
            <p className="text-space-blue-200">
              Drag and drop your .js, .json, .ts, .mcaddon, or .mcpack file here
            </p>
          ) : (
            <div>
              <p className="text-space-blue-300 mb-4">Selected File: {file.name}</p>
              <button 
                onClick={processFile}
                disabled={isLoading}
                className="bg-space-blue-600 hover:bg-space-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                {isLoading ? 'Processing...' : 'Deobfuscate'}
              </button>
            </div>
          )}
        </div>

        {deobfuscatedContent && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-space-blue-300">
              Deobfuscated Content
            </h2>
            <div className="bg-black/30 rounded-lg p-4 max-h-64 overflow-auto">
              <pre className="text-sm text-white/80">{deobfuscatedContent}</pre>
            </div>
            <button 
              onClick={downloadDeobfuscated}
              className="mt-4 bg-space-blue-700 hover:bg-space-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Download Deobfuscated File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
