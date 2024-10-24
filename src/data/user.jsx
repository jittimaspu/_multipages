const users = [
    { user: 'user', pass: 'pass', role: 'user', token: 'user' },
    { user: 'admin', pass: 'admin', role: 'admin', token: 'admin' },
    { user: 'guest', pass: 'guest', role: 'guest', token: 'guest' }
]

export function verifyUser(user, pass) {

    const userFound = users.find((u) => {
        return users.find((u) => u.user === user && u.pass === pass)
    }) // found user: object (mem, addr.), not found user: null (0)

    return userFound ? { token: userFound.token, role: userFound.role } : null
}