import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import lzString from 'lz-string'
import QuillWrapper from './QuillWrapper';
import GitHub from './GitHub';

import Nav from './Nav';

import 'react-quill/dist/quill.snow.css';
import './App.scss'

/**
 * Renders the main App component.
 *
 * @return {JSX.Element} The rendered App component.
 */
function App(): JSX.Element {
  // Get param from url
  const code = useParams().code || '';

  // Define state
  const [contentEditable, setContentEditable] = useState(code ? false : true);
  const [siteContent, setSiteContent] = useState('');

  const navigator = useNavigate();

  /**
   * Toggles the toolbar.
   */
  const toggleToolbar = (): void => {
    setContentEditable(!contentEditable);
  };

  useEffect(() => {
    /**
     * Decode the param and set the site content.
     */
    const decoded = lzString.decompressFromEncodedURIComponent(code);
    setSiteContent(decoded);
  }, [code]);

  /**
   * Handles the content change event.
   *
   * @param {string} content - The new content for the site.
   */
  const InputChangeHandler = (content: string): void => {
    // Update site content
    setSiteContent(content);
    // Update url
    navigator(`/${lzString.compressToEncodedURIComponent(content)}`);
  };

  return (
    <>
      <Nav currentURL={code} toggleToolbar={toggleToolbar} contentEditable={contentEditable} />

      <QuillWrapper
        classNames={`${!contentEditable ? 'hide-toolbar' : ''}`}
        onChange={InputChangeHandler}
        readOnly={!contentEditable}
        value={siteContent}
      />

      <GitHub />
    </>
  );
}

export default App
