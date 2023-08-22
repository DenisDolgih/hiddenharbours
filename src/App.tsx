import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import lzString from 'lz-string'
import ReactQuill from 'react-quill';

import Nav from './Nav';

import 'react-quill/dist/quill.snow.css';
import './App.scss'

import editImg from './assets/edit.svg'

function App() {
  // get param from url
  const code = useParams().code || '';

  // decode param
  const decoded = lzString.decompressFromEncodedURIComponent(code);
  
  // define if content is editable
  const [contentEditable, setContentEditable] = useState(code ? false : true);

  // set site content
  const [ siteContent, setSiteContent ] = useState(decoded)
  const navigator = useNavigate()

  /**
   * Toggles the toolbar.
   *
   * @return {void} 
   */
  const toggleToolbar = () => {
    setContentEditable(!contentEditable);
  }

/**
 * Handles the content change event.
 *
 * @param {string} content - The new content for the site.
 * @return {void} This function does not return any value.
 */
  const InputChangeHandler = (content: string ) => {
    // update site content
    setSiteContent(content);
    // update url
    navigator(`/${lzString.compressToEncodedURIComponent(content)}`)
  }

  return (
    <>
      <Nav currentURL={code} toggleToolbar={toggleToolbar}/>

      <ReactQuill 
        className ={ `${!contentEditable ? 'hide-toolbar' : ''}` }
        onChange = { InputChangeHandler } 
        readOnly = { !contentEditable }
        value = { siteContent }
      />
    </>
  )
}

export default App
