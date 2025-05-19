import { NextRequest, NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const body = await req.json();

  try {
    const updatedUser = await clerk.users.updateUser(userId, {
      firstName: body.first_name,
      lastName: body.last_name,
    });

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Failed to update user', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    await clerk.users.deleteUser(userId);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new NextResponse('Failed to delete user', { status: 500 });
  }
}