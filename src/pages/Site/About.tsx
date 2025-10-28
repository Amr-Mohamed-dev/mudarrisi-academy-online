import { motion } from "framer-motion";
import { Check, Award, Users } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "./components/navbar";

const AboutPage = () => {
    const features = [
        {
            icon: Users,
            title: "الاختيار المناسب",
            description:
                "نقدم مجموعة واسعة من المدرسين المؤهلين في مختلف المواد الدراسية لتناسب احتياجاتك التعليمية.",
        },
        {
            icon: Award,
            title: "جودة عالية",
            description:
                "نضمن جودة التعليم من خلال اختيار مدرسين ذوي خبرة وكفاءة عالية وتقييم مستمر لأدائهم.",
        },
        {
            icon: Check,
            title: "سهولة الاستخدام",
            description:
                "منصة سهلة الاستخدام تمكنك من البحث عن المدرسين وحجز الدروس ومتابعة تقدمك بكل سهولة.",
        },
    ];

    const steps = [
        {
            number: 1,
            title: "ابحث عن مدرس",
            description:
                "استكشف قائمة المدرسين المؤهلين وابحث حسب المادة أو المستوى التعليمي أو التقييمات.",
        },
        {
            number: 2,
            title: "حجز موعد",
            description:
                "اختر المدرس المناسب وحدد الوقت المناسب لك لحجز درس خصوصي.",
        },
        {
            number: 3,
            title: "تعلم وتقدم",
            description:
                "استفد من الدروس عالية الجودة وتابع تقدمك مع مدرسك المفضل.",
        },
        {
            number: 4,
            title: "قيم تجربتك",
            description:
                "شارك رأيك حول الدرس والمدرس لمساعدة الطلاب الآخرين في اختياراتهم.",
        },
    ];

    return (
        <PageTransition className="flex flex-col min-h-screen bg-background text-foreground">

            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="max-w-4xl mx-auto">
                    <AnimatedSection delay={0.2}>
                        <section className="mb-16 text-center">
                            <motion.h1
                                className="text-4xl font-bold mb-6 text-blue-dark dark:text-blue-light"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                من نحن
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                منصة المدرسين هي منصة تعليمية رائدة تهدف إلى ربط
                                الطلاب مع أفضل المدرسين المؤهلين. نحن نؤمن بأن
                                التعليم الجيد هو حق للجميع، ونسعى لتوفير تجربة
                                تعليمية متميزة سهلة الوصول.
                            </motion.p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.5}>
                        <section className="mb-16">
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.2,
                                        },
                                    },
                                }}
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-card text-card-foreground border rounded-lg shadow-md p-6"
                                    >
                                        <motion.div
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-light/20 dark:bg-blue/20 text-blue mb-4"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <feature.icon size={32} />
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.8}>
                        <section className="mb-16">
                            <motion.h2
                                className="text-3xl font-bold mb-6 text-center text-blue-dark dark:text-blue-light"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                رؤيتنا
                            </motion.h2>
                            <motion.div
                                className="bg-card text-card-foreground border rounded-lg shadow-md p-8"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.p
                                    className="text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-200"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    نطمح أن نكون الوجهة الأولى للتعليم
                                    الإلكتروني عالي الجودة في العالم العربي،
                                    ونسعى لتمكين كل طالب من الوصول إلى أفضل
                                    المدرسين بغض النظر عن موقعه الجغرافي.
                                </motion.p>

                                <motion.p
                                    className="text-lg leading-relaxed text-gray-800 dark:text-gray-200"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    نؤمن بأن التعليم هو أساس التقدم وأن كل طالب
                                    يستحق فرصة الحصول على تعليم متميز. من خلال
                                    منصتنا، نسعى لجسر الفجوة بين الطلاب
                                    والمعلمين وتوفير بيئة تعليمية تفاعلية
                                    ومثمرة.
                                </motion.p>
                            </motion.div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={1.2}>
                        <section className="mb-16">
                            <motion.h2
                                className="text-3xl font-bold mb-6 text-center text-blue-dark dark:text-blue-light"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                كيف نعمل
                            </motion.h2>
                            <motion.div
                                className="bg-card text-card-foreground border rounded-lg shadow-md p-8"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.4 }}
                            >
                                <div className="space-y-8">
                                    {steps.map((step, index) => (
                                        <motion.div
                                            key={step.number}
                                            className="flex gap-2"
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 1.6 + index * 0.2,
                                            }}
                                            whileHover={{ x: 10 }}
                                        >
                                            <motion.div
                                                className="ml-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue text-white font-bold"
                                                whileHover={{
                                                    scale: 1.2,
                                                    rotate: 360,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {step.number}
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={2}>
                        <section>
                            <motion.h2
                                className="text-3xl font-bold mb-6 text-center text-blue-dark dark:text-blue-light"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                تواصل معنا
                            </motion.h2>
                            <motion.div
                                className="bg-card text-card-foreground border rounded-lg shadow-md p-8"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.2 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.p
                                    className="text-center text-lg mb-6 text-gray-800 dark:text-gray-200"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.4 }}
                                >
                                    نحن هنا للإجابة على استفساراتكم ومساعدتكم في
                                    أي وقت.
                                </motion.p>

                                <motion.div
                                    className="max-w-md mx-auto space-y-4"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.1,
                                                delay: 2.6,
                                            },
                                        },
                                    }}
                                >
                                    <motion.div
                                        className="flex justify-between"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 },
                                        }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="font-bold">
                                            البريد الإلكتروني:
                                        </span>
                                        <span className="text-blue">
                                            info@teachersplatform.com
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        className="flex justify-between"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 },
                                        }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="font-bold">
                                            رقم الهاتف:
                                        </span>
                                        <span>+966 123 456 789</span>
                                    </motion.div>

                                    <motion.div
                                        className="flex justify-between"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 },
                                        }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="font-bold">
                                            العنوان:
                                        </span>
                                        <span>
                                            الرياض، المملكة العربية السعودية
                                        </span>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </section>
                    </AnimatedSection>
                </div>
            </main>

            <Footer />
        </PageTransition>
    );
};

export default AboutPage;
