
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from 'formik';

import { ACCEPTED_FILE_UPLOAD_MIME_TYPES, MAX_FILE_SIZE_IN_BYTES } from 'util/constants';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#93a5be',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

export const UploadImages = (props) => {

  const [_, __, helpers] = useField("images");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    props.setFieldValue("images", files);
  }, [files]);

  const onDrop = useCallback((accFiles) => {
    console.log('Accepted Files: ', accFiles)
    setFiles(accFiles)
  }, []);

  const onDelete = (file) => {
    setFiles((curr) =>
      curr.filter((fw) => fw !== file)
    )
  }

  // Used for cleanup. Called when the user cancels uploading images.
  // const onClose = () => {
  //   setFiles([])
  // }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_UPLOAD_MIME_TYPES,
    maxSize: MAX_FILE_SIZE_IN_BYTES
  })

  return (
    <>
      <div {...getRootProps({ style: baseStyle })}>
        <input {...getInputProps()} />

        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      {files.length > 0 ?

        <>
          <div className="p-3">
            <h4 className="text-center">Files: {files.length}</h4>
          </div>

          {files.map((file, index) =>
            <div key={index} className="d-flex justify-content-between align-items-center py-2">
              <span>{file.name}</span>
              <button type="button" onClick={() => onDelete(file)} className="btn-close btn-sm" aria-label="Close" />
            </div>
          )}
        </>

        : null}

    </>
  )
};