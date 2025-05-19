import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

// GET User
export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { userId: authUserId } = getAuth(request);
    if (!authUserId) return new NextResponse('Unauthorized', { status: 401 });

    const user = await clerk.users.getUser(params.userId);
    return NextResponse.json({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email_addresses: user.emailAddresses,
      profile_image_url: user.imageUrl,
      last_sign_in_at: user.lastSignInAt,
      created_at: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// PATCH User
export async function PATCH(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { userId: authUserId } = getAuth(request);
    if (!authUserId) return new NextResponse('Unauthorized', { status: 401 });

    const { first_name, last_name } = await request.json();
    const updatedUser = await clerk.users.updateUser(params.userId, {
      firstName: first_name,
      lastName: last_name
    });

    return NextResponse.json({
      id: updatedUser.id,
      first_name: updatedUser.firstName,
      last_name: updatedUser.lastName
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// DELETE User
export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { userId: authUserId } = getAuth(request);
    if (!authUserId) return new NextResponse('Unauthorized', { status: 401 });

    await clerk.users.deleteUser(params.userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
