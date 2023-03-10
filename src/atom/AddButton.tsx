import React from "react"
import Addbutton from "../images/addButton.svg"

// ボタン使うファイルで import { AddButton } from "./atom/AddButton" する
// 関数内のdivタグにonClick={ }使う

export const AddButton = () => {
    return (
        <button>
            <img className="" src={Addbutton} alt="AddButton" width="50"/>
        </button>
    )
}