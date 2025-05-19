import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

// GET /api/admin/users - Get all users
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

// POST /api/admin/users - Create new user
export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const userData = await request.json();
    const newUser = await clerk.users.createUser({
      firstName: userData.first_name,
      lastName: userData.last_name,
      emailAddress: [userData.email],
      // other user properties
    });
    
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}