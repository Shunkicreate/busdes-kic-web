export type busStopListAtomType = {
	fr: AllBusStopsType
	to: AllBusStopsType
	ShowTimeTable: boolean
	ShowBusCard: boolean
	TimeTableData: TimeTable | undefined
	BusCardData: ApproachInfos
}

export type busRouteAtomType = {
	fr: AllBusStopsType
	to: AllBusStopsType
}

interface ApproachInfo {
	more_min: string | undefined;
	real_arrival_time: string;
	direction: string;
	bus_name: string;
	scheduled_time: string;
	delay: string;
	bus_stop: string;
	required_time: number;
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

export interface TimeTable extends TimeTableResponse {
	fr?: AllBusStopsType
	to?: AllBusStopsType
}

export interface TimeTableResponse {
	weekdays: Map<unionDays, OneBusTime[]>
	holidays: Map<unionDays, OneBusTime[]>
}


export type unionBusStops = '立命館大学前' | '京都駅前' | '三条京阪'

export type TimeTableDataStoreType = {
	TimeTableDataStore: TimeTable[]
}

export const TwelveLines = ['三条京阪前', '四条京阪前', '四条河原町', '四条高倉', '四条烏丸《地下鉄四条駅》', '四条烏丸', '四条西洞院', '四条堀川', '堀川蛸薬師', '堀川三条', '堀川御池', '二条城前', '堀川丸太町', '堀川下立売', '堀川下長者町', '堀川中立売', '一条戻橋・晴明神社前', '堀川今出川', '堀川上立売', '堀川寺ノ内', '天神公園前', '堀川鞍馬口', '北大路堀川', '大徳寺前', '建勲神社前', '船岡山', '千本北大路', '金閣寺道', 'わら天神前', '桜木町', '立命館大学前'] as const
type TwelveLinesTuple = typeof TwelveLines
type TwelveLinesType = TwelveLinesTuple[number]

export const FiftyLines = ['京都駅前', '七条西洞院', '西洞院正面', '西洞院六条', '五条西洞院', '西洞院松原', '西洞院仏光寺', '四条西洞院', '四条堀川', '堀川蛸薬師', '堀川三条', '堀川御池', '二条城前', '堀川丸太町', '堀川下立売', '堀川下長者町', '堀川中立売', '大宮中立売', '知恵光院中立売', '千本中立売', '千本今出川', '上七軒', '北野天満宮前', '北野白梅町', '衣笠校前', 'わら天神前', '桜木町', '立命館大学前'] as const
type FiftyLinesTuple = typeof FiftyLines
type FiftyLinesType = FiftyLinesTuple[number]

export const No205 = ['京都駅前', '烏丸七条', '七条大宮・京都水族館前', '七条千本', '西大路七条', '西大路五条', '西大路四条《阪急･嵐電西院駅》', '西大路三条', '西大路御池', '西ノ京円町《ＪＲ円町駅》', '北野白梅町', '衣笠校前', '西大路駅前'] as const
type No205Tuple = typeof No205
type No205Type = No205Tuple[number]

export const No15 = ['三条京阪前', '四条京阪前', '四条河原町', '河原町三条', '京都市役所前', '堺町御池', '烏丸御池', '新町御池', '堀川御池', '神泉苑前', '二条駅前', '千本旧二条', '千本丸太町', '丸太町七本松', '丸太町御前通', '西ノ京円町《ＪＲ円町駅》', '北野中学前', '大将軍', '北野白梅町', 'わら天神前', '衣笠校前', '桜木町', '立命館大学前'] as const
type No15Tuple = typeof No15
type No15Type = No15Tuple[number]

export const M1 = ['北大路バスターミナル《地下鉄北大路駅》', '北大路新町', '北大路堀川', '大徳寺前', '建勲神社前', '船岡山', '千本北大路', '金閣寺道', 'わら天神前', '桜木町', '立命館大学前'] as const
type M1Tuple = typeof M1
type M1Type = M1Tuple[number]

export const No51 = ['三条京阪前', '四条京阪前', '四条河原町', '河原町三条', '京都市役所前', '堺町御池', '烏丸二条', '烏丸御池', '烏丸丸太町《地下鉄丸太町駅》', '烏丸下立売', '烏丸下長者町', '烏丸一条', '烏丸今出川《地下鉄今出川駅》', '上京区総合庁舎前', '堀川今出川', '今出川大宮', '今出川浄福寺', '千本今出川', '上七軒', '北野天満宮前', '北野白梅町', '衣笠校前', '小松原児童公園前', '立命館大学前'] as const
type No51Tuple = typeof No51
type No51Type = No51Tuple[number]

export const No59 = ['河原町三条', '四条河原町', '四条京阪前', '三条京阪前', '河原町三条', '京都市役所前', '河原町丸太町', '荒神口', '府立医大病院前', '河原町今出川', '同志社前', '烏丸今出川《地下鉄今出川駅》', '上京区総合庁舎前', '堀川今出川', '今出川大宮', '今出川浄福寺', '千本今出川', '千本上立売', '乾隆校前', '千本鞍馬口', 'ライトハウス前', '千本北大路', '金閣寺道', '桜木町', '竜安寺前', '塔ノ下町', '御室仁和寺', '福王子', '鳴滝本町', '宇多野病院前', 'ユースホステル前', '山越', '広沢池・佛大広沢校前', '山越中町'] as const
type No59Tuple = typeof No59
type No59Type = No59Tuple[number]

export const No52 = ['四条烏丸《地下鉄四条駅》', '四条西洞院', '四条堀川', '四条大宮', 'みぶ操車場前', '千本三条・朱雀立命館前', '二条城前', '千本旧二条', '千本丸太町', '丸太町七本松', '七本松出水', '七本松仁和寺街道', '上七軒', '北野天満宮前', '北野白梅町', '衣笠校前', 'わら天神前', '桜木町', '立命館大学前'] as const
type No52Tuple = typeof No52
type No52Type = No52Tuple[number]

export const No55 = ['四条烏丸《地下鉄四条駅》', '四条西洞院', '四条堀川', '四条大宮', 'みぶ操車場前', '千本三条・朱雀立命館前', '二条駅前', '千本旧二条', '千本丸太町', '千本出水', '千本中立売', '千本今出川', '上七軒', '北野天満宮前', '北野白梅町', '衣笠校前', 'わら天神前', '桜木町'] as const
type No55Tuple = typeof No55
type No55Type = No55Tuple[number]

export const TemporaryRapidRits = ['北野白梅町', '西ノ京円町《ＪＲ円町駅》', '二条駅前', '三条京阪前'] as const
type TemporaryRapidRitsTuple = typeof TemporaryRapidRits
type TemporaryRapidRitsType = TemporaryRapidRitsTuple[number]

export const TemporaryNishioojiSijo = ['等持院東町', '府立体育館前《島津アリーナ京都前》', '大将軍', '北野中学前', '西ノ京円町《ＪＲ円町駅》', '太子道', '西大路御池', '西大路四条《阪急･嵐電西院駅》'] as const
type TemporaryNishioojiSijoTuple = typeof TemporaryNishioojiSijo
type TemporaryNishioojiSijoType = TemporaryNishioojiSijoTuple[number]

export type AllBusStopsType = TwelveLinesType | FiftyLinesType | No205Type | No15Type | M1Type | No52Type | No51Type | No59Type | No55Type | TemporaryRapidRitsType | TemporaryNishioojiSijoType | '立命館大学'
export const AllBusStops: AllBusStopsType[] = ['三条京阪前', '四条京阪前', '四条河原町', '四条高倉', '四条烏丸《地下鉄四条駅》', '四条西洞院', '四条堀川', '堀川蛸薬師', '堀川三条', '堀川御池', '二条城前', '堀川丸太町', '堀川下立売', '堀川下長者町', '堀川中立売', '一条戻橋・晴明神社前', '堀川今出川', '堀川上立売', '堀川寺ノ内', '天神公園前', '堀川鞍馬口', '北大路堀川', '大徳寺前', '建勲神社前', '船岡山', '千本北大路', '金閣寺道', 'わら天神前', '桜木町', '立命館大学前', '京都駅前', '七条西洞院', '西洞院正面', '西洞院六条', '五条西洞院', '西洞院松原', '西洞院仏光寺', '大宮中立売', '知恵光院中立売', '千本中立売', '千本今出川', '上七軒', '北野天満宮前', '北野白梅町', '衣笠校前', '烏丸七条', '七条大宮・京都水族館前', '七条千本', '西大路七条', '西大路五条', '西大路四条《阪急･嵐電西院駅》', '西大路三条', '西大路御池', '西ノ京円町《ＪＲ円町駅》', '西大路駅前', '河原町三条', '京都市役所前', '堺町御池', '烏丸御池', '新町御池', '神泉苑前', '二条駅前', '千本旧二条', '千本丸太町', '丸太町七本松', '丸太町御前通', '北野中学前', '大将軍', '北大路バスターミナル《地下鉄北大路駅》', '北大路新町', '四条大宮', 'みぶ操車場前', '千本三条・朱雀立命館前', '七本松出水', '七本松仁和寺街道', '烏丸二条', '烏丸丸太町《地下鉄丸太町駅》', '烏丸下立売', '烏丸下長者町', '烏丸一条', '烏丸今出川《地下鉄今出川駅》', '上京区総合庁舎前', '今出川大宮', '今出川浄福寺', '小松原児童公園前', '河原町丸太町', '荒神口', '府立医大病院前', '河原町今出川', '同志社前', '千本上立売', '乾隆校前', '千本鞍馬口', 'ライトハウス前', '竜安寺前', '塔ノ下町', '御室仁和寺', '福王子', '鳴滝本町', '宇多野病院前', 'ユースホステル前', '山越', '広沢池・佛大広沢校前', '山越中町', '千本出水', '等持院東町', '府立体育館前《島津アリーナ京都前》', '太子道']
