import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const users = await clerk.users.getUserList();
    return NextResponse.json({ 
      users: users.data.map(user => ({
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email_addresses: user.emailAddresses,
        profile_image_url: user.imageUrl,
        last_sign_in_at: user.lastSignInAt,
        created_at: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
