/**
 * @name getTabs
 * @description get the list of tabs based on the user type.
 * @param tabs The list of tabs.
 * @param userType The user type.
 * @returns The list of tabs.
 */
export function getTabs(
  tabs: { [x: string]: TabsProps[] },
  userType?: PermissionLevels
) {
  if (userType && tabs[userType]) {
    return tabs[userType];
  }

  return tabs.viewer;
}
