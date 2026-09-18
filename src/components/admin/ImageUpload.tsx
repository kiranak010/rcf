'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2, FileText } from 'lucide-react'

interface ImageUploadProps {
  onUpload: (url: string) => void
  existingImage?: string
  accept?: string[]
  label?: string
}

export default function ImageUpload({ onUpload, existingImage, accept = ['image/*'], label = 'image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return

    setUploading(true)
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        onUpload(data.url)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: 1,
  })

  const handleRemove = () => {
    onUpload('')
  }

  const isImage = existingImage && existingImage.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
  const isPdf = existingImage && existingImage.match(/\.pdf$/i)

  return (
    <div className="space-y-2">
      {existingImage && (
        <div className="relative inline-block">
          {isImage ? (
            <img src={existingImage} alt="Uploaded" className="h-32 w-32 object-cover rounded-md border border-gray-200" />
          ) : isPdf ? (
            <div className="h-32 w-32 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50">
              <div className="text-center">
                <FileText className="h-8 w-8 text-red-500 mx-auto" />
                <p className="text-xs text-gray-500 mt-1">PDF</p>
              </div>
            </div>
          ) : (
            <div className="h-32 w-32 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50">
              <div className="text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto" />
                <p className="text-xs text-gray-500 mt-1">File</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
            <span className="text-sm text-gray-600">Uploading...</span>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-1 text-sm text-gray-600">
              {isDragActive ? `Drop ${label} here...` : `Drag & drop ${label}, or click to select`}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
