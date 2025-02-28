"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/de4dpzh9c/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setUploadedFiles(prev => [...prev, data.public_id]);
      
      return data.public_id;
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      await uploadImage(files[i]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Bienvenido, {session?.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Subir Imágenes</h2>
            
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              
              {uploading && (
                <div className="text-sm text-gray-500">
                  Subiendo imágenes...
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Imágenes subidas:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {uploadedFiles.map((fileId, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">✓</span>
                        {fileId}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
