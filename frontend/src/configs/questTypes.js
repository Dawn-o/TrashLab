export const questTypes = [
    {
        key: "total",
        name: (quest) => quest.total.name,
        bonus: (quest) => quest.total.bonus_points,
        progress: (quest) => quest.total.progress_text,
        completed: (quest) => quest.total.completed,
    },
    {
        key: "organic",
        name: (quest) => quest.organic.name,
        bonus: (quest) => quest.organic.bonus_points,
        progress: (quest) => quest.organic.progress_text,
        completed: (quest) => quest.organic.completed,
    },
    {
        key: "inorganic",
        name: (quest) => quest.inorganic.name,
        bonus: (quest) => quest.inorganic.bonus_points,
        progress: (quest) => quest.inorganic.progress_text,
        completed: (quest) => quest.inorganic.completed,
    },
];