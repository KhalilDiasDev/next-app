/**
 * @name verifyPermissionLevel
 * @description Validate if the user has the required permission level
 * @param requiredLevel The required permission level.
 * @param userPermission The user permission level.
 * @returns The result of the validation as boolean
 */
export function verifyPermissionLevel(
  requiredLevel: PermissionLevels,
  userPermission: PermissionLevels
): boolean {
  const levels = ["viewer", "editor", "maintainer", "admin"];

  const requiredLevelIndex = levels.indexOf(requiredLevel);
  const userPermissionIndex = levels.indexOf(userPermission);

  return requiredLevelIndex <= userPermissionIndex;
}
