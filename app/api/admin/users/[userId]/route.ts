import { type NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/backend';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

type RouteParams = {
  params: {
    userId: string;
  };
};

export async function GET(request: NextRequest, context: RouteParams) {
  return handleUserRequest('GET', request, context);
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  return handleUserRequest('PATCH', request, context);
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  return handleUserRequest('DELETE', request, context);
}

async function handleUserRequest(
  method: 'GET' | 'PATCH' | 'DELETE',
  request: NextRequest,
  { params }: RouteParams
) {
  const { userId: authUserId } = getAuth(request);

  if (!authUserId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    switch (method) {
      case 'GET':
        const user = await clerk.users.getUser(params.userId);
        return NextResponse.json({
          user: formatUserResponse(user)
        });

      case 'PATCH':
        const { first_name, last_name } = await request.json();
        const updatedUser = await clerk.users.updateUser(params.userId, {
          firstName: first_name,
          lastName: last_name
        });
        return NextResponse.json({ user: formatUserResponse(updatedUser) });

      case 'DELETE':
        await clerk.users.deleteUser(params.userId);
        return NextResponse.json({ success: true });

      default:
        return new NextResponse('Method Not Allowed', { status: 405 });
    }
  } catch (error) {
    console.error(`Error in ${method} user request:`, error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

function formatUserResponse(user: any) {
  return {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email_addresses: user.emailAddresses,
    profile_image_url: user.imageUrl,
    last_sign_in_at: user.lastSignInAt,
    created_at: user.createdAt
  };
}