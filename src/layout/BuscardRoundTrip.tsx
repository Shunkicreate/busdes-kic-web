import React from 'react';
import BusCard from './BusCard';
import getAllBusStopList from '../grobalState/selectors/getAllBusStopList';
import { useRecoilValue } from 'recoil';
import { getAnalytics, logEvent } from 'firebase/analytics';

const EmptyBusStop = () => {
	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 bg-bgColor'>
			<div className='absolute w-fit h-fit top-[50%] right-0 left-0 m-auto'>
				<div>バス停が登録されていません</div>
				<div>右下の追加ボタンからバス停を追加してください</div>
			</div>
		</div>
	);
};
const RoundTripCard = () => {
	const AllBusStopList = useRecoilValue(getAllBusStopList);

	let emptyFlag = true;
	AllBusStopList.filter((BusStop) => BusStop.ShowTimeTable).forEach(() => {
		emptyFlag = false;
	});
	if (emptyFlag || AllBusStopList.length === 0) {
		return <EmptyBusStop></EmptyBusStop>;
	}
	const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
        firebase_screen: 'BusCardPage',
        firebase_screen_class: 'BusCardPage',
    });

	const BusStops = AllBusStopList.map((busstop, i) => {
		if (busstop.ShowBusCard == true) {
			return (
				<div key={i} className='flex justify-center p-2'>
					<BusCard from={busstop.fr} to={busstop.to} index={i} />
				</div>
			);
		}
	});

	return <div className='pt-2'>{BusStops}</div>;
};

export default RoundTripCard;
