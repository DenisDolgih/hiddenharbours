import { useRef, useEffect } from 'react'
import ReactQuill from 'react-quill';

interface IProps {
    className: string
    onChange: (content: string) => void
    readOnly: boolean
    value: string
}

/**
 * Renders a wrapper component for the Quill editor.
 *
 * @param {string} className - The class name for the wrapper component.
 * @param {function} onChange - The callback function for handling editor changes.
 * @param {boolean} readOnly - Determines if the editor is read-only.
 * @param {string} value - The initial value of the editor.
 * @param {object} modules - The modules configuration for the editor.
 * @return {JSX.Element} The React component for the Quill wrapper.
 */
export default function QuillWrapper({ className, onChange, readOnly, value }: IProps): JSX.Element {
    {

        // reference to Quill
        const quill = useRef<ReactQuill>(null);
        useEffect(() => {
            if (quill.current && !readOnly) quill.current.focus()
        },[])


        const modules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['link'],

                ['clean']
            ],
        }

        return (
            <ReactQuill
                ref={quill}
                className={className}
                onChange={onChange}
                readOnly={readOnly}
                value={value}
                modules={modules}
            />
        )

    }
}