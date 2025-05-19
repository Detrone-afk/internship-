import { NextRequest, NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/backend';
import { getAuth } from '@clerk/nextjs/server';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const { userId: authUserId } = getAuth(req);
  if (!authUserId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const user = await clerk.users.getUser(userId);

    return NextResponse.json({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email_addresses: user.emailAddresses,
      profile_image_url: user.imageUrl,
      last_sign_in_at: user.lastSignInAt,
      created_at: user.createdAt,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}