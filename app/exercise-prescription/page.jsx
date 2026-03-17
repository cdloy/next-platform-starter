'use client';

import { useState, useEffect, useRef } from 'react';
import { EXERCISE_LIBRARY, CATEGORIES, DEFAULT_HYPERTROPHY, DEFAULT_STRENGTH } from './exerciseData';

const PHASES = ['hypertrophy', 'strength'];
const PHASE_LABELS = { hypertrophy: 'Hypertrophy Phase', strength: 'Strength Phase' };
const PHASE_DEFAULTS = { hypertrophy: DEFAULT_HYPERTROPHY, strength: DEFAULT_STRENGTH };

const PHASE_INFO = {
    hypertrophy: { reps: '8–15', intensity: '60–75% 1RM', rest: '60–90s', focus: 'Muscle Growth' },
    strength: { reps: '1–6', intensity: '80–95% 1RM', rest: '3–5 min', focus: 'Maximal Strength' },
};

function generateUID() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function roundToNearestFive(n) {
    return Math.round(n / 5) * 5;
}

// --- Search Modal ---
function ExerciseSearchModal({ onAdd, onClose, existing }) {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const existingIds = new Set(existing.map(e => e.id));

    const filtered = EXERCISE_LIBRARY.filter(ex => {
        const matchCat = activeCategory === 'All' || ex.category === activeCategory;
        const matchQ = ex.name.toLowerCase().includes(query.toLowerCase()) ||
            ex.category.toLowerCase().includes(query.toLowerCase()) ||
            ex.equipment.toLowerCase().includes(query.toLowerCase());
        return matchCat && matchQ;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
            <div
                className="w-full max-w-lg bg-blue-950 border border-blue-700 rounded-xl shadow-2xl flex flex-col max-h-[80vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-blue-800">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-white">Add Exercise</h3>
                        <button onClick={onClose} className="text-blue-400 hover:text-white transition-colors text-xl leading-none">&times;</button>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search exercises..."
                        className="w-full px-3 py-2 rounded-lg bg-blue-900 border border-blue-700 text-white placeholder-blue-400 text-sm focus:outline-none focus:border-primary"
                    />
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {['All', ...CATEGORIES].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    activeCategory === cat
                                        ? 'bg-primary text-primary-content'
                                        : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="overflow-y-auto flex-1 p-2">
                    {filtered.length === 0 ? (
                        <p className="text-blue-400 text-sm text-center py-8">No exercises found</p>
                    ) : (
                        <div className="space-y-1">
                            {filtered.map(ex => {
                                const already = existingIds.has(ex.id);
                                return (
                                    <button
                                        key={ex.id}
                                        disabled={already}
                                        onClick={() => { if (!already) { onAdd(ex); onClose(); } }}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                                            already
                                                ? 'opacity-40 cursor-not-allowed bg-blue-900/30'
                                                : 'hover:bg-blue-800 bg-blue-900/50 cursor-pointer'
                                        }`}
                                    >
                                        <div>
                                            <span className="text-white text-sm font-medium">{ex.name}</span>
                                            <span className="ml-2 text-xs text-blue-400">{ex.equipment}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(ex.category)}`}>
                                            {ex.category}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function getCategoryColor(category) {
    const colors = {
        Chest: 'bg-rose-900 text-rose-200',
        Back: 'bg-blue-900 text-blue-200',
        Shoulders: 'bg-purple-900 text-purple-200',
        Legs: 'bg-green-900 text-green-200',
        Biceps: 'bg-amber-900 text-amber-200',
        Triceps: 'bg-orange-900 text-orange-200',
        Core: 'bg-teal-900 text-teal-200',
    };
    return colors[category] || 'bg-neutral-800 text-neutral-200';
}

// --- Exercise Card ---
function ExerciseCard({ exercise, onUpdate, onRemove, onApplyProgress }) {
    const [editing, setEditing] = useState(false);
    const [local, setLocal] = useState({ ...exercise });

    function handleSave() {
        onUpdate({
            ...local,
            sets: Math.max(1, parseInt(local.sets) || 1),
            reps: Math.max(1, parseInt(local.reps) || 1),
            frequency: Math.max(1, Math.min(7, parseInt(local.frequency) || 1)),
            weight: parseFloat(local.weight) || 0,
            progressPct: parseFloat(local.progressPct) || 0,
        });
        setEditing(false);
    }

    function handleCancel() {
        setLocal({ ...exercise });
        setEditing(false);
    }

    const nextWeight = roundToNearestFive(exercise.weight * (1 + exercise.progressPct / 100));

    return (
        <div className="bg-blue-900/40 border border-blue-800/60 rounded-xl p-4 hover:border-blue-700 transition-colors">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-white text-sm">{exercise.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(exercise.category)}`}>
                            {exercise.category}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 shrink-0">
                    <button
                        onClick={() => setEditing(!editing)}
                        className="p-1.5 rounded-lg text-blue-400 hover:text-white hover:bg-blue-800 transition-colors text-xs"
                        title="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={onRemove}
                        className="p-1.5 rounded-lg text-blue-400 hover:text-red-400 hover:bg-red-900/30 transition-colors text-xs"
                        title="Remove"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {!editing ? (
                <div className="mt-3">
                    <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-blue-950/60 rounded-lg p-2">
                            <div className="text-primary font-bold text-lg leading-none">{exercise.sets}</div>
                            <div className="text-blue-400 text-xs mt-1">Sets</div>
                        </div>
                        <div className="bg-blue-950/60 rounded-lg p-2">
                            <div className="text-primary font-bold text-lg leading-none">{exercise.reps}</div>
                            <div className="text-blue-400 text-xs mt-1">Reps</div>
                        </div>
                        <div className="bg-blue-950/60 rounded-lg p-2">
                            <div className="text-primary font-bold text-lg leading-none">{exercise.frequency}x</div>
                            <div className="text-blue-400 text-xs mt-1">/ Week</div>
                        </div>
                        <div className="bg-blue-950/60 rounded-lg p-2">
                            <div className="text-primary font-bold text-lg leading-none">{exercise.weight}</div>
                            <div className="text-blue-400 text-xs mt-1">lbs</div>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between bg-blue-950/40 rounded-lg px-3 py-2">
                        <div className="text-xs text-blue-300">
                            <span className="text-blue-400">Progressive overload:</span>{' '}
                            <span className="text-primary font-semibold">+{exercise.progressPct}%</span>{' '}
                            <span className="text-blue-400">→</span>{' '}
                            <span className="text-white font-semibold">{nextWeight} lbs</span>
                        </div>
                        <button
                            onClick={onApplyProgress}
                            className="text-xs px-2 py-1 rounded bg-secondary hover:bg-secondary/80 text-white transition-colors font-medium"
                            title={`Apply ${exercise.progressPct}% increase`}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-blue-400 block mb-1">Sets</label>
                            <input
                                type="number"
                                min="1"
                                value={local.sets}
                                onChange={e => setLocal(p => ({ ...p, sets: e.target.value }))}
                                className="w-full px-2 py-1.5 rounded bg-blue-950 border border-blue-700 text-white text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-blue-400 block mb-1">Reps</label>
                            <input
                                type="number"
                                min="1"
                                value={local.reps}
                                onChange={e => setLocal(p => ({ ...p, reps: e.target.value }))}
                                className="w-full px-2 py-1.5 rounded bg-blue-950 border border-blue-700 text-white text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-blue-400 block mb-1">Frequency (days/week)</label>
                            <input
                                type="number"
                                min="1"
                                max="7"
                                value={local.frequency}
                                onChange={e => setLocal(p => ({ ...p, frequency: e.target.value }))}
                                className="w-full px-2 py-1.5 rounded bg-blue-950 border border-blue-700 text-white text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-blue-400 block mb-1">Current Weight (lbs)</label>
                            <input
                                type="number"
                                min="0"
                                step="2.5"
                                value={local.weight}
                                onChange={e => setLocal(p => ({ ...p, weight: e.target.value }))}
                                className="w-full px-2 py-1.5 rounded bg-blue-950 border border-blue-700 text-white text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-blue-400 block mb-1">Progressive Overload (%)</label>
                        <div className="flex gap-1">
                            {[2.5, 5, 7.5, 10].map(pct => (
                                <button
                                    key={pct}
                                    onClick={() => setLocal(p => ({ ...p, progressPct: pct }))}
                                    className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${
                                        parseFloat(local.progressPct) === pct
                                            ? 'bg-primary text-primary-content'
                                            : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                                    }`}
                                >
                                    {pct}%
                                </button>
                            ))}
                            <input
                                type="number"
                                min="0"
                                max="50"
                                step="0.5"
                                value={local.progressPct}
                                onChange={e => setLocal(p => ({ ...p, progressPct: e.target.value }))}
                                className="w-16 px-2 py-1 rounded bg-blue-950 border border-blue-700 text-white text-xs focus:outline-none focus:border-primary"
                                placeholder="%"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="flex-1 py-1.5 rounded-lg bg-primary text-primary-content text-sm font-semibold hover:bg-primary/85 transition-colors">
                            Save
                        </button>
                        <button onClick={handleCancel} className="flex-1 py-1.5 rounded-lg bg-blue-800 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- Phase Panel ---
function PhasePanel({ phase, exercises, onAddExercise, onUpdateExercise, onRemoveExercise, onApplyProgress, onApplyAllProgress }) {
    const [showSearch, setShowSearch] = useState(false);
    const info = PHASE_INFO[phase];

    const totalSets = exercises.reduce((sum, e) => sum + e.sets * e.frequency, 0);
    const totalExercises = exercises.length;

    return (
        <div>
            {/* Phase info banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-primary font-bold">{info.reps}</div>
                    <div className="text-blue-400 text-xs mt-0.5">Rep Range</div>
                </div>
                <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-primary font-bold">{info.intensity}</div>
                    <div className="text-blue-400 text-xs mt-0.5">Intensity</div>
                </div>
                <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-primary font-bold">{info.rest}</div>
                    <div className="text-blue-400 text-xs mt-0.5">Rest Period</div>
                </div>
                <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-primary font-bold">{totalSets}</div>
                    <div className="text-blue-400 text-xs mt-0.5">Weekly Sets</div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="text-blue-300 text-sm">
                    {totalExercises} exercise{totalExercises !== 1 ? 's' : ''} in program
                </span>
                <div className="flex gap-2">
                    {exercises.length > 0 && (
                        <button
                            onClick={onApplyAllProgress}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-white text-xs font-semibold transition-colors"
                        >
                            ⬆️ Apply All Progress
                        </button>
                    )}
                    <button
                        onClick={() => setShowSearch(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-content text-xs font-semibold hover:bg-primary/85 transition-colors"
                    >
                        + Add Exercise
                    </button>
                </div>
            </div>

            {/* Exercise list */}
            {exercises.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-blue-800 rounded-xl">
                    <div className="text-4xl mb-3">🏋️</div>
                    <p className="text-blue-400 mb-3">No exercises yet</p>
                    <button
                        onClick={() => setShowSearch(true)}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-content text-sm font-semibold hover:bg-primary/85 transition-colors"
                    >
                        Add Your First Exercise
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exercises.map(ex => (
                        <ExerciseCard
                            key={ex.uid}
                            exercise={ex}
                            onUpdate={updated => onUpdateExercise(ex.uid, updated)}
                            onRemove={() => onRemoveExercise(ex.uid)}
                            onApplyProgress={() => onApplyProgress(ex.uid)}
                        />
                    ))}
                </div>
            )}

            {showSearch && (
                <ExerciseSearchModal
                    existing={exercises}
                    onAdd={onAddExercise}
                    onClose={() => setShowSearch(false)}
                />
            )}
        </div>
    );
}

// --- Main Page ---
export default function ExercisePrescriptionPage() {
    const [activePhase, setActivePhase] = useState('hypertrophy');
    const [programs, setPrograms] = useState(null);
    const [notification, setNotification] = useState(null);

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('corey-exercise-programs');
            if (saved) {
                setPrograms(JSON.parse(saved));
            } else {
                setPrograms({
                    hypertrophy: DEFAULT_HYPERTROPHY.map(e => ({ ...e, uid: generateUID() })),
                    strength: DEFAULT_STRENGTH.map(e => ({ ...e, uid: generateUID() })),
                });
            }
        } catch {
            setPrograms({
                hypertrophy: DEFAULT_HYPERTROPHY.map(e => ({ ...e, uid: generateUID() })),
                strength: DEFAULT_STRENGTH.map(e => ({ ...e, uid: generateUID() })),
            });
        }
    }, []);

    // Persist to localStorage
    useEffect(() => {
        if (programs !== null) {
            localStorage.setItem('corey-exercise-programs', JSON.stringify(programs));
        }
    }, [programs]);

    function showNotif(msg) {
        setNotification(msg);
        setTimeout(() => setNotification(null), 2500);
    }

    function handleAddExercise(phase, exerciseBase) {
        const defaults = phase === 'hypertrophy'
            ? { sets: 4, reps: 10, progressPct: 5 }
            : { sets: 5, reps: 5, progressPct: 2.5 };
        const newEx = {
            ...defaults,
            id: exerciseBase.id,
            name: exerciseBase.name,
            category: exerciseBase.category,
            frequency: 2,
            weight: 0,
            uid: generateUID(),
        };
        setPrograms(prev => ({
            ...prev,
            [phase]: [...prev[phase], newEx],
        }));
        showNotif(`Added ${exerciseBase.name}`);
    }

    function handleUpdateExercise(phase, uid, updated) {
        setPrograms(prev => ({
            ...prev,
            [phase]: prev[phase].map(e => e.uid === uid ? { ...updated, uid } : e),
        }));
    }

    function handleRemoveExercise(phase, uid) {
        setPrograms(prev => ({
            ...prev,
            [phase]: prev[phase].filter(e => e.uid !== uid),
        }));
        showNotif('Exercise removed');
    }

    function handleApplyProgress(phase, uid) {
        setPrograms(prev => ({
            ...prev,
            [phase]: prev[phase].map(e => {
                if (e.uid !== uid) return e;
                const newWeight = roundToNearestFive(e.weight * (1 + e.progressPct / 100));
                return { ...e, weight: newWeight };
            }),
        }));
        showNotif('Weight updated!');
    }

    function handleApplyAllProgress(phase) {
        setPrograms(prev => ({
            ...prev,
            [phase]: prev[phase].map(e => ({
                ...e,
                weight: roundToNearestFive(e.weight * (1 + e.progressPct / 100)),
            })),
        }));
        showNotif('All weights updated!');
    }

    function handleReset(phase) {
        setPrograms(prev => ({
            ...prev,
            [phase]: PHASE_DEFAULTS[phase].map(e => ({ ...e, uid: generateUID() })),
        }));
        showNotif(`${PHASE_LABELS[phase]} reset to defaults`);
    }

    if (programs === null) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-blue-400">Loading...</div>
            </div>
        );
    }

    const exercises = programs[activePhase];

    return (
        <div className="py-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">💪</span>
                    <h1 className="text-3xl font-bold text-white">Exercise Prescription</h1>
                </div>
                <p className="text-blue-300 text-lg">
                    <span className="text-primary font-semibold">Corey Balmer</span> — Personalized Training Program
                </p>
            </div>

            {/* Phase Tabs */}
            <div className="flex gap-1 bg-blue-950 rounded-xl p-1 mb-6 w-fit">
                {PHASES.map(phase => (
                    <button
                        key={phase}
                        onClick={() => setActivePhase(phase)}
                        className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                            activePhase === phase
                                ? 'bg-primary text-primary-content shadow-lg'
                                : 'text-blue-300 hover:text-white hover:bg-blue-900'
                        }`}
                    >
                        {phase === 'hypertrophy' ? '🔥' : '⚡'} {PHASE_LABELS[phase]}
                    </button>
                ))}
            </div>

            {/* Phase focus badge */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        activePhase === 'hypertrophy'
                            ? 'bg-rose-900/60 text-rose-300 border border-rose-700'
                            : 'bg-yellow-900/60 text-yellow-300 border border-yellow-700'
                    }`}>
                        {PHASE_INFO[activePhase].focus}
                    </span>
                </div>
                <button
                    onClick={() => handleReset(activePhase)}
                    className="text-xs text-blue-500 hover:text-blue-300 transition-colors underline"
                >
                    Reset to defaults
                </button>
            </div>

            {/* Phase Content */}
            <PhasePanel
                phase={activePhase}
                exercises={exercises}
                onAddExercise={ex => handleAddExercise(activePhase, ex)}
                onUpdateExercise={(uid, updated) => handleUpdateExercise(activePhase, uid, updated)}
                onRemoveExercise={uid => handleRemoveExercise(activePhase, uid)}
                onApplyProgress={uid => handleApplyProgress(activePhase, uid)}
                onApplyAllProgress={() => handleApplyAllProgress(activePhase)}
            />

            {/* Notification toast */}
            {notification && (
                <div className="fixed bottom-6 right-6 bg-secondary text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium z-50 animate-pulse">
                    ✓ {notification}
                </div>
            )}
        </div>
    );
}
