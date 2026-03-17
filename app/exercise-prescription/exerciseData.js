export const EXERCISE_LIBRARY = [
    // Chest
    { id: 'bench-press', name: 'Barbell Bench Press', category: 'Chest', equipment: 'Barbell' },
    { id: 'incline-bench', name: 'Incline Bench Press', category: 'Chest', equipment: 'Barbell' },
    { id: 'decline-bench', name: 'Decline Bench Press', category: 'Chest', equipment: 'Barbell' },
    { id: 'db-bench', name: 'Dumbbell Bench Press', category: 'Chest', equipment: 'Dumbbell' },
    { id: 'db-incline', name: 'Incline Dumbbell Press', category: 'Chest', equipment: 'Dumbbell' },
    { id: 'db-fly', name: 'Dumbbell Fly', category: 'Chest', equipment: 'Dumbbell' },
    { id: 'cable-fly', name: 'Cable Fly', category: 'Chest', equipment: 'Cable' },
    { id: 'pushup', name: 'Push-Up', category: 'Chest', equipment: 'Bodyweight' },
    { id: 'dips', name: 'Chest Dips', category: 'Chest', equipment: 'Bodyweight' },
    { id: 'pec-deck', name: 'Pec Deck Machine', category: 'Chest', equipment: 'Machine' },

    // Back
    { id: 'deadlift', name: 'Deadlift', category: 'Back', equipment: 'Barbell' },
    { id: 'rdl', name: 'Romanian Deadlift', category: 'Back', equipment: 'Barbell' },
    { id: 'bent-row', name: 'Barbell Bent-Over Row', category: 'Back', equipment: 'Barbell' },
    { id: 'db-row', name: 'Dumbbell Row', category: 'Back', equipment: 'Dumbbell' },
    { id: 'pullup', name: 'Pull-Up', category: 'Back', equipment: 'Bodyweight' },
    { id: 'chinup', name: 'Chin-Up', category: 'Back', equipment: 'Bodyweight' },
    { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'Back', equipment: 'Cable' },
    { id: 'seated-row', name: 'Seated Cable Row', category: 'Back', equipment: 'Cable' },
    { id: 'tbar-row', name: 'T-Bar Row', category: 'Back', equipment: 'Barbell' },
    { id: 'face-pull', name: 'Face Pull', category: 'Back', equipment: 'Cable' },

    // Shoulders
    { id: 'ohp', name: 'Overhead Press', category: 'Shoulders', equipment: 'Barbell' },
    { id: 'db-ohp', name: 'Dumbbell Shoulder Press', category: 'Shoulders', equipment: 'Dumbbell' },
    { id: 'lat-raise', name: 'Lateral Raise', category: 'Shoulders', equipment: 'Dumbbell' },
    { id: 'front-raise', name: 'Front Raise', category: 'Shoulders', equipment: 'Dumbbell' },
    { id: 'rear-delt-fly', name: 'Rear Delt Fly', category: 'Shoulders', equipment: 'Dumbbell' },
    { id: 'arnold-press', name: 'Arnold Press', category: 'Shoulders', equipment: 'Dumbbell' },
    { id: 'upright-row', name: 'Upright Row', category: 'Shoulders', equipment: 'Barbell' },
    { id: 'shrug', name: 'Barbell Shrug', category: 'Shoulders', equipment: 'Barbell' },

    // Legs
    { id: 'squat', name: 'Back Squat', category: 'Legs', equipment: 'Barbell' },
    { id: 'front-squat', name: 'Front Squat', category: 'Legs', equipment: 'Barbell' },
    { id: 'leg-press', name: 'Leg Press', category: 'Legs', equipment: 'Machine' },
    { id: 'lunge', name: 'Barbell Lunge', category: 'Legs', equipment: 'Barbell' },
    { id: 'db-lunge', name: 'Dumbbell Lunge', category: 'Legs', equipment: 'Dumbbell' },
    { id: 'leg-extension', name: 'Leg Extension', category: 'Legs', equipment: 'Machine' },
    { id: 'leg-curl', name: 'Leg Curl', category: 'Legs', equipment: 'Machine' },
    { id: 'calf-raise', name: 'Standing Calf Raise', category: 'Legs', equipment: 'Machine' },
    { id: 'seated-calf', name: 'Seated Calf Raise', category: 'Legs', equipment: 'Machine' },
    { id: 'hack-squat', name: 'Hack Squat', category: 'Legs', equipment: 'Machine' },
    { id: 'goblet-squat', name: 'Goblet Squat', category: 'Legs', equipment: 'Dumbbell' },
    { id: 'sumo-deadlift', name: 'Sumo Deadlift', category: 'Legs', equipment: 'Barbell' },

    // Arms
    { id: 'barbell-curl', name: 'Barbell Curl', category: 'Biceps', equipment: 'Barbell' },
    { id: 'db-curl', name: 'Dumbbell Curl', category: 'Biceps', equipment: 'Dumbbell' },
    { id: 'hammer-curl', name: 'Hammer Curl', category: 'Biceps', equipment: 'Dumbbell' },
    { id: 'preacher-curl', name: 'Preacher Curl', category: 'Biceps', equipment: 'Barbell' },
    { id: 'cable-curl', name: 'Cable Curl', category: 'Biceps', equipment: 'Cable' },
    { id: 'incline-curl', name: 'Incline Dumbbell Curl', category: 'Biceps', equipment: 'Dumbbell' },
    { id: 'skullcrusher', name: 'Skullcrusher', category: 'Triceps', equipment: 'Barbell' },
    { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'Triceps', equipment: 'Cable' },
    { id: 'overhead-ext', name: 'Overhead Tricep Extension', category: 'Triceps', equipment: 'Dumbbell' },
    { id: 'tricep-dip', name: 'Tricep Dips', category: 'Triceps', equipment: 'Bodyweight' },
    { id: 'close-grip', name: 'Close-Grip Bench Press', category: 'Triceps', equipment: 'Barbell' },

    // Core
    { id: 'plank', name: 'Plank', category: 'Core', equipment: 'Bodyweight' },
    { id: 'crunch', name: 'Crunch', category: 'Core', equipment: 'Bodyweight' },
    { id: 'ab-wheel', name: 'Ab Wheel Rollout', category: 'Core', equipment: 'Equipment' },
    { id: 'hanging-knee', name: 'Hanging Knee Raise', category: 'Core', equipment: 'Bodyweight' },
    { id: 'leg-raise', name: 'Leg Raise', category: 'Core', equipment: 'Bodyweight' },
    { id: 'cable-crunch', name: 'Cable Crunch', category: 'Core', equipment: 'Cable' },
    { id: 'russian-twist', name: 'Russian Twist', category: 'Core', equipment: 'Bodyweight' },
];

