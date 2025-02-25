import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageIcon, UploadIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
}

export const ImageUploader = ({ onImagesSelected }: ImageUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onImagesSelected(acceptedFiles);
  }, [onImagesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.heic']
    },
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`glass p-8 rounded-lg text-center cursor-pointer transition-all duration-200 
        ${isDragActive ? 'border-primary border-2' : 'border border-dashed border-gray-300'}
        hover:border-primary hover:border-solid`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        {isDragActive ? (
          <ImageIcon className="w-12 h-12 text-primary animate-bounce" />
        ) : (
          <UploadIcon className="w-12 h-12 text-gray-400" />
        )}
        <div>
          <p className="text-lg font-medium">
            {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
          </p>
          <p className="text-sm text-gray-500 mt-1">or click to select files</p>
        </div>
      </div>
    </div>
  );
};