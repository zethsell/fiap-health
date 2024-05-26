export class AuthenticationError extends Error {
  constructor() {
    super('Dados inválidos')
    this.name = 'AuthenticationError'
  }
}

export class RegistrationError extends Error {
  constructor() {
    super('Usuário já cadastrado, realize novamente o login. ')
    this.name = 'RegistrationError'
  }
}

export class RegistrationFailError extends Error {
  constructor() {
    super('Erro ao concluir o cadastro!')
    this.name = 'RegistrationFailError'
  }
}

export class PermissionError extends Error {
  constructor() {
    super('Sem permissão de acesso')
    this.name = 'PermissionError'
  }
}

export class TokenAuthenticationError extends Error {
  constructor() {
    super('Token expirado')
    this.name = 'AuthenticationError'
  }
}
