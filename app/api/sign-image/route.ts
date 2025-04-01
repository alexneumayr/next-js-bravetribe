import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

type ResponseBodyCloudinarySignImage = {
  signature: string;
};

// API Route to sign cloudinary requests
export async function POST(
  request: Request,
): Promise<NextResponse<ResponseBodyCloudinarySignImage>> {
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };

  const { paramsToSign } = body;
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string,
  );

  console.log('Signature', signature);
  return NextResponse.json({ signature });
}
