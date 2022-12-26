interface ApproachInfo {
	MoreMin: string;
	RealArrivalTime: string;
	Direction: string;
	Via: string;
	ScheduledTime: string;
	Delay: string;
	BusStop: string;
	RequiredTime: Number;
}

export interface ApproachInfos {
	ApproachInfo: ApproachInfo[]
}

export interface OneBusTime {
	Via: string
	Min: string
	BusStop: string
}


const DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] as const

export type unionDays = typeof DAYS[number]

export interface TimeTable {
	weekdays: Map<unionDays, OneBusTime[]>
	saturdays: Map<unionDays, OneBusTime[]>
	holidays: Map<unionDays, OneBusTime[]>
}