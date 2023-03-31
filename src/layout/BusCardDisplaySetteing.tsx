import React from 'react';
import CardDisplayButton from '../atom/CardDisplayButton'
import { useModal } from 'react-hooks-use-modal';

const BusCardDisplaySetting = () => {

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true
    })

    const modalStyle: React.CSSProperties = {
        backgroundColor: '#fff',
        padding: '60px 100px',
        borderRadius: '10px',
    };

    return (
        <div>
            <button className='w-8' onClick={open}>
                <CardDisplayButton></CardDisplayButton>
            </button>
            <Modal>
                <button onClick={close} className='text-white'>CLOSE</button>
                <div style={modalStyle} className='text-center'>
                    <div className='p-4 text-xl'>削除しますか？</div>
                    <div className='grid grid-cols-5 text-2xl'>
                        <button className='col-start-1 col-span-2'>はい</button>
                        <button className='col-start-4 col-span-2' onClick={close}>いいえ</button>
                    </div>
                </div>
            </Modal>
        </div>
    )

}

export default BusCardDisplaySetting