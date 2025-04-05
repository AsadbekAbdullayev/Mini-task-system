export type Users = {
    username : string;
    email: string;
    firstName: string;
    lastName: string;
    role : number;
    profilePhoto : string | null;
    lastLogin: string | null;
}
export interface Lesson {
    lessonId: number;
    lessonName: string;
    videoProgress: number;
}

export interface Chapter {
    chapterId: number;
    chapterName: string;
    lessons: Lesson[];
}

export interface CourseProgress {
    courseId: number;
    courseName: string;
    chapters: Chapter[];
}