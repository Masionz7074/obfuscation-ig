import React, { useState } from 'react'
import FileDropzone from './components/FileDropzone'
import { deobfuscateFile } from './utils/deobfuscator'

const App: React.FC = () => {
  const [deobfuscatedContent, setDeobfuscatedContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileDeobfuscation = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      try {
        const deobfuscated = deobfuscateFile(content)
        setDeobfuscatedContent(deobfuscated)
        setFileName(file.name)
      } catch (error) {
        console.error('Deobfuscation error:', error)
        alert('Failed to deobfuscate the file. It might not be obfuscated.')
      }
    }
    reader.readAsText(file)
  }

  const handleDownload = () => {
    if (deobfuscatedContent && fileName) {
      const blob = new Blob([deobfuscatedContent], { type: 'text/plain' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `deobfuscated-${fileName}`
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Minecraft File Deobfuscator
        </h1>
        <FileDropzone onFileUpload={handleFileDeobfuscation} />

        {deobfuscatedContent && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Deobfuscated Content
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-auto">
              <pre className="text-sm">{deobfuscatedContent}</pre>
            </div>
            <button 
              onClick={handleDownload}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Download Deobfuscated File
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
