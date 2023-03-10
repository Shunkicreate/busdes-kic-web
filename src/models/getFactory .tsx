import { GetRepository } from "../repositories/getRepository";
import { AllBusStopsType, TimeTableResponse, ApproachInfos } from "../types/Bus.type";

export const getFactory = (rep?: GetRepository) => {
    // 引数があればモックデータでなければ本番用データ
    const repository = GetRepository;
    // debugger; // eslint-disable-line no-debugger

    return {
        nextbus: async (fr: AllBusStopsType, to: AllBusStopsType): Promise<ApproachInfos> => {
            const response = await repository.nextbus(fr, to)
            return response;
        },
        timetable: async (fr: AllBusStopsType, to: AllBusStopsType): Promise<TimeTableResponse> => {
            const response = await repository.timetable(fr, to)
            return response;
        },
    };
}