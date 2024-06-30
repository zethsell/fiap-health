export type TableColumn = {
    field: string
    label: string
    value: string
}

export class TableBuilderHelper {
    private readonly columns: TableColumn[];

    private constructor(columns = []) {
        this.columns = [];
    }

    static of(): TableBuilderHelper {
        return new TableBuilderHelper();
    }

    column(field: string, label: string, value: string): TableBuilderHelper {
        this.columns.push({field, label, value});
        return this;
    }

    build(): TableColumn[] {
        return this.columns
    }
}
