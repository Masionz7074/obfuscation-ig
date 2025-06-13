import { minify } from 'terser';
import { js_beautify } from 'js-beautify';

export const isObfuscated = (code: string): boolean => {
  // Check for common obfuscation indicators
  const obfuscationIndicators = [
    /_0x[a-f0-9]{4,}/i,  // Hex-based variable names
    /\[\'\\x\d+\'\]/,    // Encoded string access
    /eval\(/.test(code), // Presence of eval
    code.replace(/\s/g, '').length / code.length < 0.3 // Very low character density
  ];

  return obfuscationIndicators.some(indicator => indicator);
};

export const deobfuscateCode = async (code: string): Promise<string> => {
  try {
    // First, attempt to beautify the code
    const beautifiedCode = js_beautify(code, {
      indent_size: 2,
      preserve_newlines: true
    });

    // If beautification doesn't help, try advanced deobfuscation
    const result = await minify(beautifiedCode, {
      mangle: false,
      compress: {
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        keep_fargs: false,
        hoist_vars: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        side_effects: true,
        warnings: false
      }
    });

    return result.code || beautifiedCode;
  } catch (error) {
    console.error('Deobfuscation failed:', error);
    return code;
  }
};
