/**
 * @name getPermissions
 * @description Get the user permissions based on the workspace
 * @param session The session object.
 * @param item workspace object.
 * @returns The user permission level as string
 */
export function getPermissions(
  session: any,
  item?: Workspace.Props
): PermissionLevels {
  const itemPermissions: { permissions: PermissionsProps; isOwner: boolean } = {
    permissions: item?.permissions || {},
    isOwner: session.user.id === item?.user_id,
  };

  if (!itemPermissions) {
    return "viewer";
  }

  if (session.user.isAdmin) {
    return "admin";
  }

  if (itemPermissions.isOwner) {
    return "maintainer";
  }

  for (const [key, value] of Object.entries(itemPermissions.permissions)) {
    if (value.includes(session.user.id)) {
      return key as keyof PermissionsProps;
    }
  }

  return "viewer";
}
