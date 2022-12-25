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

export interface DayBusTime {
	"1":OneBusTime[] | null;
	"2":OneBusTime[] | null;
	"3":OneBusTime[] | null;
	"4":OneBusTime[] | null;
	"5":OneBusTime[] | null;
	"7":OneBusTime[] | null;
	"8":OneBusTime[] | null;
	"9":OneBusTime[] | null;
	"10":OneBusTime[] | null;
	"11":OneBusTime[] | null;
	"12":OneBusTime[] | null;
	"13":OneBusTime[] | null;
	"14":OneBusTime[] | null;
	"15":OneBusTime[] | null;
	"17":OneBusTime[] | null;
	"18":OneBusTime[] | null;
	"19":OneBusTime[] | null;
	"20":OneBusTime[] | null;
	"21":OneBusTime[] | null;
	"22":OneBusTime[] | null;
	"23":OneBusTime[] | null;
	"24":OneBusTime[] | null;
}

export interface TimeTable {
	Weekdays: DayBusTime
	Saturdays: DayBusTime
	Holidays: DayBusTime
}