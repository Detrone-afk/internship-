import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

// GET /api/admin/users - Fetch all users
export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const users = await clerk.users.getUserList();
    const formattedUsers = users.data.map((user) => ({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email_addresses: user.emailAddresses,
      profile_image_url: user.imageUrl,
      last_sign_in_at: user.lastSignInAt,
      created_at: user.createdAt,
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST /api/admin/users - Create new user
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();

    const newUser = await clerk.users.createUser({
      firstName: body.first_name,
      lastName: body.last_name,
      emailAddress: [body.email], // Must be an array
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
