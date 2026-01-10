    import { createContext, useContext, useState, useEffect } from "react";

    const AuthContext = createContext();

    export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("aliia_user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (email, password) => {
        // USUARIO BÁSICO
        if (email === "basico@aliiatech.com" && password === "123") {
        const userData = { email, name: "Emprendedor", plan: "BASIC", avatar: "https://ui-avatars.com/api/?name=Emprendedor" };
        saveSession(userData);
        return true;
        } 
        
        // USUARIO PRO
        if (email === "pro@aliiatech.com" && password === "123") {
        const userData = { email, name: "Empresario Pro", plan: "PRO", avatar: "https://ui-avatars.com/api/?name=Pro+User&background=0D8ABC&color=fff" };
        saveSession(userData);
        return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("aliia_user");
    };

    const saveSession = (data) => {
        setUser(data);
        localStorage.setItem("aliia_user", JSON.stringify(data));
    };

    const isPro = user?.plan === "PRO";

    return (
        <AuthContext.Provider value={{ user, login, logout, isPro }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export const useAuth = () => useContext(AuthContext);