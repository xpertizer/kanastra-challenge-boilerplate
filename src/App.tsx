import React from 'react';
import { FileUploader } from './components/ui/file-uploader';
import './global.css';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './components/ui/table';
import { useFileContext } from './components/ui/file';



const App: React.FC = () => {
  const { state } = useFileContext();
  return (
    
        <>
      <FileUploader file={state.file} /> 
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.fileList.map((file: File, index: number) => (
          <TableRow key={index}>
            <TableCell>{file.name}</TableCell>
            <TableCell>{file.type}</TableCell>
            <TableCell>{file.size}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table></>
     
  );
}

export default App;