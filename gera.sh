#!/bin/bash

# Criar diretório para o frontend
mkdir src

# Criar diretório para os componentes
mkdir src/components

# Criar diretório para os contextos
mkdir src/context

# Criar diretório para os reducers
mkdir src/reducers

# Criar diretório para os providers
mkdir src/providers

# Criar arquivo para o contexto
touch src/context/FileContext.ts

# Criar arquivo para o reducer
touch src/reducers/FileReducer.ts

# Criar arquivo para o provider
touch src/providers/FileProvider.tsx

# Criar arquivo para o formulário de upload
touch src/components/UploadForm.tsx

# Criar arquivo para a lista de arquivos
touch src/components/FileList.tsx

# Criar arquivo para o App
echo "import React from 'react';" > src/App.tsx
echo "import { FileProvider } from './providers/FileProvider';" >> src/App.tsx
echo "const App = () => {" >> src/App.tsx
echo "  return (" >> src/App.tsx
echo "    <FileProvider>" >> src/App.tsx
echo "      {/* Código do componente aqui */}" >> src/App.tsx
echo "    </FileProvider>" >> src/App.tsx
echo "  );" >> src/App.tsx
echo "}" >> src/App.tsx
echo "export default App;" >> src/App.tsx

# Criar arquivo para o index
touch src/index.tsx

# Criar diretório para a API (opcional)
mkdir api

# Adicionar conteúdo básico aos arquivos
echo "import { createContext, useReducer } from 'react';" > src/context/FileContext.ts
echo "import { reducer } from '../reducers/FileReducer';" >> src/context/FileContext.ts
echo "export const FileContext = createContext({});" >> src/context/FileContext.ts

echo "const FileReducer = (state, action) => {" >> src/reducers/FileReducer.ts
echo "  switch (action.type) {" >> src/reducers/FileReducer.ts
echo "    case 'ADD_FILE':" >> src/reducers/FileReducer.ts
echo "      return {...state, fileList: [...state.fileList,...action.payload] };" >> src/reducers/FileReducer.ts
echo "    default:" >> src/reducers/FileReducer.ts
echo "      throw new Error(`Unhandled action type: ${action.type}`);" >> src/reducers/FileReducer.ts
echo "  }" >> src/reducers/FileReducer.ts
echo "}" >> src/reducers/FileReducer.ts

echo "import { FileContext } from '../context/FileContext';" > src/providers/FileProvider.tsx
echo "import { FileReducer } from '../reducers/FileReducer';" >> src/providers/FileProvider.tsx
echo "const FileProvider = ({ children }) => {" >> src/providers/FileProvider.tsx
echo "  const [state, dispatch] = useReducer(FileReducer, {" >> src/providers/FileProvider.tsx
echo "    fileList: []," >> src/providers/FileProvider.tsx
echo "    isLoading: false," >> src/providers/FileProvider.tsx
echo "  });" >> src/providers/FileProvider.tsx
echo "  return (" >> src/providers/FileProvider.tsx
echo "    <FileContext.Provider value={{ state, dispatch }}>" >> src/providers/FileProvider.tsx
echo "      {children}" >> src/providers/FileProvider.tsx
echo "    </FileContext.Provider>" >> src/providers/FileProvider.tsx
echo "  );" >> src/providers/FileProvider.tsx
echo "}" >> src/providers/FileProvider.tsx

echo "import React, { useState } from 'react';" > src/components/UploadForm.tsx
echo "import { FileContext } from '../context/FileContext';" >> src/components/UploadForm.tsx
echo "const UploadForm = () => {" >> src/components/UploadForm.tsx
echo "  const [file, setFile] = useState(null);" >> src/components/UploadForm.tsx
echo "  const [error, setError] = useState(null);" >> src/components/UploadForm.tsx
echo "  const handleFileChange = (event) => {" >> src/components/UploadForm.tsx
echo "    setFile(event.target.files[0]);" >> src/components/UploadForm.tsx
echo "  };" >> src/components/UploadForm.tsx
echo "  const handleSubmit = (event) => {" >> src/components/UploadForm.tsx
echo "    event.preventDefault();" >> src/components/UploadForm.tsx
echo "    // Upload file to API" >> src/components/UploadForm.tsx
echo "  };" >> src/components/UploadForm.tsx
echo "  return (" >> src/components/UploadForm.tsx
echo "    <form onSubmit={handleSubmit}>" >> src/components/UploadForm.tsx
echo "      <input type='file' onChange={handleFileChange} />" >> src/components/UploadForm.tsx
echo "      <button type='submit'>Upload</button>" >> src/components/UploadForm.tsx
echo "    </form>" >> src/components/UploadForm.tsx
echo "  );" >> src/components/UploadForm.tsx
echo "}" >> src/components/UploadForm.tsx

echo "import React from 'react';" > src/components/FileList.tsx
echo "const FileList = () => {" >> src/components/FileList.tsx
echo "  const { state } = React.useContext(FileContext);" >> src/components/FileList.tsx
echo "  return (" >> src/components/FileList.tsx
echo "    <ul>" >> src/components/FileList.tsx
echo "      {state.fileList.map((file, index) => {" >> src/components/FileList.tsx
echo "        return <li key={index}>{file.name}</li>" >> src/components/FileList.tsx
echo "      })}" >> src/components/FileList.tsx
echo "    </ul>" >> src/components/FileList.tsx
echo "  );" >> src/components/FileList.tsx
echo "}" >> src/components/FileList.tsx