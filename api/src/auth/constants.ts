import 'dotenv/config'

export const jwtConstants = {
  secret: process.env['JWT_SECRET'],
  expiresIn: `${process.env['JWT_EXPIRATION_TIME']}s`,

  refreshSecret: process.env['JWT_REFRESH_SECRET'],
  refreshExpiresIn: `${process.env['JWT_REFRESH_EXPIRATION_TIME']}d`,
}
