import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import lzString from 'lz-string'
import ReactQuill from 'react-quill';

import Nav from './Nav';

import 'react-quill/dist/quill.snow.css';
import './App.scss'

function App() {
  const quill = useRef(null);
  // get param from url
  const code = useParams().code || '';

  // decode param
  const decoded = lzString.decompressFromEncodedURIComponent(code);

  // define if content is editable
  const [contentEditable, setContentEditable] = useState(code ? false : true);

  // set site content
  const [siteContent, setSiteContent] = useState(decoded)
  const navigator = useNavigate()

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ],
  }

  /**
   * Toggles the toolbar.
   *
   * @return {void} 
   */
  const toggleToolbar = () => {
    setContentEditable(!contentEditable);
  }

  useEffect(() => {
    if (quill.current) quill.current.focus()
  })

  /**
   * Handles the content change event.
   *
   * @param {string} content - The new content for the site.
   * @return {void} This function does not return any value.
   */
  const InputChangeHandler = (content: string) => {
    // update site content
    setSiteContent(content);
    // update url
    navigator(`/${lzString.compressToEncodedURIComponent(content)}`)
  }

  return (
    <>
      <Nav currentURL={code} toggleToolbar={toggleToolbar} contentEditable={contentEditable} />

      <ReactQuill
        ref={quill}
        className={`${!contentEditable ? 'hide-toolbar' : ''}`}
        onChange={InputChangeHandler}
        readOnly={!contentEditable}
        value={siteContent}
        modules={modules}
      />
    </>
  )
}

export default App
