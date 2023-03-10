import { ApiClient } from "../lib/api-client";
import { AllBusStopsType, TimeTableResponse, ApproachInfos } from "../types/Bus.type";

export type GetRepository = {
    nextbus: (fr: AllBusStopsType, to: AllBusStopsType) => Promise<ApproachInfos>;
    timetable: (fr: AllBusStopsType, to: AllBusStopsType) => Promise<TimeTableResponse>;
    // timetableMulti: (fr: AllBusStopsType, to: AllBusStopsType) => Promise<ApproachInfos>
};

const nextbus: GetRepository["nextbus"] = async (fr, to): Promise<ApproachInfos> => {
    const response = await ApiClient.get(`/nextbus?fr=${fr}&to=${to}`);
    return response.data;
};

const timetable: GetRepository["timetable"] = async (fr, to): Promise<TimeTableResponse> => {
    // debugger; // eslint-disable-line no-debugger
    const response = await ApiClient.get(`/timetable?fr=${fr}&to=${to}`);
    return response.data;
};

// const timetableMulti: GetRepository["timetableMulti"] = async (fr, to): Promise<TimeTableResponse> => {
//     const response = await ApiClient.get(`/posts`);
//     return response.data;
// };


export const GetRepository: GetRepository = {
    nextbus,
    timetable,
};