import React from "react"

// ボタン使うファイルで import { AddButton } from "./atom/AddButton" する
// 関数内のdivタグにonClick={ }使う

export const AddButton = () => {
    return (
        <div className="text-4xl text-white">
            <button className="rounded-full bg-yellow-300 w-12 h-12">+</button>
        </div>
    )
}