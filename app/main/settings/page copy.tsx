'use client';
import { cloudinaryUploadAction } from '@/actions/cloudinaryActions';
import { useActionState, useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('Image name');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const initialState = {
    error: '',
  };
  const [state, formAction, pending] = useActionState(
    cloudinaryUploadAction,
    initialState,
  );

  return (
    <div>
      <img
        data-test-id="product-image"
        src={image}
        alt={name}
        className="max-w-[300px] max-h-[300px] p-5"
      />
      <div className="mt-2 w-[300px] mx-auto">
        <form className="flex justify-between gap-2">
          {state.error}

          <label
            className="flex-1 text-center p-2 inline-block items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]"
            htmlFor="image"
          >
            Choose file
          </label>
          <input
            className="hidden"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(event) => setFileName(event.target.files[0].name)}
          />
          <button className="flex-1 p-2 items-center text-[13px] font-semibold rounded-[5px] bg-[#434343] text-white cursor-pointer hover:bg-black dark:hover:bg-[#00b755d6]">
            Upload image
          </button>
        </form>
        {fileName && (
          <p className="text-[15px]">
            Chosen file:&nbsp;
            <span className="font-semibold">{fileName}</span>
          </p>
        )}
        {successMessage && (
          <p className="text-[15px] text-primary font-bold">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-[15px] text-red-500 font-bold">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
