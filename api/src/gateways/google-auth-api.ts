import {
  GoogleConfirmEmailRecoveryPassword,
  GoogleDeleteUser,
  GoogleRefreshToken,
  GoogleResetPassword,
  GoogleSendEmailRecoveryPassword,
  GoogleSignIn,
  GoogleSignUp,
  GoogleVerifyEmail,
  GoogleVerifyEmailConfirmation,
  GoogleVerifyUser,
  GoogleVerifyValidUser,
} from './contracts'
import { AuthenticationError, RegistrationError } from '../common/errors'
import { AxiosHttpClient } from './axios-client'
import { googleConstants } from '../common/constants/google-constants'

export class GoogleAuthApi
  implements
    GoogleResetPassword,
    GoogleSignIn,
    GoogleSignUp,
    GoogleVerifyUser,
    GoogleRefreshToken,
    GoogleVerifyValidUser,
    GoogleConfirmEmailRecoveryPassword,
    GoogleSendEmailRecoveryPassword,
    GoogleVerifyEmail,
    GoogleVerifyEmailConfirmation
{
  constructor(private readonly httpClient: AxiosHttpClient) {}

  private tenantId = googleConstants.auth.tenantPatientId

  setTenantId(origin: 'PATIENT' | 'MEDIC') {
    this.tenantId =
      origin === 'PATIENT'
        ? googleConstants.auth.tenantPatientId
        : googleConstants.auth.tenantMedicID
  }

  getTenantId() {
    return this.tenantId
  }

  async resetPassword({
    accessToken,
    newPassword,
  }: GoogleResetPassword.Input): Promise<GoogleResetPassword.Output> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:update',
    )
    const body = {
      idToken: accessToken,
      password: newPassword,
      returnSecureToken: true,
      tenantId: this.getTenantId(),
    }
    const params = this.createParams()
    return await this.httpClient.post({ url, body, params })
  }

  async signIn({
    email,
    password,
  }: GoogleSignIn.Input): Promise<GoogleSignIn.Output> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:signInWithPassword',
    )
    const body = {
      email,
      password,
      returnSecureToken: true,
      tenantId: this.getTenantId(),
    }
    const params = this.createParams()
    return await this.httpClient
      .post({ url, body, params, error: true })
      .catch(() => {
        throw new AuthenticationError()
      })
  }

  async signUp({
    email,
    password,
  }: GoogleSignUp.Input): Promise<GoogleSignUp.Output> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:signUp',
    )
    const body = {
      email,
      password,
      returnSecureToken: true,
      tenantId: this.getTenantId(),
    }
    const params = this.createParams()
    return await this.httpClient.post({ url, body, params }).catch(() => {
      throw new RegistrationError()
    })
  }

  async verifyEmail({ idToken }: GoogleVerifyEmail.Input): Promise<void> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:sendOobCode',
    )
    const body = {
      idToken,
      tenantId: this.getTenantId(),
      requestType: 'VERIFY_EMAIL',
    }
    const params = this.createParams()
    return await this.httpClient.post({ url, body, params })
  }

  async verifyValidUser({
    email,
  }: GoogleVerifyValidUser.Input): Promise<GoogleVerifyValidUser.Output> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:createAuthUri',
    )
    const body = {
      identifier: email,
      tenantId: this.getTenantId(),
      continueUri: googleConstants.auth.identityToolkitUrl,
    }
    const params = this.createParams()
    const { registered } = await this.httpClient.post({ url, body, params })
    return !!registered
  }

  async verifyEmailConfirmation({
    code,
  }: GoogleVerifyEmailConfirmation.Input): Promise<void> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:update',
    )
    const body = { oobCode: code, tenantId: this.getTenantId() }
    const params = this.createParams()
    await this.httpClient.post({ url, body, params })
  }

  async verifyUser({
    idToken,
  }: GoogleVerifyUser.Input): Promise<GoogleVerifyUser.Output> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:lookup',
    )
    const body = { idToken, tenantId: this.getTenantId() }
    const params = this.createParams()
    const response = await this.httpClient.post<{
      users: Array<GoogleVerifyUser.Output>
    }>({
      url,
      body,
      params,
    })
    return response.users[0] as any
  }

  async deleteUser({
    localId,
    idToken,
  }: GoogleDeleteUser.Input): Promise<void> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:delete',
    )
    const body = { localId, idToken, tenantId: this.getTenantId() }
    const params = this.createParams()
    await this.httpClient.post({ url, body, params })
  }

  async sendEmailRecoveryPassword({
    email,
  }: GoogleSendEmailRecoveryPassword.Input): Promise<void> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:sendOobCode',
    )
    const body = {
      email,
      tenantId: this.getTenantId(),
      requestType: 'PASSWORD_RESET',
    }
    const params = this.createParams()
    await this.httpClient.post({ url, body, params })
  }

  async confirmEmailRecoveryPassword({
    code,
    password,
  }: GoogleConfirmEmailRecoveryPassword.Input): Promise<void> {
    const url = this.generateUrl(
      googleConstants.auth.identityToolkitUrl,
      'accounts:resetPassword',
    )
    const body = {
      oobCode: code,
      newPassword: password,
      tenantId: this.getTenantId(),
    }
    const params = this.createParams()
    await this.httpClient.post({ url, body, params })
  }

  async refreshSession({
    refreshToken,
  }: GoogleRefreshToken.Input): Promise<GoogleRefreshToken.Output> {
    const url = this.generateUrl(googleConstants.auth.secureTokenUrl, 'token')
    const body = {
      refreshToken,
      grant_type: 'refresh_token',
      tenantId: this.getTenantId(),
    }
    const params = this.createParams()
    return await this.httpClient.post({ url, body, params })
  }

  private createParams(): any {
    return {
      proxy: false,
      headers: { 'X-Firebase-Locale': 'pt-BR' },
    }
  }

  private generateUrl(baseUrl: string, endpoint: string): string {
    const mountedUrl = new URL(`${baseUrl}${endpoint}`)
    mountedUrl.searchParams.append('key', googleConstants.auth.apiKey)
    return mountedUrl.href
  }
}
