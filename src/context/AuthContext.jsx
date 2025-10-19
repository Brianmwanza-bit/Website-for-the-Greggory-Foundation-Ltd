import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const defaultContext = {
  isAuthenticated: false,
  user: null,
  login: () => {},
  loginAsEmployee: (_jobId, _name) => {},
  loginAsDeveloper: (_profile) => {},
  logout: () => {},
}

const AuthContext = createContext(defaultContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // { role: 'employee'|'developer', name?, jobId? }

  useEffect(() => {
    const storedUser = localStorage.getItem('tgf_user')
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)) } catch {}
    }
  }, [])

  const persist = (u) => {
    setUser(u)
    if (u) localStorage.setItem('tgf_user', JSON.stringify(u))
    else localStorage.removeItem('tgf_user')
  }

  const login = () => {
    // Backward compatibility: simple auth with no role
    persist({ role: 'employee' })
  }

  const loginAsEmployee = (jobId, name) => {
    // Placeholder: real impl should verify jobId + password on backend
    const displayName = name && name.trim() ? name.trim() : `Employee ${jobId}`
    persist({ role: 'employee', jobId, name: displayName })
  }

  const loginAsDeveloper = (profile) => {
    // profile may include login/name/id from GitHub
    persist({ role: 'developer', ...profile })
  }

  const logout = () => {
    persist(null)
  }

  const value = useMemo(() => ({
    isAuthenticated: !!user,
    user,
    login,
    loginAsEmployee,
    loginAsDeveloper,
    logout,
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
