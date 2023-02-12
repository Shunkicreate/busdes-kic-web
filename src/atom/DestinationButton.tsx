import React from "react"
import { ReactComponent as Icon } from '../ReverseButton.svg'
//ボタン使うファイルで import { DestinationButton } from "./atom/DestinationButton" する
export const DestinationButton = () => {
    return (
        <div> //このdivタグにonClick={}使う
            <Icon />
        </div>
    )
}