import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Enquiry {
    applicantName: string;
    cityState: string;
    courseOfInterest: Course;
    email: string;
    message: string;
    phone: string;
}
export enum Course {
    bPharm = "bPharm",
    mPharm = "mPharm",
    pharmD = "pharmD"
}
export interface backendInterface {
    getAllEnquiries(): Promise<Array<Enquiry>>;
    submitEnquiry(applicantName: string, email: string, phone: string, courseOfInterest: Course, cityState: string, message: string): Promise<void>;
}
