import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (_text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

export default useCopyToClipboard;

/**
 ** How to use:
 *
 * const [value, copy] = useCopyToClipboard()
 *
 * return (
    <>
      <h1>Click to copy:</h1>
      <div>
        <button onClick={() => copy('A')}>A</button>
        <button onClick={() => copy('B')}>B</button>
        <button onClick={() => copy('C')}>C</button>
      </div>
      <p>{Copied value: {value ?? 'Nothing is copied yet!'}}</p>
    </>
  )
 *
 */
