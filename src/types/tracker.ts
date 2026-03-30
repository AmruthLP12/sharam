type TrackerRow = {
  $id: string;
  $sequence: number;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $tableId: string;

  user_id: string;
  movieName: string;
  movieDesc?: string;
  imageId?: string;
  userName?: string;
  userEmail?: string;
};


export type { TrackerRow };