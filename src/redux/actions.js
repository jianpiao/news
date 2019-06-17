
export const refreshing = data => {    //  刷新
    return {
        type: 'REFRESHING',
        text: data
    }
}

export const imgUrl = data => {
    return {
        type: 'IMG_URL',
        text: data
    }
}