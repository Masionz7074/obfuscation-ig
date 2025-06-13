import { js_beautify } from 'js-beautify'

export function deobfuscateFile(content: string): string {
  try {
    // Attempt to beautify JavaScript/TypeScript files
    if (content.includes('var _') || content.includes('function(_')) {
      return js_beautify(content, { 
        indent_size: 2,
        preserve_newlines: true
      })
    }

    // For JSON files, attempt to parse and re-stringify
    try {
      const parsed = JSON.parse(content)
      return JSON.stringify(parsed, null, 2)
    } catch {
      // If not JSON, return original content
      return content
    }
  } catch (error) {
    console.error('Deobfuscation error:', error)
    return content  // Return original content if deobfuscation fails
  }
}

  }
}

export function processFile(file: File): Promise<{ filename: string, deobfuscatedContent: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
        
    reader.onload = (e) => {
      const content = e.target?.result as string;
          
      if (detectObfuscation(content)) {
        const deobfuscatedContent = deobfuscateCode(content);
        resolve({ 
          filename: file.name.replace(/\.(js|json|ts)$/, '-deobfuscated.$1'), 
          deobfuscatedContent 
        });
      } else {
        reject(new Error('No obfuscation detected'));
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}