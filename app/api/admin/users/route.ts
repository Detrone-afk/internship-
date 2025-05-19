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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
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
}