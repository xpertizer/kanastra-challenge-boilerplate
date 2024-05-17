import { useState } from "react";
import { FileActionType , useFileContext } from "./file";
import axios from 'axios';

type FileUploaderProps = {
  file: File | null;
}
const FileUploader = ({ file }: FileUploaderProps) => {
  const { state, dispatch } = useFileContext();
  const [inputKey, setInputKey] = useState(Date.now()); 


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch({ type: FileActionType.SET_FILE, payload: { file } });
    }
  };

  const handleUploadClick = () => {
    if (state.file) {
      dispatch({ type: FileActionType.SET_IS_LOADING, payload: { isLoading: true } });
      if ( UploadFile(state.file)){
        dispatch({ type: FileActionType.SET_FILE_LIST, payload: { fileList: [...state.fileList, state.file], isLoading: false } });
        dispatch({ type: FileActionType.SET_FILE, payload: { file: {} as File }})
        setInputKey(Date.now());
      }
      dispatch({ type: FileActionType.SET_IS_LOADING, payload: { isLoading: false } });
       
    }
  };

  return (
    <div className = "flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input key={inputKey} id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" 
        onChange={handleFileChange}/>
      </div>
      {file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button 
                  className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold"
                  onClick={handleUploadClick}
                  >Upload the file</button>}{state.isLoading && <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>}
    </div>

  );
};

function UploadFile(file: File) {

  const formData = new FormData();

  formData.append('file', file, file.name);

  try {
    axios.post('http://localhost:8000/upload-csv/', formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': 'ErobaCRuC6AZsbKW3q3kaRDuIenAFUvG8qCRNv9ybujIjTI1qv7fzp8qqviO5HqK', // Adicione o cabeçalho X-CSRFToken
      },
    }).then(
      response => {
        
        console.log(response.data);
      }
    
    );

    console.log('File uploaded successfully',);
    return true;
  } catch (error) {
    console.error('Error uploading file', error);
    return false;
  }
}

export { 
      FileUploader,
      UploadFile,
 };
