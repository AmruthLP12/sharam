type TestRow = {
  $id: string;
  $sequence: number;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $tableId: string;

  testName: string;
  description: string;
  durationMinutes: number;
  difficultyLevel: "easy" | "medium" | "hard"; // inferred from your data
  isActive: boolean;
  testCategory: string;
};

type Filters = {
  difficulty?: string;
  active?: boolean;
};

export type { TestRow, Filters };