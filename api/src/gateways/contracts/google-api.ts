export interface GoogleResetPassword {
  resetPassword: (
    input: GoogleResetPassword.Input,
  ) => Promise<GoogleResetPassword.Output>
}

export namespace GoogleResetPassword {
  export type Input = {
    accessToken: string
    newPassword: string
  }
  export type Output = {
    idToken: string
    refreshToken: string
    expiresIn: number
  }
}

export interface GoogleSignIn {
  signIn: (input: GoogleSignIn.Input) => Promise<GoogleSignIn.Output>
}

export namespace GoogleSignIn {
  export type Input = {
    email: string
    password: string
  }
  export type Output = {
    idToken: string
    refreshToken: string
    expiresIn: number
    localId: string
  }
}

export interface GoogleSignUp {
  signUp: (input: GoogleSignUp.Input) => Promise<GoogleSignUp.Output>
}

export namespace GoogleSignUp {
  export type Input = {
    email: string
    password: string
  }
  export type Output = {
    idToken: string
    refreshToken: string
    expiresIn: number
  }
}

export interface GoogleDeleteUser {
  deleteUser: (input: GoogleDeleteUser.Input) => Promise<void>
}

export namespace GoogleDeleteUser {
  export type Input = {
    localId: string
    idToken: string
  }
}

export interface GoogleVerifyEmail {
  verifyEmail: (input: GoogleVerifyEmail.Input) => Promise<void>
}

export namespace GoogleVerifyEmail {
  export type Input = {
    idToken: string
  }
}

export interface GoogleVerifyValidUser {
  verifyValidUser: (
    input: GoogleVerifyValidUser.Input,
  ) => Promise<GoogleVerifyValidUser.Output>
}

export namespace GoogleVerifyValidUser {
  export type Input = { email: string }
  export type Output = boolean
}

export interface GoogleVerifyEmailConfirmation {
  verifyEmailConfirmation: (
    input: GoogleVerifyEmailConfirmation.Input,
  ) => Promise<void>
}

export namespace GoogleVerifyEmailConfirmation {
  export type Input = {
    code: string
  }
}

export interface GoogleVerifyUser {
  verifyUser: (
    input: GoogleVerifyUser.Input,
  ) => Promise<GoogleVerifyUser.Output>
}

export namespace GoogleVerifyUser {
  export type Input = {
    idToken: string
  }
  export type Output = {
    email: string
    emailVerified: boolean
    disabled: boolean
  }
}

export interface GoogleSendEmailRecoveryPassword {
  sendEmailRecoveryPassword: (
    input: GoogleSendEmailRecoveryPassword.Input,
  ) => Promise<void>
}

export namespace GoogleSendEmailRecoveryPassword {
  export type Input = {
    email: string
  }
}

export interface GoogleConfirmEmailRecoveryPassword {
  confirmEmailRecoveryPassword: (
    input: GoogleConfirmEmailRecoveryPassword.Input,
  ) => Promise<void>
}

export namespace GoogleConfirmEmailRecoveryPassword {
  export type Input = {
    code: string
    password: string
  }
}

export interface GoogleRefreshToken {
  refreshSession: (
    input: GoogleRefreshToken.Input,
  ) => Promise<GoogleRefreshToken.Output>
}

export namespace GoogleRefreshToken {
  export type Input = {
    refreshToken: string
  }
  export type Output = {
    expires_in: string
    id_token: string
    refresh_token: string
  }
}
