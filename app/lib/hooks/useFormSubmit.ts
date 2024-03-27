import { useState, useReducer, Dispatch, useCallback } from 'react';

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error';
  data?: any;
  error?: Error;
};

type Action =
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS'; payload: any }
  | { type: 'ERROR'; payload: Error };

type SubmitFunction = (data: any) => Promise<any>;

// フォームの状態を管理するためのreducer関数
const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SUBMIT':
      return { ...state, status: 'submitting' };
    case 'SUCCESS':
      return { ...state, status: 'success', data: action.payload };
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

// カスタムフック
const useFormSubmit = (initialData: any, submitFunction: SubmitFunction) => {
  const [formData, setFormData] = useState<any>(initialData);
  const [formState, dispatch] = useReducer(formReducer, {
    status: 'idle',
  });

  // フォーム送信処理
  const submitForm = useCallback(async () => {
    dispatch({ type: 'SUBMIT' });
    try {
      const data = await submitFunction(formData);
      dispatch({ type: 'SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error instanceof Error ? error : new Error('An error occurred') });
    }
  }, [formData, submitFunction]);

  // フォームデータの更新関数
  const updateFormData = (newData: any) => {
    setFormData(newData);
  };

  return { formState, formData, updateFormData, submitForm };
};

export default useFormSubmit;
