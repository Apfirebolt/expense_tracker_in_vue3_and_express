import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1m' }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id.toString() }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: '7d' } // Long-lived
  )
}

export { generateToken, generateRefreshToken }