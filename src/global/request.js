import React, { Component } from 'react'
import {} from 'react-native'

//  数据请求
export const request = (url, data = '') => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            resolve(res)
        })
        .catch((err) => {
            console.log(err);
            reject(err)
        })
    })
}
