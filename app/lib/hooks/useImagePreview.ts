'use client'
import { useState } from 'react';

const useImagePreview = (url: string|null = null) => {
  const [preview, setPreview] = useState<string | null>(url);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    preview,
    handleImageChange,
  };
};

export default useImagePreview;
