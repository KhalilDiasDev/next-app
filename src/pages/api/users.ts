// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const {
  NEXT_PRIVATE_QIAM_CLIENT_TOKEN_URL,
  NEXT_PRIVATE_QIAM_ID,
  NEXT_PRIVATE_QIAM_SECRET,
  NEXT_PRIVATE_QIAM_REALM_URL,
  NEXT_PRIVATE_QIAM_REALM,
} = process.env;

async function getAdminToken(): Promise<string> {
  const res = await fetch(`${NEXT_PRIVATE_QIAM_CLIENT_TOKEN_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: NEXT_PRIVATE_QIAM_ID!,
      client_secret: NEXT_PRIVATE_QIAM_SECRET!,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error getting admin token: ${error}`);
  }

  const data = await res.json();
  return data.access_token;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // PUT method for user editing
  if (req.method === 'PUT') {
    const { id, username, email, enabled } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!username && !email && enabled === undefined) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    try {
      const token = await getAdminToken();

      const updateData: any = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (enabled !== undefined) updateData.enabled = enabled;

      const updateRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (updateRes.status === 204) {
        const getUserRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (getUserRes.ok) {
          const updatedUser = await getUserRes.json();
          return res.status(200).json({ 
            message: 'User updated successfully',
            user: updatedUser
          });
        } else {
          return res.status(200).json({ message: 'User updated successfully' });
        }
      } else {
        const errorText = await updateRes.text();
        console.error('Error updating user:', errorText);
        return res.status(updateRes.status).json({ 
          error: `Error updating user: ${errorText}` 
        });
      }
    } catch (err: any) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Internal error updating user' });
    }
  }

  if (req.method === 'DELETE') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      const token = await getAdminToken();

      const deleteRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (deleteRes.status === 204) {
        return res.status(200).json({ message: 'User deleted successfully' });
      } else {
        const errorText = await deleteRes.text();
        return res.status(deleteRes.status).json({ error: errorText });
      }
    } catch (err: any) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Internal error deleting user' });
    }
  }

  if (req.method === 'POST') {
    const { username, email, password, role } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'username and email are required' });
    }

    try {
      const token = await getAdminToken();

      const createUserRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
          enabled: true,
          emailVerified: false,
        }),
      });

      if (createUserRes.status !== 201) {
        const errorText = await createUserRes.text();
        return res.status(createUserRes.status).json({ error: errorText });
      }

      const getUsersRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usersFound = await getUsersRes.json();
      const user = usersFound.find((u: any) => u.username === username);
      if (!user) {
        return res.status(500).json({ error: 'User created but not found for configuration' });
      }

      const userId = user.id;

      const userPassword = password || 'Admin123!';
      await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${userId}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'password',
          value: userPassword,
          temporary: false,
        }),
      });

      const userRole = role || 'admin';
      const rolesRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allRoles = await rolesRes.json();
      const targetRole = allRoles.find((r: any) => r.name === userRole);

      if (targetRole) {
        await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${userId}/role-mappings/realm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([targetRole]),
        });
      }

      return res.status(201).json({ 
        message: `User created successfully with role ${userRole}`,
        user: { id: userId, username, email, enabled: true }
      });

    } catch (err: any) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal error creating user' });
    }
  }

  if (req.method === 'GET') {
    try {
      const token = await getAdminToken();

      const usersRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!usersRes.ok) {
        const errorText = await usersRes.text();
        return res.status(usersRes.status).json({ error: errorText });
      }

      const data = await usersRes.json();
      
      const enrichedUsers = await Promise.all(
        data.map(async (user: any) => {
          try {
            const rolesRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${user.id}/role-mappings/realm`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            if (rolesRes.ok) {
              const roles = await rolesRes.json();
              const roleNames = roles.map((role: any) => role.name);
              
              return {
                ...user,
                roles: roleNames,
                role: roleNames[0] || 'user',
                status: user.enabled ? 'active' : 'inactive',
              };
            }
            
            return {
              ...user,
              roles: [],
              role: 'user',
              status: user.enabled ? 'active' : 'inactive',
            };
          } catch (error) {
            console.error(`Error fetching roles for user ${user.id}:`, error);
            return {
              ...user,
              roles: [],
              role: 'user',
              status: user.enabled ? 'active' : 'inactive',
            };
          }
        })
      );

      return res.status(200).json({ data: enrichedUsers });
    } catch (err: any) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal error fetching users' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).json({ error: 'Method Not Allowed' });
}