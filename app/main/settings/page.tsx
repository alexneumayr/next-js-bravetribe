'use client';
import { CldUploadWidget } from 'next-cloudinary';

export default function SettingsPage() {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-image"
      uploadPreset="bravetribe-profile-images"
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
}
