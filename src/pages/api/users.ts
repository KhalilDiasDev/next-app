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
    throw new Error(`Erro ao obter token admin: ${error}`);
  }

  const data = await res.json();
  return data.access_token;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { userId } = req.body;
      
        if (!userId) {
          return res.status(400).json({ error: 'userId é obrigatório' });
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
            return res.status(200).json({ message: 'Usuário deletado com sucesso' });
          } else {
            const errorText = await deleteRes.text();
            return res.status(deleteRes.status).json({ error: errorText });
          }
        } catch (err: any) {
          console.error('Erro ao deletar usuário:', err);
          return res.status(500).json({ error: 'Erro interno ao deletar usuário' });
        }
      }
      if (req.method === 'POST') {
        const { username, email } = req.body;
      
        if (!username || !email) {
          return res.status(400).json({ error: 'username e email são obrigatórios' });
        }
      
        try {
          const token = await getAdminToken();
      
          // 1. Cria o usuário
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
            }),
          });
      
          if (createUserRes.status !== 201) {
            const errorText = await createUserRes.text();
            return res.status(createUserRes.status).json({ error: errorText });
          }
      
          // 2. Recupera o ID do usuário recém-criado
          const getUsersRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users?username=${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          const usersFound = await getUsersRes.json();
          const user = usersFound.find((u: any) => u.username === username);
          if (!user) {
            return res.status(500).json({ error: 'Usuário criado, mas não encontrado para configuração' });
          }
      
          const userId = user.id;
      
          // 3. Define a senha
          await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${userId}/reset-password`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: 'password',
              value: 'Admin123!',
              temporary: false, // ou true se quiser forçar troca
            }),
          });
      
          // 4. Atribui a role 'admin'
          const rolesRes = await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/roles`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const allRoles = await rolesRes.json();
          const adminRole = allRoles.find((r: any) => r.name === 'admin');
      
          if (adminRole) {
            await fetch(`${NEXT_PRIVATE_QIAM_REALM_URL}/users/${userId}/role-mappings/realm`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify([adminRole]),
            });
          }
      
          return res.status(201).json({ message: 'Usuário criado com senha e role admin' });
      
        } catch (err: any) {
          console.error('Erro ao criar usuário com senha e role:', err);
          return res.status(500).json({ error: 'Erro interno ao criar usuário' });
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
      return res.status(200).json({ data });
    } catch (err: any) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ error: 'Erro interno ao buscar usuários' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method Not Allowed' });
}
