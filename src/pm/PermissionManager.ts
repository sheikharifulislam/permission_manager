import { RoleBasedPermission, RoleHierarchy } from "./config";

interface PermissionContext {
    roles: string[];
    permissions: string[];
}

export class PermissionManager {
    private readonly cachedRoleHierarchy: Map<string, Set<string>> = new Map();
    private readonly cachedRolePermission: Map<string, Set<string>> = new Map();

    constructor(private readonly context: PermissionContext) {
        // Flatten the role hierarchy and cache it
        Object.keys(RoleHierarchy).forEach((role) => {
            this.cachedRoleHierarchy.set(role, this.computeRoleHierarchy(role));
        });
        // Flatten the role permissions and cache it

        Object.keys(RoleBasedPermission).forEach((role) => {
            this.cachedRolePermission.set(role, this.computedRolePermission(role));
        });

        console.log("Role Hierarchy: ", this.cachedRoleHierarchy);
        console.log("Role Permissions: ", this.cachedRolePermission);
    }

    hasPermission(permission: string) {
        if (this.context.permissions.includes(permission)) {
            return true;
        }

        return this.hasPermissionThroughRole(this.context.roles, permission);
    }

    hasPermissions(permissions: string[]) {
        return permissions.every((permission) => this.hasPermission(permission));
    }

    hasAnyPermission(permissions: string[]) {
        return permissions.some((permission) => this.hasPermission(permission));
    }

    hasRole(requireRole: string) {
        return this.context.roles.some((role) => {
            const hierarchySet = this.cachedRoleHierarchy.get(role);
            return hierarchySet?.has(requireRole) || role === requireRole;
        });
    }

    getMaxRole() {
        return this.context.roles.reduce((maxRole, currentRole) => {
            this.cachedRoleHierarchy.get(maxRole)?.has(currentRole) ? maxRole : currentRole;
        }, this.context.roles[0]);
    }

    // private method
    private computeRoleHierarchy(role: string, visited: Set<string> = new Set()) {
        const result = new Set<string>();

        if (visited.has(role)) {
            return result;
        }

        visited.add(role);

        const inheritedRoles = RoleHierarchy[role] || [];

        inheritedRoles.forEach((inheritedRole) => {
            result.add(inheritedRole);

            const inheritedHierarchy = this.computeRoleHierarchy(inheritedRole, visited);
            inheritedHierarchy.forEach((role) => {
                result.add(role);
            });
        });

        return result;
    }

    private computedRolePermission(role: string, visited: Set<string> = new Set()) {
        const result = new Set<string>();

        if (visited.has(role)) {
            return result;
        }

        visited.add(role);

        RoleBasedPermission[role]?.forEach((permission) => result.add(permission));
        const hierarchySet = this.cachedRoleHierarchy.get(role);
        hierarchySet?.forEach((inheritedRole) => {
            RoleBasedPermission[inheritedRole]?.forEach((permission) => result.add(permission));
        });

        return result;
    }

    private hasPermissionThroughRole(roles: string[], permission: string) {
        return roles.some((role) => this.cachedRolePermission.get(role)?.has(permission));
    }
}
