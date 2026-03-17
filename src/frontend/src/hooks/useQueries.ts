import { useMutation } from "@tanstack/react-query";
import type { Course } from "../backend";
import { useActor } from "./useActor";

export function useSubmitEnquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      applicantName: string;
      email: string;
      phone: string;
      courseOfInterest: Course;
      cityState: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitEnquiry(
        data.applicantName,
        data.email,
        data.phone,
        data.courseOfInterest,
        data.cityState,
        data.message,
      );
    },
  });
}
