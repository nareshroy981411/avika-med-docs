import React from 'react';
import "./notfoundpage.css";
import { useLocation } from "react-router-dom";

const NotFoundPage = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const listOfURL = pathname.split("/");
    const NameOfCategory = listOfURL[1]
    const NameOfCategoryToUpperCase = NameOfCategory.charAt(0).toUpperCase() + NameOfCategory.slice(1);

    return (
        <>
            <div className='bgImageNotFound'>
                <h1 className='heading'>{NameOfCategoryToUpperCase} Not Found</h1>
            </div>
        </>
    )
}

export default NotFoundPage
