import { FreeTrailPolicy } from "./policy/policies/FreeTrailPolicy";
import { RegistrationPolicy } from "./policy/policies/RegistrationPolicy";
import { PolicyBuilder } from "./policy/Policy";

const accessFreeTrail = async (userid: number, email: string, password: string) => {
    // do other stuffs

    const policyGroup = PolicyBuilder.create("FreeTrailPolicyGroup")
        .addPolicy(new RegistrationPolicy())
        .addPolicy(new FreeTrailPolicy())
        .build();

    const { allowed, name, reason } = await policyGroup.can({
        userId: userid,
        email,
    });

    if (!allowed) {
        console.error(`[${name}] User [${userid}] can not access free trial: ${reason}`);
        return;
    }

    // do main operation
    console.log(`[${name}] User [${userid}] can access free trail`);

    return {
        success: true,
        message: `trial access granted for user ${userid}`,
    };
};

accessFreeTrail(930, "test@gmail.com", "1234");
