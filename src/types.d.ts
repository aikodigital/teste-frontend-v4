export interface Student {
    id?: number;
    image_url: string;
    name: string;
}

export interface Classroom {
    id?: number;
    name: string;
}

export interface Nota {
    id?: number;
    studentId: number;
    classroomId: number;
    classroomName: string;
    name: string;
    grade: number;
    frequency: number;
    image_url: string;
}