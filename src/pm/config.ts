export enum Role {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    MANAGER = "manager",
    SALES_MANAGER = "sales_manager",
    PROOF_READER = "proof_reader",
    EDITOR = "editor",
    PREMIUM_USER = "premium_user",
    USER = "user",
}

export enum Permission {
    // product permissions
    PRODUCT_CREATE = "product:create",
    PRODUCT_UPDATE = "product:update",
    PRODUCT_DELETE = "product:delete",
    PRODUCT_READ = "product:read",
    PRODUCT_REVIEW = "product:review",
    // user permissions
    USER_CREATE = "user:create",
    USER_UPDATE = "user:update",
    USER_DELETE = "user:delete",
    USER_READ = "user:read",
}

export const RoleHierarchy: Record<string, string[]> = {
    superAdmin: ["admin"],
    admin: ["manager"],
    manager: ["proof_reader", "editor", "sales_manager"],
    sales_manager: ["user"],
    proof_reader: ["user"],
    editor: ["user"],
    premium_user: ["user"],
    user: [],
} as const;

export const RoleBasedPermission: Record<string, string[]> = {
    superAdmin: [],
    admin: ["product:delete", "user:delete"],
    manager: ["product:create", "user:create"],
    editor: ["product:create", "product:update"],
    proof_reader: ["product:update"],
    premium_user: ["product:review"],
    user: ["product:read"],
} as const;
