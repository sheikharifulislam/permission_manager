import { Policy, PolicyContext, PolicyResult } from "../Policy";

export class FreeTrailPolicy extends Policy {
    constructor() {
        super("FreeTrailPolicy", "check if the user can access the free trail");
    }

    async can(context: PolicyContext): Promise<PolicyResult> {
        const { userId } = context;
        if (userId === 123) {
            return this.denied("User is not allowed to access the free trail");
        }

        return this.allowed();
    }
}
