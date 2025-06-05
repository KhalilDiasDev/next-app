export function checkPermissions(
  level: keyof PermissionsProps,
  itemPermissions: {
    permissions?: PermissionsProps;
    user_id?: string;
    isOwner?: boolean;
  },
  user: {
    isAdmin: boolean;
    id: string;
  }
) {
  if (!user) {
    throw new Error("Invalid Session");
  }

  const permissionLevels = {
    viewer: Object.values(itemPermissions.permissions || {}).flat(1) || [],
    editor: [
      ...(itemPermissions.permissions?.editor || []),
      ...(itemPermissions.permissions?.maintainer || []),
    ],
    maintainer: itemPermissions.permissions?.maintainer || [],
  };

  if (user.isAdmin) {
    return true;
  }

  if (itemPermissions.user_id === user.id || itemPermissions.isOwner) {
    return true;
  }

  if (permissionLevels[level]?.includes(user.id)) {
    return true;
  }

  throw new Error(
    `The user does not have the required permissions. Required permission level: ${level}`
  );
}
