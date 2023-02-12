import React from "react"
import { ReactComponent as Icon } from '../images/ReverseButton.svg'
// ボタン使うファイルで import { DestinationButton } from "./atom/DestinationButton" する
// 関数内のdivタグにonClick={ }使う
export const DestinationButton = () => {
    return (
        <div>
            <Icon />
        </div>
    )
}