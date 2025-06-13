import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileDropzoneProps {
  onFileUpload: (file: File) => void
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && (
      file.name.endsWith('.json') || 
      file.name.endsWith('.js') || 
      file.name.endsWith('.ts') ||
      file.name.endsWith('.mcaddon') ||
      file.name.endsWith('.mcpack')
    )) {
      onFileUpload(file)
    } else {
      alert('Please upload a valid file type (.json, .js, .ts, .mcaddon, .mcpack)')
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'application/javascript': ['.js', '.ts'],
      'application/x-mcaddon': ['.mcaddon'],
      'application/x-mcpack': ['.mcpack']
    },
    maxFiles: 1
  })

  return (
    <div 
      {...getRootProps()} 
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer 
        transition duration-300 
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-500'
        }
      `}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive 
          ? 'Drop the file here' 
          : 'Drag and drop a file here, or click to select a file'
        }
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supports .json, .js, .ts, .mcaddon, .mcpack
      </p>
    </div>
  )
}

export default FileDropzone

      <input 
        type="file" 
        multiple 
        accept=".js,.json,.ts,.mcaddon,.mcpack,.zip" 
        onChange={handleFileInput} 
        className="hidden" 
        id="file-upload" 
      />
      <label 
        htmlFor="file-upload" 
        className="
          cursor-pointer block text-center 
          text-gray-600 hover:text-minecraft-green
        "
      >
        <div className="text-2xl font-bold mb-4">
          Drag & Drop or Click to Upload
        </div>
        <div className="text-sm text-gray-500">
          Supports .js, .json, .ts, .mcaddon, .mcpack, .zip files
        </div>
      </label>

      {processedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Processed Files</h3>
          {processedFiles.map((file, index) => (
            <div 
              key={index} 
              className="
                bg-green-100 p-3 rounded-lg mb-2 
                flex justify-between items-center
              "
            >
              <span>{file.filename}</span>
              <button 
                onClick={() => downloadFile(file.filename, file.deobfuscatedContent)}
                className="
                  bg-minecraft-green text-white px-3 py-1 
                  rounded hover:bg-green-600 transition
                "
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;