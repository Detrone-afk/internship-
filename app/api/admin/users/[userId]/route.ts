import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

// GET /api/admin/users/[userId] - Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId: authUserId } = getAuth(request);

  if (!authUserId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const user = await clerk.users.getUser(params.userId);
    return NextResponse.json({
      user: {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email_addresses: user.emailAddresses,
        profile_image_url: user.imageUrl,
        last_sign_in_at: user.lastSignInAt,
        created_at: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// PATCH /api/admin/users/[userId] - Update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId: authUserId } = getAuth(request);

  if (!authUserId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { first_name, last_name } = await request.json();
    const updatedUser = await clerk.users.updateUser(params.userId, {
      firstName: first_name,
      lastName: last_name
    });

    return NextResponse.json({ 
      user: updatedUser 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// DELETE /api/admin/users/[userId] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId: authUserId } = getAuth(request);

  if (!authUserId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await clerk.users.deleteUser(params.userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}