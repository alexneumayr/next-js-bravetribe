'use client';
import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function SettingsPage() {
  const [imageUrl, setImageUrl] = useState('');

  type UploadResult = {
    event: 'success';
    info: {
      secure_url: string;
    };
  };

  return (
    <>
      <CldUploadWidget
        signatureEndpoint="/api/sign-image"
        uploadPreset="bravetribe-profile-images"
        onSuccess={(results) => {
          const uploadResults = results as UploadResult;
          console.log(results);
          setImageUrl(uploadResults.info.secure_url);
        }}
        options={{
          sources: ['local'],
          cropping: true, // Zuschneiden aktivieren
          croppingAspectRatio: 1, // 1:1 für quadratischen Ausschnitt
          showSkipCropButton: false,
          multiple: false,
          maxFileSize: 1024 * 1024 * 5,
        }}
      >
        {({ open }) => {
          return <Button onClick={() => open()}>Upload an Image</Button>;
        }}
      </CldUploadWidget>
      {imageUrl && <p>{imageUrl}</p>}
    </>
  );
}
