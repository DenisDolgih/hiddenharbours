import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import lzString from 'lz-string'
import QuillWrapper from './QuillWrapper';

import Nav from './Nav';

import 'react-quill/dist/quill.snow.css';
import './App.scss'

function App(): JSX.Element {

  // get param from url
  const code = useParams().code || '';

  // define state
  const [contentEditable, setContentEditable] = useState(code ? false : true);
  const [siteContent, setSiteContent] = useState('');

  const navigator = useNavigate()

  /**
   * Toggles the toolbar.
   *
   * @return {void} 
   */
  const toggleToolbar = (): void => {
    setContentEditable(!contentEditable);
  }



  useEffect(() => {
    // decode param
    const decoded = lzString.decompressFromEncodedURIComponent(code);
    setSiteContent(decoded);
  }, [code])

  /**
   * Handles the content change event.
   *
   * @param {string} content - The new content for the site.
   * @return {void} This function does not return any value.
   */
  const InputChangeHandler = (content: string): void => {
    // update site content
    setSiteContent(content);
    // update url
    navigator(`/${lzString.compressToEncodedURIComponent(content)}`)
  }

  return (
    <>
      <Nav currentURL={code} toggleToolbar={toggleToolbar} contentEditable={contentEditable} />

      <QuillWrapper
        className={`${!contentEditable ? 'hide-toolbar' : ''}`}
        onChange={InputChangeHandler}
        readOnly={!contentEditable}
        value={siteContent}
      />
    </>
  )
}

export default App
