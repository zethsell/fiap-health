export type Consult = {
  id: number
  title?: string
  description?: string
  date?: Date | string
  status?: string
}

export interface ListConsults {
  get: () => Promise<ListConsults.Output>
}

export namespace ListConsults {
  export type Output = Consult[]
}

export interface SaveConsult {
  save: (input: SaveConsult.Input) => Promise<SaveConsult.Output>
}

export namespace SaveConsult {
  export type Input = Omit<
    Consult,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
  > & { id?: number }
  export type Output = Consult
}

export interface ShowConsult {
  show: (input: ShowConsult.Input) => Promise<ShowConsult.Output>
}

export namespace ShowConsult {
  export type Input = { id: number }
  export type Output = Consult
}

export interface ShowConsultByConditions {
  showByConditions: (
    input: ShowConsultByConditions.Input,
  ) => Promise<ShowConsultByConditions.Output>
}

export namespace ShowConsultByConditions {
  export type Input = { conditions: Partial<Consult> }
  export type Output = Consult
}

export interface DeleteConsult {
  delete: (input: DeleteConsult.Input) => Promise<void>
}

export namespace DeleteConsult {
  export type Input = { id: number }
}
