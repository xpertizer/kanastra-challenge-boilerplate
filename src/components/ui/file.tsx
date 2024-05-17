import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";


enum FileActionType {
  SET_FILE = 'SET_FILE',
  SET_FILE_LIST = 'SET_FILE_LIST',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};


type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: File[]; // & {} You can add more information about the challenge inside this type
};

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export const FileContextInitialValues: Partial<FileContextState> = {
  file: {} as File,
  fileList: [],
  isLoading: false,
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.SET_FILE: {
      return {
        ...state,
        file: action.payload?.file as File,
      };
    }
    case FileActionType.SET_FILE_LIST: {
      const fileList = action.payload?.fileList || [];
      if (state.file && !fileList.includes(state.file)) {
        fileList.push(state.file);
      }
    
      return {
        ...state,
        fileList,
        isLoading: false,
      };
    }
    
    case FileActionType.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload?.isLoading as boolean,
      };
    }
    default: {
      throw new Error(`Action not regonized: ${action.type}`);
    }
  }
};
const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    { ...loadState(), ...FileContextInitialValues } as FileContextState,
  );
  useEffect(() => {
    saveState(state); 
  }, [state]);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
}

const serializableFileList = (state: FileContextState) => state.fileList.map(file => ({
  name: file.name,
  size: file.size,
  type: file.type,
}));

const loadState = () => {
  try {
    const serializedFileList = localStorage.getItem('fileList');
    if (serializedFileList === null) {
      return undefined;
    }
    return { fileList: JSON.parse(serializedFileList).map((file: File) => new File([file], file.name, { type: file.type })) };
  } catch (err) {
      console.log('erro ao carregar filelist' )
      console.log(err)
    return undefined;
  }
};

const saveState = (state: FileContextState) => {
  try {
    const fileList = serializableFileList(state);
    const serializedFileList = JSON.stringify(fileList);
    localStorage.setItem('fileList', serializedFileList);
  } catch (err) {
      console.log('erro ao salvar filelist' )
      console.log(err)
  }
};

export {
  FileProvider,
  useFileContext,
  FileReducer,
  FileContext,
  FileActionType,
};