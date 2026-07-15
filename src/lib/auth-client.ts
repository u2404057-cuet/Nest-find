import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth"

import { BETTER_AUTH_URL } from "./api"

export const authClient = createAuthClient({
    baseURL: BETTER_AUTH_URL,
    plugins: [
        inferAdditionalFields<typeof auth>()
    ]
})

export const { signIn, signUp, useSession } = authClient;