export const CATEGORIES = [...new Set(EXERCISE_LIBRARY.map(e => e.category))];

export const DEFAULT_HYPERTROPHY = [
    { id: 'bench-press', name: 'Barbell Bench Press', category: 'Chest', sets: 4, reps: 10, frequency: 2, weight: 135, progressPct: 5 },
    { id: 'squat', name: 'Back Squat', category: 'Legs', sets: 4, reps: 10, frequency: 2, weight: 185, progressPct: 5 },
    { id: 'bent-row', name: 'Barbell Bent-Over Row', category: 'Back', sets: 4, reps: 10, frequency: 2, weight: 135, progressPct: 5 },
    { id: 'ohp', name: 'Overhead Press', category: 'Shoulders', sets: 3, reps: 12, frequency: 2, weight: 95, progressPct: 5 },
    { id: 'db-curl', name: 'Dumbbell Curl', category: 'Biceps', sets: 3, reps: 12, frequency: 2, weight: 30, progressPct: 5 },
    { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'Triceps', sets: 3, reps: 12, frequency: 2, weight: 50, progressPct: 5 },
];

export const DEFAULT_STRENGTH = [
    { id: 'bench-press', name: 'Barbell Bench Press', category: 'Chest', sets: 5, reps: 5, frequency: 2, weight: 185, progressPct: 2.5 },
    { id: 'squat', name: 'Back Squat', category: 'Legs', sets: 5, reps: 5, frequency: 2, weight: 225, progressPct: 2.5 },
    { id: 'deadlift', name: 'Deadlift', category: 'Back', sets: 3, reps: 5, frequency: 1, weight: 275, progressPct: 2.5 },
    { id: 'ohp', name: 'Overhead Press', category: 'Shoulders', sets: 5, reps: 5, frequency: 2, weight: 115, progressPct: 2.5 },
    { id: 'bent-row', name: 'Barbell Bent-Over Row', category: 'Back', sets: 5, reps: 5, frequency: 2, weight: 155, progressPct: 2.5 },
];
