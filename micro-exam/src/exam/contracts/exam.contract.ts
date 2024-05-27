export type Exam = {
  id: number;
  title?: string;
  description?: string;
  date?: Date | string;
  status?: string;
};

export interface ListExams {
  get: () => Promise<ListExams.Output>;
}

export namespace ListExams {
  export type Output = Exam[];
}

export interface SaveExam {
  save: (input: SaveExam.Input) => Promise<SaveExam.Output>;
}

export namespace SaveExam {
  export type Input = Omit<
    Exam,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
  > & { id?: number };
  export type Output = Exam;
}

export interface ShowExam {
  show: (input: ShowExam.Input) => Promise<ShowExam.Output>;
}

export namespace ShowExam {
  export type Input = { id: number };
  export type Output = Exam;
}

export interface ShowExamByConditions {
  showByConditions: (
    input: ShowExamByConditions.Input,
  ) => Promise<ShowExamByConditions.Output>;
}

export namespace ShowExamByConditions {
  export type Input = { conditions: Partial<Exam> };
  export type Output = Exam;
}

export interface DeleteExam {
  delete: (input: DeleteExam.Input) => Promise<void>;
}

export namespace DeleteExam {
  export type Input = { id: number };
}
