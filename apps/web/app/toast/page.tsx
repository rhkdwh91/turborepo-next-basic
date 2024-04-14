"use client";

import React from 'react';
import { ToastContainer, toast } from 'kyz-toast'

export default function Page () {
    const wave = () => toast('Morning! Have a good day.', {
        backgroundColor: '#8329C5',
        color: '#ffffff',
      })
    

    return (
        <div>
            <button onClick={wave}>Say hi!</button>
            Hello World!
            <ToastContainer />
        </div>
    )
}