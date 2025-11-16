// subjects.store.ts
import { PROJECT_NAME } from "@/constants";
import { Subject } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Level } from "@/types";

interface SubjectsStore {
    subjects: Subject[];
    levels: Level[];
    filteredSubjects: Subject[];
    searchTerm: string;
    selectedLevel: string;
    setSubjects: (subjects: Subject[]) => void;
    setLevels: (levels: Level[]) => void;
    setSearchTerm: (term: string) => void;
    setSelectedLevel: (level: string) => void;
    filterSubjects: () => void;
}

const initialState = {
    subjects: [],
    levels: [],
    filteredSubjects: [],
    searchTerm: "",
    selectedLevel: "all",
};

export const subjectsStore = create<SubjectsStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            setSubjects: (subjects) => {
                set({ subjects });
                get().filterSubjects();
            },

            setLevels: (levels) => {
                set({ levels });
                get().filterSubjects();
            },

            setSearchTerm: (searchTerm) => {
                set({ searchTerm });
                get().filterSubjects();
            },

            setSelectedLevel: (selectedLevel: string) => {
                set({ selectedLevel });
                get().filterSubjects();
            },

            filterSubjects: () => {
                const { subjects, searchTerm, selectedLevel } = get();
                let filtered = [...subjects];

                // Filter by search term
                if (searchTerm) {
                    const term = searchTerm.toLowerCase();
                    filtered = filtered.filter(
                        (subject) =>
                            subject.name?.toLowerCase().includes(term) ||
                            subject.description?.toLowerCase().includes(term) ||
                            subject.courses?.some((course) =>
                                course.title.toLowerCase().includes(term)
                            )
                    );
                }

                // Filter by selected level
                if (selectedLevel && selectedLevel !== "all") {
                    const levelId = Number(selectedLevel);
                    filtered = filtered.filter((subject) =>
                        subject.grades?.some(
                            (grade) => Number(grade.level?.id) === levelId
                        )
                    );
                }

                set({ filteredSubjects: filtered });
            },
        }),
        {
            name: `${PROJECT_NAME}-subjects`,
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(
                        ([key]) => !["filteredSubjects"].includes(key)
                    )
                ) as any,
        }
    )
);

// Initialize the store with filtered subjects
subjectsStore.getState().filterSubjects();
