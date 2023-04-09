import React, { ReactNode, useRef, useState, useCallback } from 'react';

type ModalProps = {
    children: ReactNode;
};

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => {
        setIsOpen(true)
        setBodyOverflowStyle(document.body.style.overflow);
        document.body.style.overflow = 'hidden';
    }, []);
    const closeModal = useCallback(() => {
        setIsOpen(false)
        document.body.style.overflow = bodyOverflowStyle
    }, []);
    const ref = useRef<HTMLDivElement>(null);
    const [bodyOverflowStyle, setBodyOverflowStyle] = useState('');

    //モーダル画面外をクリックしたらモーダルを閉じるようにする仕掛け。
    //でもreactは仮想DOMを使ってて、入れ子になっている子要素は上手くハンドリングできてないっぽい。今回の場合、ネストされて子要素の構造になっていて、ref.current.contains(e.target as Node)が上手く働いてくれない。これを解決するにはmodalのコンポーネント内でバス停のリストを作成して、それを直接userefすればいいと思う。
    // const handleOutsideClick = useCallback(
    //     (e: MouseEvent) => {
    //         if (ref.current && !ref.current.contains(e.target as Node)) {
    //             closeModal()
    //         }
    //     },
    //     [closeModal]
    // )

    // useEffect(() => {
    //     if (isOpen) {
    //         setTimeout(() => {
    //             document.addEventListener('click', handleOutsideClick);
    //             console.log('is open')
    //         }, 10);
    //     } else {
    //         console.log('is not open')
    //         document.removeEventListener('click', handleOutsideClick);
    //     }
    //     return () => {
    //         document.removeEventListener('click', handleOutsideClick);
    //     };
    // }, [isOpen, handleOutsideClick]);

    const Modal: React.FC<ModalProps> = ({ children }) => {

        return (
            <div
                className={`${isOpen ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[51]`}
            >
                <div
                    ref={ref}
                    className='w-fit'
                >
                    {children}
                </div>
            </div>
        );
    };

    return { Modal, isOpen, openModal, closeModal };
};

export default useModal