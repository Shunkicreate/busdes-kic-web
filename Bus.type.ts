interface ApproachInfo {
	more_min: string;
	real_arrival_time: string;
	direction: string;
	via: string;
	scheduled_time: string;
	delay: string;
	bus_stop: string;
	required_time: Number;
}

export interface ApproachInfos {
	approach_infos: ApproachInfo[]
}

export interface OneBusTime {
	Via: string
	Min: string
	BusStop: string
}


const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"] as const

export type unionDays = typeof days[number]

export interface TimeTable {
	Weekdays: Map<unionDays, OneBusTime[]>
	Saturdays: Map<unionDays, OneBusTime[]>
	Holidays: Map<unionDays, OneBusTime[]>
}