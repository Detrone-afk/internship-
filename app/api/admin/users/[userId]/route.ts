import { NextRequest, NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/backend';
import { getAuth } from '@clerk/nextjs/server';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

// GET user by userId
export async function GET(req: NextRequest, context: { params: { userId: string } }) {
  const { userId } = context.params;

  try {
    const { userId: authUserId } = getAuth(req);
    if (!authUserId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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

// PATCH to update user
export async function PATCH(req: NextRequest, context: { params: { userId: string } }) {
  const { userId } = context.params;
  const body = await req.json();

  try {
    const updatedUser = await clerk.users.updateUser(userId, {
      firstName: body.first_name,
      lastName: body.last_name,
      // email update is not allowed directly here
    });

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Failed to update user', { status: 500 });
  }
}


// DELETE user
export async function DELETE(req: NextRequest, context: { params: { userId: string } }) {
  const { userId } = context.params;

  try {
    await clerk.users.deleteUser(userId);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Failed to delete user', { status: 500 });
  }
}
