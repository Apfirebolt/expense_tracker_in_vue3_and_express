import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id.toString(), // Explicitly convert ObjectId to string
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d' }
  )
}

export default generateToken