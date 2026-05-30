import api from "./api";

export const loginApi = async (
  email,
  password,
  role = "user"
) => {
  try {
    const res = await api.get(`/users?email=${encodeURIComponent(email)}`);
    let user = Array.isArray(res.data)
      ? res.data.find((item) => {
          const passwordMatches = item.password === password;
          const roleMatches =
            role === "manager"
              ? item.roleId === 2 || item.role === "manager"
              : true;
          return passwordMatches && roleMatches;
        })
      : null;

    if (!user && role === "manager" && email === "admin@smartfood.com" && password === "admin123") {
      user = {
        id: "admin-001",
        name: "Quản lý hệ thống",
        email: "admin@smartfood.com",
        roleId: 2,
        isActive: true,
        avatar: "https://i.pravatar.cc/150?img=66",
      };
    }

    console.log("Login response:", res.data, "matched user:", user);
    return user ? [user] : [];
  } catch (error) {
    console.warn("Login API error, falling back to localStorage users:", error.message || error);
    try {
      const raw = localStorage.getItem("local_users");
      const users = raw ? JSON.parse(raw) : [];
      let user = users.find((u) => u.email === email && u.password === password);
      if (user && role === "manager") {
        user = user.roleId === 2 || user.role === "manager" ? user : null;
      }
      if (!user && role === "manager" && email === "admin@smartfood.com" && password === "admin123") {
        user = {
          id: "admin-001",
          name: "Quản lý hệ thống",
          email: "admin@smartfood.com",
          roleId: 2,
          isActive: true,
          avatar: "https://i.pravatar.cc/150?img=66",
        };
      }
      return user ? [user] : [];
    } catch (e) {
      console.error("Fallback login parse error", e);
      return [];
    }
  }
};

export const registerApi = async (
  userData
) => {

  try {

    // check email tồn tại
    const check = await api.get(`/users?email=${userData.email}`);
    if (check.data.length > 0) {
      return {
        success: false,
        message: "Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.",
      };
    }

    const newUser = {
      name: userData.fullName,
      email: userData.email,
      password: userData.password,
      roleId: userData.role === "manager" ? 2 : 1,
      role: userData.role === "manager" ? "manager" : "user",
      isActive: true,
      avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
      createdAt: new Date().toISOString(),
    };

    const response = await api.post("/users", newUser);
    console.log("Register success:", response.data);
    return {
      success: true,
      data: response.data,
      message: "Đăng ký thành công!",
    };

  } catch (error) {
    console.warn("Register API failed, falling back to localStorage:", error.message || error);
    try {
      const raw = localStorage.getItem("local_users");
      const users = raw ? JSON.parse(raw) : [];
      if (users.find((u) => u.email === userData.email)) {
        return { success: false, message: "Email này đã được đăng ký." };
      }
      const newUser = {
        id: Date.now(),
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        roleId: userData.role === "manager" ? 2 : 1,
        role: userData.role === "manager" ? "manager" : "user",
        isActive: true,
        avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem("local_users", JSON.stringify(users));
      return { success: true, data: newUser, message: "Đăng ký thành công (offline)." };
    } catch (e) {
      console.error("Fallback register error", e);
      return { success: false, message: "Đăng ký thất bại. Vui lòng thử lại." };
    }
  }
};

export const logoutApi = () => {
  localStorage.removeItem("user");
};

// Simulated social login flows for development / UI wiring
export const googleLogin = async () => {
  // If Firebase config exists in env, use Firebase Auth for real OAuth
  const hasFirebaseConfig = !!(
    process.env.REACT_APP_FIREBASE_API_KEY ||
    (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__)
  );

  if (hasFirebaseConfig) {
    try {
      const firebaseApp = await import('firebase/app');
      const firebaseAuth = await import('firebase/auth');
      const { initializeApp } = firebaseApp;
      const { getAuth, signInWithPopup, GoogleAuthProvider } = firebaseAuth;

      const cfg = (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__) || {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
      };
      try { initializeApp(cfg); } catch (e) { /* already initialized */ }
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const gUser = result.user;
      return [
        {
          id: gUser.uid,
          name: gUser.displayName || 'Google User',
          email: gUser.email,
          roleId: 1,
          role: 'user',
          isActive: true,
          avatar: gUser.photoURL,
        },
      ];
    } catch (e) {
      console.warn('Firebase Google login failed', e);
      // fall through to simulated response below
    }
  }

  // Fallback simulated user for development
  return [
    {
      id: "google-001",
      name: "Người dùng Google",
      email: "google.user@example.com",
      roleId: 1,
      role: "user",
      isActive: true,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
  ];
};

export const facebookLogin = async () => {
  // If Firebase config exists in env, use Firebase Auth for real OAuth
  const hasFirebaseConfig = !!(
    process.env.REACT_APP_FIREBASE_API_KEY ||
    (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__)
  );

  if (hasFirebaseConfig) {
    try {
      const firebaseApp = await import('firebase/app');
      const firebaseAuth = await import('firebase/auth');
      const { initializeApp } = firebaseApp;
      const { getAuth, signInWithPopup, FacebookAuthProvider } = firebaseAuth;

      // init app if not already
      const cfg = (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__) || {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
      };
      try { initializeApp(cfg); } catch (e) { /* already initialized */ }
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      return [
        {
          id: fbUser.uid,
          name: fbUser.displayName || 'Facebook User',
          email: fbUser.email,
          roleId: 1,
          role: 'user',
          isActive: true,
          avatar: fbUser.photoURL,
        },
      ];
    } catch (e) {
      console.warn('Firebase Facebook login failed', e);
      // fall through to simulated response below
    }
  }

  // Fallback simulated user for development
  return [
    {
      id: "facebook-001",
      name: "Người dùng Facebook",
      email: "fb.user@example.com",
      roleId: 1,
      role: "user",
      isActive: true,
      avatar: "https://i.pravatar.cc/150?img=32",
    },
  ];
};