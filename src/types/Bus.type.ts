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
	via: string
	min: string
	bus_stop: string
}


const DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] as const

export type unionDays = typeof DAYS[number]

export interface TimeTable {
	weekdays: Map<unionDays, OneBusTime[]>
	saturdays: Map<unionDays, OneBusTime[]>
	holidays: Map<unionDays, OneBusTime[]>
}


export type unionBusStops = "立命館大学前" | "京都駅前" | "三条京阪"

export type TimeTableDataStoreType = {
	busData: Map<AllBusStops, Map<AllBusStops, TimeTable>>
}

type TwelveLines = "三条京阪前" | "四条京阪前" | "四条河原町" | "四条高" | "四条烏丸《地下鉄四条駅》" | "四条烏丸" | "四条西洞院" | "四条堀川" | "堀川蛸薬師" | "堀川三条" | "堀川御池" | "二条城前" | "堀川丸太町" | "堀川下立売" | "堀川下長者町" | "堀川中立売" | "一条戻橋・晴明神社前" | "堀川今出川" | "堀川上立売" | "堀川寺ノ内" | "天神公園前" | "堀川鞍馬口" | "北大路堀川" | "大徳寺前" | "建勲神社前" | "船岡山" | "千本北大路" | "金閣寺道" | "わら天神前" | "桜木町" | "立命館大学前"

type FiftyLines = "京都駅前" | "七条西洞院" | "西洞院正面" | "西洞院六条" | "五条西洞院" | "西洞院松原" | "西洞院佛光寺" | "四条西洞院" | "四条堀川" | "堀川蛸薬師" | "堀川三条" | "堀川御池" | "二条城前" | "堀川丸太町" | "堀川下立売" | "堀川下長者町" | "堀川中立売" | "大宮中立売" | "知恵光院中立売" | "千本中立売" | "千本今出川" | "上七軒" | "北野天満宮前" | "北野白梅町" | "衣笠校前" | "わら天神前" | "桜木町" | "立命館大学前"

type No205 = "京都駅前" | "烏丸七条" | "七条大宮・京都水族館前" | "七条千本" | "西大路七条" | "西大路五条" | "西大路四条《阪急･嵐電西院駅》" | "西大路三条" | "西大路御池" | "西ノ京円町《ＪＲ円町駅》" | "北野白梅町" | "衣笠校前" | "西大路駅前" 

type No15 = "三条京阪前" | "四条京阪前" | "四条河原町" | "河原町三条" | "京都市役所前" | "堺町御池" | "烏丸御池" | "新町御池" | "堀川御池" | "神泉苑前" | "二条駅前" | "千本旧二条" | "千本丸太町" | "丸太町七本松" | "丸太町御池通" | "西ノ京円町《ＪＲ円町駅》" | "北野中学前" | "大将軍" | "北野白梅町" | "わら天神前" | "衣笠校前" | "桜木町" | "立命館大学前"

type M1 = "北大路バスターミナル《地下鉄北大路駅》" | "北大路新町" | "北大路堀川" | "大徳寺前" | "建勲神社前" | "船岡山" | "千本北大路" | "金閣寺道" | "わら天神前" | "桜木町" | "立命館大学前"

type No52 = "四条烏丸《地下鉄四条駅》" | "四条西洞院" | "四条堀川" | "四条大宮" | "みぶ操車場前" | "千本三条・朱雀立命館前" | "二条城前" | "千本旧二条" | "千本丸太町" | "丸太町七本松" | "七本松出水" | "七本松仁和寺街道" | "上七軒" | "北野天満宮前" | "北野白梅町" | "衣笠校前" | "わら天神前" | "桜木町" | "立命館大学前"

type No51 = "三条京阪前" | "四条京阪前" | "四条河原町" | "河原町三条" | "京都市役所前" | "堺町御池" | "烏丸二条" | "烏丸御池" | "烏丸丸太町《地下鉄丸太町駅》" | "烏丸下立売" | "烏丸下長者町" | "烏丸一条" | "烏丸今出川《地下鉄今出川駅》" | "上京区総合庁舎前" | "堀川今出川" | "今出川大宮" | "今出川浄福寺" | "千本今出川" | "上七軒" | "北野天満宮前" | "北野白梅町" | "衣笠校前" | "小松原児童公園前" | "立命館大学前"

export type AllBusStops = TwelveLines | FiftyLines | No205 | No15 | M1 | No52 | No51 | "立命館大学"