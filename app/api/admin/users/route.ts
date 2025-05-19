import { NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/backend';
import { getAuth } from '@clerk/nextjs/server';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function GET(request: Request) {
  // Verify admin authentication
  const { userId } = getAuth(request as any);
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Get all users from Clerk
    const users = await clerk.users.getUserList();
    
    // Return simplified user data
    return NextResponse.json({
      users: users.data.map(user => ({
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.emailAddresses[0]?.emailAddress,
      profile_image_url: user.imageUrl, // This contains the profile photo URL

        last_active: user.lastSignInAt,
        created_at: user.createdAt
      }))
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}