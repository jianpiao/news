import React, { Component } from 'react';
import { refreshing } from '../redux/actions';
import { ToastAndroid } from 'react-native';

const Fetch = (url,method,params) => {
    return new Promise((resolve,reject) => {
        fetch(url, {
            method: method ? 'GET' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((res) => {
            resolve(res)
            refreshing(false)
        })
        .catch((err) => {
            reject(err)
            ToastAndroid.show('网络异常' + err, ToastAndroid.SHORT)
            refreshing(false)
        })
    })
}


export default Fetch
