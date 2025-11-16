import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Book, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

import { useSiteServices } from "@/services";
import Error from "@/components/ui/Error";
import { subjectsStore } from "@/store";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const SubjectsPage = () => {
    const {
        filteredSubjects = [],
        selectedLevel,
        setSelectedLevel,
        setSubjects,
        setLevels,
        levels,
    } = subjectsStore();

    const {
        data: subjectsData = [],
        isLoading: loadingSubjects,
        error: subjectsError,
    } = useSiteServices().getAllSubjects();

    const {
        data: levelsData = [],
        isLoading: loadingLevels,
        error: levelsError,
    } = useSiteServices().getAllLevels(); // Add this hook to fetch levels

    // Update subjects in store when data is loaded
    useEffect(() => {
        if (subjectsData.length > 0) {
            setSubjects(subjectsData);
        }
    }, [subjectsData, setSubjects]);

    // Update levels in store when data is loaded
    useEffect(() => {
        if (levelsData.length > 0) {
            setLevels(levelsData);
        }
    }, [levelsData, setLevels]);

    if (subjectsError || levelsError) {
        return (
            <Error
                message={subjectsError?.message || levelsError?.message || ""}
            />
        );
    }

    if (loadingSubjects || loadingLevels) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                جاري تحميل المواد...
            </div>
        );
    }

    // Ensure we have an array to map over
    const displaySubjects = Array.isArray(filteredSubjects)
        ? filteredSubjects
        : [];

    return (
        <div className="flex flex-col min-h-screen pt-16">
            <main className="container mx-auto px-4 py-8 flex-grow">
                <motion.div
                    className="max-w-screen-xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-8 text-center">
                        <motion.h1
                            className="text-4xl font-bold text-blue-dark dark:text-blue-light mb-4"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            المواد الدراسية
                        </motion.h1>
                        <motion.p
                            className="text-gray-700 dark:text-gray-300 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            استكشف جميع المواد الدراسية المتوفرة وابحث عن
                            المدرسين المناسبين لك
                        </motion.p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* Sidebar filter */}
                        <motion.div
                            className="md:w-1/4"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-gray-300 dark:bg-gray-700 shadow-md rounded-lg p-4">
                                <h2 className="font-bold text-lg mb-4">
                                    تصفية البحث
                                </h2>

                                <div className="mb-4">
                                    <label className="block mb-2">
                                        المستوى التعليمي
                                    </label>
                                    <div className="space-y-2">
                                        {/* Add "All" option */}
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="level-all"
                                                name="level"
                                                checked={
                                                    selectedLevel === "all"
                                                }
                                                onChange={() =>
                                                    setSelectedLevel("all")
                                                }
                                                className="mr-2"
                                            />
                                            <label htmlFor="level-all">
                                                جميع المستويات
                                            </label>
                                        </div>

                                        {levels.map((level) => {
                                            const levelIdStr = String(level.id);
                                            return (
                                                <div
                                                    key={level.id}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`level-${levelIdStr}`}
                                                        name="level"
                                                        checked={
                                                            selectedLevel ===
                                                            levelIdStr
                                                        }
                                                        onChange={() =>
                                                            setSelectedLevel(
                                                                levelIdStr
                                                            )
                                                        }
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor={`level-${levelIdStr}`}
                                                    >
                                                        {level.arName}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setSelectedLevel("all")}
                                >
                                    إعادة ضبط التصفية
                                </Button>
                            </div>
                        </motion.div>

                        {/* Cards Section */}
                        <div className="md:w-3/4">
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <AnimatePresence>
                                    {displaySubjects?.length > 0 ? (
                                        displaySubjects?.map(
                                            (subject, index) => (
                                                <motion.div
                                                    key={subject.id}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 40,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{ opacity: 0, y: 40 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: index * 0.05,
                                                    }}
                                                >
                                                    <Card className="hover:border-blue-light hover:shadow-md transition-all">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-xl flex items-center">
                                                                <Book
                                                                    className="ml-2 text-blue"
                                                                    size={20}
                                                                />
                                                                {subject.name}
                                                            </CardTitle>
                                                        </CardHeader>

                                                        <CardContent>
                                                            <p className="text-gray-600 mb-4 text-sm h-12 overflow-hidden">
                                                                {
                                                                    subject.description
                                                                }
                                                            </p>

                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                {subject.courses
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            course,
                                                                            index
                                                                        ) => (
                                                                            <Badge
                                                                                key={
                                                                                    index
                                                                                }
                                                                                variant="secondary"
                                                                                className="bg-blue-light/10 text-blue-dark"
                                                                            >
                                                                                {
                                                                                    course.title
                                                                                }
                                                                            </Badge>
                                                                        )
                                                                    )}
                                                            </div>

                                                            <div className="flex justify-between items-center">
                                                                <div className="flex items-center text-gray-600 text-sm">
                                                                    <User
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="ml-1"
                                                                    />
                                                                    <span>
                                                                        {subject.teachersCount >
                                                                        1
                                                                            ? subject.teachersCount +
                                                                              " " +
                                                                              " مدرسين"
                                                                            : "مدرس واحد"}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4">
                                                                <Button
                                                                    className="w-full"
                                                                    asChild
                                                                >
                                                                    <Link
                                                                        to={`/subjects/${subject.id}`}
                                                                    >
                                                                        عرض
                                                                        المدرسين
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            )
                                        )
                                    ) : (
                                        <motion.div
                                            className="col-span-full text-center py-12"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <p className="text-xl text-gray-500">
                                                لم يتم العثور على مواد مطابقة
                                            </p>
                                            <Button
                                                variant="link"
                                                onClick={() =>
                                                    setSelectedLevel("all")
                                                }
                                            >
                                                إعادة ضبط البحث
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default SubjectsPage;
