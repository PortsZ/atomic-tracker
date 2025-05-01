export interface Storage {
  habits: [
    {
      id: "habit-001";
      name: "Read Daily";
      createdAt: "2025-05-01";
      entries: {
        "2025-05-01": "done";
        "2025-05-02": "missed";
        "2025-05-03": "pending";
      };
      lockPastEntries: true;
    }
  ];
}
