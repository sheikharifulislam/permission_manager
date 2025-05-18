import { Policy, PolicyContext, PolicyResult } from "../Policy";

export class PurchasePolicy extends Policy {
    constructor() {
        super("PurchasePolicy", "Check if user can purchase the product");
    }

    async can(context: PolicyContext): Promise<PolicyResult> {
        const { userId } = context;
        const blockedUsers = [123, 456];
        if (blockedUsers.includes(userId as number)) {
            return this.denied("User is not allowed purchase the product");
        } else if (blockedUsers.includes(userId as number)) {
            return this.denied("User is not allowed purchase the product");
        }

        return this.allowed();
    }
}
