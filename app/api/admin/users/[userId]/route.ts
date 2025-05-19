import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

// Type for the params
type RouteParams = {
  params: {
    userId: string;
  };
};

// PATCH handler
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  const { userId } = params;
  const { userId: authUserId } = getAuth(request);

  if (!authUserId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { first_name, last_name } = await request.json();
    const updatedUser = await clerk.users.updateUser(userId, {
      firstName: first_name,
      lastName: last_name
    });

    return NextResponse.json({ 
      user: {
        id: updatedUser.id,
        first_name: updatedUser.firstName,
        last_name: updatedUser.lastName,
        email_addresses: updatedUser.emailAddresses,
        profile_image_url: updatedUser.imageUrl,
        last_sign_in_at: updatedUser.lastSignInAt,
        created_at: updatedUser.createdAt
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// DELETE handler - alternative syntax
export const DELETE = async (
  request: NextRequest,
  { params }: RouteParams
) => {
  const { userId } = params;
  const { userId: authUserId } = getAuth(request);

  if (!authUserId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await clerk.users.deleteUser(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};