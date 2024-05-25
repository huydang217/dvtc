import {
    AuthError,
    AuthTokenResponsePassword,
    UserResponse,
} from "@supabase/auth-js";
import { supabase } from "../Supabase/Supabase";

class AuthService {
    static async signInWithPassword(
        username: string,
        password: string
    ): Promise<AuthTokenResponsePassword> {
        return await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });
    }

    static async signOut(): Promise<{ error: AuthError }> {
        return await supabase.auth.signOut({
            scope: "global",
        });
    }

    static async getUser(): Promise<UserResponse> {
        return await supabase.auth.getUser();
    }
}

export default AuthService;
