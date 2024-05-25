class AuthService {
    static isAuthenticated = false;

    static login(username, password) {
        if (username === "user" && password === "password") {
            AuthService.isAuthenticated = true;
            return true;
        }
        return false;
    }

    static logout() {
        AuthService.isAuthenticated = false;
    }

    static checkAuth() {
        return AuthService.isAuthenticated;
    }
}

export default AuthService;
